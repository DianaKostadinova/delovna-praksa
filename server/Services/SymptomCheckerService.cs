using ZeginHealthHub.Api.Models;

namespace ZeginHealthHub.Api.Services;

// Deliberately NOT a real clinical AI model — this is a keyword-matching rules engine that
// stands in for the "Symptom Checker" screen in the design so the feature is demonstrable end
// to end. It must never be presented to real users as medical advice. Products that require a
// prescription (RequiresRx) are never listed as a direct suggestion — the recommendation text
// points the user to a doctor or pharmacist instead.
public class SymptomCheckerService
{
    private const string Disclaimer =
        "Demo only — this is a rule-based mock, not a real clinical AI or medical advice. Always consult a licensed professional.";

    private sealed record Rule(
        string[] Keywords,
        string Summary,
        string Urgency,
        string[] Recommendations,
        string[] Products,
        bool RequiresRx = false);

    private static readonly Rule[] Rules =
    [
        new(
            ["fever", "temperature", "chills", "sweating", "треска", "температура", "воденички", "студенки"],
            "Symptoms are consistent with a mild fever response.",
            "Moderate",
            ["Rest and stay hydrated.", "Monitor temperature every few hours.", "See a doctor if fever exceeds 39.5°C or lasts more than 3 days."],
            ["Naproxen Sodium", "Digital No-Touch Thermometer"]
        ),
        new(
            ["headache", "migraine", "главоболка", "мигрена"],
            "Symptoms suggest a common tension headache.",
            "Low",
            ["Rest in a low-light room.", "Stay hydrated and consider a short break from screens.", "An OTC pain reliever can help with occasional headaches."],
            ["Naproxen Sodium"]
        ),
        new(
            ["wheeze", "shortness of breath", "asthma", "tight chest", "can't breathe", "здив", "астма", "стегање во градите"],
            "Symptoms are consistent with respiratory distress.",
            "Moderate",
            ["Avoid known irritants such as smoke or dust.", "Use a rescue inhaler if you have one prescribed.", "Seek urgent care if breathing becomes difficult."],
            ["Ventolin HFA Inhaler"]
        ),
        new(
            ["cough", "mucus", "phlegm", "chest congestion", "productive cough", "кашлица", "секрет", "слуз"],
            "Symptoms suggest a chesty cough with mucus buildup.",
            "Low",
            ["Stay hydrated to help loosen mucus.", "An expectorant syrup can help clear the chest.", "See a doctor if the cough lasts more than 2 weeks or you notice blood."],
            ["Bisolvon Syrup"]
        ),
        new(
            ["sore throat", "scratchy throat", "throat pain", "difficulty swallowing", "грлобол", "болка во грло", "грло"],
            "Symptoms suggest throat irritation.",
            "Low",
            ["Drink warm fluids and rest your voice.", "Throat lozenges can soothe occasional soreness.", "See a doctor if pain is severe, you have a high fever, or notice white patches."],
            ["Throat Lozenges"]
        ),
        new(
            ["sneeze", "allergy", "allergies", "runny nose", "itchy eyes", "hay fever", "кивам", "кивање", "алерг", "истекување на нос", "чешање на очи"],
            "Symptoms are consistent with a seasonal allergy flare-up.",
            "Low",
            ["Limit exposure to known allergens.", "An antihistamine can relieve most symptoms within an hour.", "See a doctor if symptoms persist beyond two weeks."],
            ["Zyrtec Allergy Relief", "Alergoforce Nasal Spray"]
        ),
        new(
            ["blocked nose", "stuffy nose", "congestion", "sinus", "can't breathe through nose", "затнат нос", "синузитис", "затнатост"],
            "Symptoms suggest nasal congestion or sinus pressure.",
            "Low",
            ["A decongestant nasal spray can help short term (max 5–7 days of use).", "Steam inhalation may ease sinus pressure.", "See a doctor if facial pain or fever suggests a sinus infection."],
            ["Olynth HA 0.1%", "Rinasek"]
        ),
        new(
            ["rash", "hives", "itchy skin", "red skin", "осип", "чешање на кожа", "коприв"],
            "Symptoms suggest mild skin irritation.",
            "Low",
            ["Avoid scratching the affected area.", "A topical hydrocortisone cream can reduce irritation.", "See a doctor if the rash spreads or blisters."],
            ["Hydrocortisone 1%"]
        ),
        new(
            ["acne", "pimples", "breakout", "oily skin", "акни", "пришти", "масна кожа"],
            "Symptoms suggest an acne breakout.",
            "Low",
            ["Use a gentle, non-comedogenic cleanser.", "Avoid picking at blemishes.", "See a dermatologist if breakouts are severe or cystic."],
            ["Effaclar AZ Gel Cream"]
        ),
        new(
            ["redness", "rosacea", "sensitive skin", "flushing", "зачервенета кожа", "розацеа"],
            "Symptoms suggest sensitive or redness-prone skin.",
            "Low",
            ["Switch to fragrance-free products.", "Use daily sun protection.", "See a dermatologist if redness is persistent or worsening."],
            ["Toleriane Rosaliac SPF30", "Avene Cleansing Foam"]
        ),
        new(
            ["dry skin", "flaky skin", "cracked skin", "сува кожа", "испукана кожа"],
            "Symptoms suggest dehydrated or dry skin.",
            "Low",
            ["Use a fragrance-free moisturizer daily.", "Take shorter, lukewarm showers.", "See a doctor if skin is cracking or bleeding."],
            ["Mixa Ceramide Protect"]
        ),
        new(
            ["constipation", "can't poop", "hard stool", "запек", "тврда столица"],
            "Symptoms are consistent with occasional constipation.",
            "Low",
            ["Increase fiber and fluid intake.", "A short-term laxative can offer relief.", "See a doctor if it lasts more than a week or is painful."],
            ["Dulcolax 5mg"]
        ),
        new(
            ["diarrhea", "upset stomach", "food poisoning", "loose stool", "дијареа", "вознемирен стомак", "растроен стомак"],
            "Symptoms are consistent with an upset stomach.",
            "Moderate",
            ["Drink fluids with electrolytes to stay hydrated.", "An intestinal adsorbent can help ease symptoms.", "See a doctor if you notice blood, fever, or symptoms last more than 2 days."],
            ["Enterosgel"]
        ),
        new(
            ["bruise", "bruising", "varicose vein", "swollen legs", "heavy legs", "модринка", "вени", "отечени нозе"],
            "Symptoms suggest minor bruising or vein discomfort.",
            "Low",
            ["Elevate your legs when resting.", "A topical heparin gel can ease minor bruising.", "See a doctor for sudden, severe swelling or pain."],
            ["Hepathrombin Gel"]
        ),
        new(
            ["cut", "wound", "scrape", "graze", "small wound", "рана", "гребнатина"],
            "Symptoms suggest a minor cut or wound.",
            "Low",
            ["Clean the wound with water and pat dry.", "An antiseptic powder can help prevent infection.", "See a doctor if the wound is deep, won't stop bleeding, or shows signs of infection."],
            ["Tyrosur Wound Powder"]
        ),
        new(
            ["tired", "fatigue", "low energy", "weak immune system", "get sick often", "уморен", "замор", "слаб имунитет"],
            "Symptoms suggest fatigue or reduced immune resilience.",
            "Low",
            ["Prioritize sleep and a balanced diet.", "Vitamin C and zinc can support your immune system.", "See a doctor if fatigue persists beyond two weeks."],
            ["Vitamin C 500mg", "Zinc 15mg"]
        ),
        new(
            ["muscle pain", "joint pain", "sore muscles", "sports injury", "back pain", "мускулна болка", "болки во зглобовите", "болки во грбот"],
            "Symptoms suggest muscle or joint discomfort.",
            "Low",
            ["Rest the area and alternate cold/heat therapy.", "A cooling spray can offer quick relief.", "See a doctor if pain is severe or doesn't improve."],
            ["Ice Power Cold Spray", "Naproxen Sodium"]
        ),
        new(
            ["forgetful", "memory", "concentration", "poor circulation", "заборавност", "меморија", "концентрација", "циркулација"],
            "Symptoms suggest mild memory or circulation concerns.",
            "Low",
            ["Ask your pharmacist about supportive supplements.", "Stay physically and mentally active.", "See a doctor if symptoms are sudden or severe."],
            ["Bilobil Forte"]
        ),
        new(
            ["multivitamin", "general health", "senior health", "wellness checkup", "витамини", "општо здравје"],
            "You're looking for general wellness support.",
            "Low",
            ["Maintain a balanced diet and regular exercise.", "A daily multivitamin can help fill nutritional gaps.", "Schedule regular checkups with your doctor."],
            ["Centrum Silver Men"]
        ),
        new(
            ["ear pain", "earache", "ear infection", "боли ме увото", "увото боли"],
            "Symptoms suggest ear pain, possibly an ear infection.",
            "See a doctor",
            ["Avoid inserting anything into the ear canal.", "See a doctor for a proper diagnosis — ear infections often need a prescription treatment."],
            [],
            RequiresRx: true
        ),
        new(
            ["pus", "infected wound", "swollen glands", "strep throat", "гној", "инфицирана рана", "отечени жлезди"],
            "Symptoms may indicate a bacterial infection that needs medical evaluation.",
            "See a doctor",
            ["See a doctor promptly for an evaluation.", "Bacterial infections often require a prescribed antibiotic — never self-medicate with leftover antibiotics."],
            [],
            RequiresRx: true
        ),
        new(
            ["quit smoking", "smoking cessation", "nicotine craving", "престанок со пушење", "желба за цигара"],
            "You're looking for support to quit smoking.",
            "Low",
            ["Set a quit date and plan ahead for cravings.", "Behavioral support meaningfully improves success rates.", "Ask your pharmacist about prescription aids such as Tabex."],
            [],
            RequiresRx: true
        ),
    ];

    private static readonly string[] SeverityOrder = ["Low", "Moderate", "See a doctor"];

    public SymptomCheckResponse Evaluate(SymptomCheckRequest request)
    {
        var text = request.Symptoms.ToLowerInvariant();

        var matches = Rules
            .Select(rule => (Rule: rule, Score: rule.Keywords.Count(k => text.Contains(k))))
            .Where(m => m.Score > 0)
            .ToList();

        if (matches.Count == 0)
        {
            return new SymptomCheckResponse
            {
                Summary = "We couldn't match your symptoms to a common pattern.",
                Urgency = "See a doctor",
                Recommendations = ["Describe your symptoms with more detail (location, duration, severity).", "If symptoms are severe or worsening, consult a pharmacist or physician."],
                SuggestedProducts = [],
                Disclaimer = Disclaimer
            };
        }

        // On a tied score, prefer a rule that routes to a doctor over a self-care one — e.g.
        // "pus" + "wound" should lead with the infection warning, not just a wound-care tip.
        var primary = matches
            .OrderByDescending(m => m.Score)
            .ThenByDescending(m => m.Rule.RequiresRx)
            .First()
            .Rule;

        // Never downplay urgency: if any matched pattern is more severe than the primary one,
        // escalate to that — e.g. "headache" + "swollen glands" should still flag "see a doctor".
        var urgency = matches
            .Select(m => m.Rule.Urgency)
            .OrderByDescending(u => Array.IndexOf(SeverityOrder, u))
            .First();

        var products = primary.RequiresRx
            ? []
            : matches
                .OrderByDescending(m => m.Score)
                .SelectMany(m => m.Rule.Products)
                .Distinct()
                .Take(4)
                .ToList();

        return new SymptomCheckResponse
        {
            Summary = primary.Summary,
            Urgency = urgency,
            Recommendations = primary.Recommendations.ToList(),
            SuggestedProducts = products,
            Disclaimer = Disclaimer
        };
    }
}
