using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZeginHealthHub.Api.Data;
using ZeginHealthHub.Api.Models;

namespace ZeginHealthHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly ZeginDbContext _db;
    public AnalyticsController(ZeginDbContext db) => _db = db;

    // Records one page view. First-party and anonymous: the client only ever sends a random
    // per-browser id (no account, no IP is stored), and only after the visitor has accepted
    // the cookie banner — enforcement of that consent lives client-side before this is called.
    [HttpPost("pageview")]
    public async Task<IActionResult> RecordPageView([FromBody] PageViewRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.VisitorId) || request.VisitorId.Length > 64)
            return BadRequest(new { message = "Invalid visitor id." });

        if (string.IsNullOrWhiteSpace(request.Path) || !request.Path.StartsWith('/') || request.Path.Length > 200)
            return BadRequest(new { message = "Invalid path." });

        _db.PageViewEvents.Add(new PageViewEvent
        {
            VisitorId = request.VisitorId,
            Path = request.Path,
            Language = request.Language?.Length <= 8 ? request.Language : null,
            Timestamp = DateTime.UtcNow,
        });
        await _db.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var events = await _db.PageViewEvents.ToListAsync();

        var byPath = events
            .GroupBy(e => e.Path)
            .Select(g => new PageViewSummary
            {
                Path = g.Key,
                Views = g.Count(),
                UniqueVisitors = g.Select(e => e.VisitorId).Distinct().Count(),
            })
            .OrderByDescending(s => s.Views)
            .ToList();

        var summary = new AnalyticsSummaryResponse
        {
            TotalViews = events.Count,
            TotalUniqueVisitors = events.Select(e => e.VisitorId).Distinct().Count(),
            ByPath = byPath,
        };

        return Ok(summary);
    }
}
