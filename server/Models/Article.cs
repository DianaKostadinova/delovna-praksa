namespace ZeginHealthHub.Api.Models;

public class Article
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Excerpt { get; set; }
    public string? Content { get; set; }
    public string? Author { get; set; }
    public string? ReadTime { get; set; }
    public string? ImageUrl { get; set; }
    public required string Section { get; set; } // e.g. "Trending Now", "Health Hub Originals"
    public string? Tag { get; set; } // e.g. "NUTRITION", "MENTAL WELLBEING"
    public bool IsFeatured { get; set; }
    public DateTime PublishedAt { get; set; }
}
