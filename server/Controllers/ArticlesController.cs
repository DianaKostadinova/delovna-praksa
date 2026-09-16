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
    public async Task<IActionResult> GetAll([FromQuery] string? section)
    {
        var query = _db.Articles.AsQueryable();
        if (!string.IsNullOrWhiteSpace(section))
            query = query.Where(a => a.Section == section);

        var articles = await query.OrderByDescending(a => a.PublishedAt).ToListAsync();
        return Ok(articles);
    }

    [HttpGet("facts")]
    public async Task<IActionResult> GetFacts()
    {
        var facts = await _db.HealthFacts.ToListAsync();
        return Ok(facts);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var article = await _db.Articles.FindAsync(id);
        if (article is null)
            return NotFound(new { message = $"No article found with id {id}." });

        return Ok(article);
    }
}
