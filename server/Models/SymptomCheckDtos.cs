namespace ZeginHealthHub.Api.Models;

public class SymptomCheckRequest
{
    public int? Age { get; set; }
    public required string Symptoms { get; set; }
}

public class SymptomCheckResponse
{
    public required string Summary { get; set; }
    public required string Urgency { get; set; } // "Low", "Moderate", "See a doctor"
    public required List<string> Recommendations { get; set; }
    public required List<string> SuggestedProducts { get; set; }
    public required string Disclaimer { get; set; }
}
