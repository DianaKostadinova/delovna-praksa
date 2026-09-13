using Microsoft.AspNetCore.Mvc;
using ZeginHealthHub.Api.Models;
using ZeginHealthHub.Api.Services;

namespace ZeginHealthHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SymptomCheckController : ControllerBase
{
    private readonly SymptomCheckerService _service;
    public SymptomCheckController(SymptomCheckerService service) => _service = service;

    [HttpPost]
    public IActionResult Check([FromBody] SymptomCheckRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Symptoms))
            return BadRequest(new { message = "Please describe your symptoms." });

        var result = _service.Evaluate(request);
        return Ok(result);
    }
}
