using ZeginHealthHub.Api.Models;

namespace ZeginHealthHub.Api.Services;

// Deliberately NOT a real clinical AI model — this is a small keyword-matching rules engine
// that stands in for the "AI Checker" screen in the design so the feature is demonstrable end
// to end. It must never be presented to real users as medical advice.
public class SymptomCheckerService
{
    private const string Disclaimer =
        "Demo only — this is a rule-based mock, not a real clinical AI or medical advice. Always consult a licensed professional.";

    private static readonly (string[] Keywords, string Summary, string Urgency, string[] Recommendations, string[] Products)[] Rules =
    [
        (
            ["fever", "temperature", "chills", "треска", "температура", "воденички"],
            "Symptoms are consistent with a mild fever response.",
            "Moderate",
            ["Rest and stay hydrated.", "Monitor temperature every few hours.", "See a doctor if fever exceeds 39.5°C or lasts more than 3 days."],
            ["Digital No-Touch Thermometer", "Naproxen Sodium"]
        ),
        (
            ["headache", "migraine", "главоболка", "мигрена"],
            "Symptoms suggest a common tension headache.",
            "Low",
            ["Rest in a low-light room.", "Stay hydrated and consider a short break from screens.", "An OTC pain reliever can help with occasional headaches."],
            ["Naproxen Sodium"]
        ),
        (
            ["cough", "wheeze", "shortness of breath", "asthma", "кашлица", "здив", "астма"],
            "Symptoms are consistent with a respiratory irritation.",
            "Moderate",
            ["Avoid known irritants such as smoke or dust.", "Use a rescue inhaler if you have one prescribed.", "Seek urgent care if breathing becomes difficult."],
            ["Ventolin HFA Inhaler"]
        ),
        (
            ["sneeze", "allergy", "allergies", "runny nose", "itchy eyes", "кивам", "кивање", "алерг", "истекување на нос", "чешање на очи"],
            "Symptoms are consistent with a seasonal allergy flare-up.",
            "Low",
            ["Limit exposure to known allergens.", "An antihistamine can relieve most symptoms within an hour.", "See a doctor if symptoms persist beyond two weeks."],
            ["Zyrtec Allergy Relief"]
        ),
        (
            ["rash", "hives", "itchy skin", "осип", "чешање на кожа", "коприв"],
            "Symptoms suggest mild skin irritation.",
            "Low",
            ["Avoid scratching the affected area.", "A topical hydrocortisone cream can reduce irritation.", "See a doctor if the rash spreads or blisters."],
            ["Hydrocortisone 1%"]
        ),
    ];

    public SymptomCheckResponse Evaluate(SymptomCheckRequest request)
    {
        var text = request.Symptoms.ToLowerInvariant();

        foreach (var rule in Rules)
        {
            if (rule.Keywords.Any(k => text.Contains(k)))
            {
                return new SymptomCheckResponse
                {
                    Summary = rule.Summary,
                    Urgency = rule.Urgency,
                    Recommendations = rule.Recommendations.ToList(),
                    SuggestedProducts = rule.Products.ToList(),
                    Disclaimer = Disclaimer
                };
            }
        }

        return new SymptomCheckResponse
        {
            Summary = "We couldn't match your symptoms to a common pattern.",
            Urgency = "See a doctor",
            Recommendations = ["Describe your symptoms with more detail (location, duration, severity).", "If symptoms are severe or worsening, consult a pharmacist or physician."],
            SuggestedProducts = [],
            Disclaimer = Disclaimer
        };
    }
}
