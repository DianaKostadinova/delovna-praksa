namespace ZeginHealthHub.Api.Models;

public class PageViewRequest
{
    public required string VisitorId { get; set; }
    public required string Path { get; set; }
    public string? Language { get; set; }
}

public class PageViewSummary
{
    public required string Path { get; set; }
    public int Views { get; set; }
    public int UniqueVisitors { get; set; }
}

public class AnalyticsSummaryResponse
{
    public int TotalViews { get; set; }
    public int TotalUniqueVisitors { get; set; }
    public required List<PageViewSummary> ByPath { get; set; }
}
