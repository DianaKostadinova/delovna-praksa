namespace ZeginHealthHub.Api.Models;

// Fictional demo data — a "Meet the Team" directory of head-office support staff and
// branch pharmacists across Zegin's Skopje locations.
public class TeamMember
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Role { get; set; }
    public required string BranchName { get; set; } // e.g. "Zegin Centar"
    public required string BranchAddress { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public string? PhotoUrl { get; set; }
    public bool IsHeadOffice { get; set; }
    public int SortOrder { get; set; }
}
