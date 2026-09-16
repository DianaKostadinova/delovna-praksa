using Microsoft.AspNetCore.Mvc;
using ZeginHealthHub.Api.Data;
using ZeginHealthHub.Api.Models;

namespace ZeginHealthHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly ZeginDbContext _db;
    public ContactController(ZeginDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name) || request.Name.Length > 100)
            return BadRequest(new { message = "Invalid name." });

        if (string.IsNullOrWhiteSpace(request.Email) || request.Email.Length > 200 || !request.Email.Contains('@'))
            return BadRequest(new { message = "Invalid email." });

        if (string.IsNullOrWhiteSpace(request.Subject) || request.Subject.Length > 200)
            return BadRequest(new { message = "Invalid subject." });

        if (string.IsNullOrWhiteSpace(request.Message) || request.Message.Length > 4000)
            return BadRequest(new { message = "Invalid message." });

        _db.ContactMessages.Add(new ContactMessage
        {
            Name = request.Name,
            Email = request.Email,
            Subject = request.Subject,
            Message = request.Message,
            SubmittedAt = DateTime.UtcNow,
        });
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
