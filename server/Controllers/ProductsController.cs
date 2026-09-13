using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZeginHealthHub.Api.Data;

namespace ZeginHealthHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ZeginDbContext _db;
    public ProductsController(ZeginDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? category, [FromQuery] string? search)
    {
        var query = _db.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category))
            query = query.Where(p => p.Category == category);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Name.Contains(search) || p.Description.Contains(search));

        var products = await query.OrderBy(p => p.Name).ToListAsync();
        return Ok(products);
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _db.Products.Select(p => p.Category).Distinct().ToListAsync();
        return Ok(categories);
    }
}
