using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZeginHealthHub.Api.Data;
using ZeginHealthHub.Api.Models;

namespace ZeginHealthHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly ZeginDbContext _db;
    public DashboardController(ZeginDbContext db) => _db = db;

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var pending = await _db.Prescriptions.CountAsync(p => p.Status == PrescriptionStatus.Pending);
        var filledToday = await _db.Prescriptions.CountAsync(p => p.Status == PrescriptionStatus.Completed);
        return Ok(new { pending, filledToday });
    }

    [HttpGet("prescriptions")]
    public async Task<IActionResult> GetRecentPrescriptions()
    {
        var recent = await _db.Prescriptions
            .OrderByDescending(p => p.DatePrescribed)
            .Take(5)
            .Select(p => new { p.RxId, p.Medication, p.Status })
            .ToListAsync();
        return Ok(recent);
    }

    // Looks a patient up by their fictitious PatientCode (the design's "SSN lookup" field,
    // implemented against seeded demo data only — never real SSNs).
    [HttpGet("patients/{patientCode}")]
    public async Task<IActionResult> GetPatient(string patientCode)
    {
        var patient = await _db.Patients
            .Include(p => p.Prescriptions)
            .FirstOrDefaultAsync(p => p.PatientCode == patientCode);

        if (patient is null)
            return NotFound(new { message = $"No patient found for code {patientCode}." });

        return Ok(patient);
    }
}
