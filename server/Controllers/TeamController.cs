using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZeginHealthHub.Api.Data;

namespace ZeginHealthHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamController : ControllerBase
{
    private readonly ZeginDbContext _db;
    public TeamController(ZeginDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var members = await _db.TeamMembers.OrderBy(m => m.SortOrder).ToListAsync();
        return Ok(members);
    }
}
