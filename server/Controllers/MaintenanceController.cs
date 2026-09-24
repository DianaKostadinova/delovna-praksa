using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZeginHealthHub.Api.Data;

namespace ZeginHealthHub.Api.Controllers;

/// <summary>
/// Scheduled housekeeping, meant to be called by a cron job rather than by the site.
///
/// Analytics rows are the only table that grows without bound — every page view of every
/// visitor appends one — and keeping them forever is both pointless for a summary count and
/// worse for privacy than keeping a recent window. So a nightly job trims anything older than
/// the retention window.
///
/// The call is guarded by a shared secret (Maintenance:Token / MAINTENANCE_TOKEN) because it
/// deletes rows; with no token configured the endpoint refuses to run at all rather than
/// leaving a public delete button on the internet.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class MaintenanceController : ControllerBase
{
    public const string TokenHeader = "X-Maintenance-Token";
    private const int DefaultRetentionDays = 90;

    private readonly ZeginDbContext _db;
    private readonly IConfiguration _config;
    private readonly ILogger<MaintenanceController> _logger;

    public MaintenanceController(ZeginDbContext db, IConfiguration config, ILogger<MaintenanceController> logger)
    {
        _db = db;
        _config = config;
        _logger = logger;
    }

    [HttpPost("cleanup")]
    public async Task<IActionResult> Cleanup([FromQuery] int? retentionDays)
    {
        if (Authorize() is { } failure) return failure;

        var days = retentionDays ?? _config.GetValue<int?>("Maintenance:RetentionDays") ?? DefaultRetentionDays;
        if (days < 1) return BadRequest(new { message = "retentionDays must be at least 1." });

        var cutoff = DateTime.UtcNow.AddDays(-days);
        var deleted = await _db.PageViewEvents
            .Where(e => e.Timestamp < cutoff)
            .ExecuteDeleteAsync();

        var remaining = await _db.PageViewEvents.CountAsync();
        _logger.LogInformation("Maintenance cleanup removed {Deleted} page views older than {Cutoff:u}.", deleted, cutoff);

        return Ok(new
        {
            deletedPageViews = deleted,
            remainingPageViews = remaining,
            retentionDays = days,
            cutoffUtc = cutoff,
            ranAtUtc = DateTime.UtcNow,
        });
    }

    /// <summary>
    /// Cheap authenticated no-op. A free-tier container host suspends an idle service and then
    /// spends 30-60s cold-starting it on the next request; pinging this on a schedule keeps the
    /// first real visitor of the day from paying that.
    /// </summary>
    [HttpPost("ping")]
    public IActionResult Ping()
    {
        if (Authorize() is { } failure) return failure;
        return Ok(new { status = "awake", utc = DateTime.UtcNow });
    }

    private IActionResult? Authorize()
    {
        var expected = _config["MAINTENANCE_TOKEN"] ?? _config["Maintenance:Token"];

        if (string.IsNullOrWhiteSpace(expected))
        {
            _logger.LogWarning("Maintenance endpoint called but no maintenance token is configured.");
            return StatusCode(StatusCodes.Status503ServiceUnavailable,
                new { message = "Maintenance endpoints are disabled: no token configured." });
        }

        var provided = Request.Headers[TokenHeader].ToString();
        if (!CryptographicEquals(provided, expected))
            return Unauthorized(new { message = "Invalid maintenance token." });

        return null;
    }

    // Fixed-time comparison so a caller can't narrow the token down by timing repeated guesses.
    private static bool CryptographicEquals(string a, string b) =>
        System.Security.Cryptography.CryptographicOperations.FixedTimeEquals(
            System.Text.Encoding.UTF8.GetBytes(a.PadRight(64)[..64]),
            System.Text.Encoding.UTF8.GetBytes(b.PadRight(64)[..64]));
}
