namespace ZeginHealthHub.Api.Models;

// Powers the "Did You Know?" strip on the home page
public class HealthFact
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Detail { get; set; }
    public required string Icon { get; set; } // icon key rendered client-side
}
