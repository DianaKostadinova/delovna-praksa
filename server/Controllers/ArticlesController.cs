using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZeginHealthHub.Api.Data;

namespace ZeginHealthHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticlesController : ControllerBase
{
    private readonly ZeginDbContext _db;
    public ArticlesController(ZeginDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var articles = await _db.Articles.OrderByDescending(a => a.PublishedAt).ToListAsync();
        return Ok(articles);
    }

    [HttpGet("facts")]
    public async Task<IActionResult> GetFacts()
    {
        var facts = await _db.HealthFacts.ToListAsync();
        return Ok(facts);
    }
}
