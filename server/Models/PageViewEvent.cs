namespace ZeginHealthHub.Api.Models;

// First-party, anonymous analytics only: a random per-browser VisitorId (no account, no IP,
// no cross-site identifier) paired with the path visited. Only recorded once the user accepts
// the cookie banner on the client — never before.
public class PageViewEvent
{
    public int Id { get; set; }
    public required string VisitorId { get; set; }
    public required string Path { get; set; }
    public string? Language { get; set; }
    public DateTime Timestamp { get; set; }
}
