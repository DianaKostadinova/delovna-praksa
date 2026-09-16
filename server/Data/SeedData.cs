using ZeginHealthHub.Api.Models;

namespace ZeginHealthHub.Api.Data;

public static class SeedData
{
    public static void EnsureSeeded(ZeginDbContext db)
    {
        if (!db.Articles.Any())
        {
            db.Articles.AddRange(
                new Article
                {
                    Title = "The Future of Personalized Medicine: How AI is Reshaping Your Prescription.",
                    Excerpt = "Dr. Elena Petrova · 8 Min Read",
                    Author = "Dr. Elena Petrova",
                    ReadTime = "8 Min Read",
                    ImageUrl = "/images/article-personalized-medicine.jpg",
                    Section = "Trending Now",
                    Tag = "TRENDING NOW",
                    IsFeatured = true,
                    PublishedAt = DateTime.UtcNow.AddDays(-2)
                },
                new Article
                {
                    Title = "Why Vitamin D is the 'Silent Champion' of Bone Density.",
                    Excerpt = "Recent studies suggest that over 40% of adults lack sufficient Vitamin D levels during winter...",
                    Section = "Health Tip",
                    Tag = "HEALTH TIP",
                    IsFeatured = false,
                    PublishedAt = DateTime.UtcNow.AddDays(-1)
                },
                new Article
                {
                    Title = "“Prevention is the best cure.” — An Interview with Dr. Marcus Thorne",
                    Excerpt = "“Most lifestyle diseases can be mitigated with simple, consistent choices. Our goal at Zegin is to provide the data that empowers those choices.” In our exclusive monthly interview, we sit down with leading cardiologist Dr. Thorne to discuss the intersection of biotechnology and daily fitness routines.",
                    Author = "Dr. Marcus Thorne",
                    ImageUrl = "/images/article-dr-thorne.jpg",
                    Section = "Spotlight",
                    Tag = "HEALTHY LIVING SPOTLIGHT",
                    IsFeatured = true,
                    PublishedAt = DateTime.UtcNow.AddDays(-3)
                },
                new Article
                {
                    Title = "Superfoods or Marketing? The Science Behind the Label.",
                    Excerpt = "We analyze the biochemical composition of the decade's biggest food trends to see what actually helps your body.",
                    ImageUrl = "/images/article-superfoods.jpg",
                    Section = "Health Hub Originals",
                    Tag = "NUTRITION",
                    ReadTime = "12 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-5)
                },
                new Article
                {
                    Title = "The Neurobiology of Mindfulness: Measuring Stress at the Synapse.",
                    Excerpt = "New imaging technology shows exactly how 10 minutes of meditation changes your brain's response to cortisol.",
                    ImageUrl = "/images/article-mindfulness.jpg",
                    Section = "Health Hub Originals",
                    Tag = "MENTAL WELLBEING",
                    ReadTime = "6 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-6)
                },

                // Blog page — original posts, written for this demo (not sourced from any real site).
                new Article { Title = "Magnesium and Sleep: The Mineral Your Nightly Routine Is Missing", Excerpt = "Why this often-overlooked mineral plays a bigger role in muscle recovery and sleep quality than most people realize.", Section = "Blog Post", Tag = "VITAMINS & MINERALS", ReadTime = "5 Min Read", PublishedAt = DateTime.UtcNow.AddDays(-1) },
                new Article { Title = "Probiotics 101: How to Actually Choose the Right Strain", Excerpt = "Not all probiotic supplements are created equal — a quick guide to matching the strain to the symptom.", Section = "Blog Post", Tag = "GUT HEALTH", ReadTime = "6 Min Read", PublishedAt = DateTime.UtcNow.AddDays(-2) },
                new Article { Title = "Sunscreen Myths, Debunked by a Dermatologist", Excerpt = "From \"my skin is too dark to burn\" to \"higher SPF means I can skip reapplying\" — separating fact from habit.", Section = "Blog Post", Tag = "SKIN CARE", ReadTime = "4 Min Read", PublishedAt = DateTime.UtcNow.AddDays(-3) },
                new Article { Title = "Managing Seasonal Allergies Without Overmedicating", Excerpt = "A practical, step-by-step approach — from air quality habits to knowing when an antihistamine is actually necessary.", Section = "Blog Post", Tag = "ALLERGIES", ReadTime = "5 Min Read", PublishedAt = DateTime.UtcNow.AddDays(-4) },
                new Article { Title = "Building a Home Pharmacy Cabinet That's Actually Baby-Safe", Excerpt = "What belongs in easy reach, what belongs locked away, and the OTC basics every new parent should stock.", Section = "Blog Post", Tag = "FAMILY CARE", ReadTime = "7 Min Read", PublishedAt = DateTime.UtcNow.AddDays(-6) },
                new Article { Title = "Understanding Your Blood Pressure Numbers", Excerpt = "What systolic and diastolic actually measure, and why one high reading isn't automatically a diagnosis.", Section = "Blog Post", Tag = "HEART HEALTH", ReadTime = "5 Min Read", PublishedAt = DateTime.UtcNow.AddDays(-7) },
                new Article { Title = "The Gut-Skin Connection: Is Your Diet Behind Your Breakouts?", Excerpt = "Emerging research on how gut inflammation shows up on your skin — and what changes actually help.", Section = "Blog Post", Tag = "SKIN CARE", ReadTime = "6 Min Read", PublishedAt = DateTime.UtcNow.AddDays(-8) },
                new Article { Title = "Hydration Beyond Eight Glasses a Day", Excerpt = "Why the old rule of thumb oversimplifies things, and how to actually gauge whether you're drinking enough.", Section = "Blog Post", Tag = "WELLNESS", ReadTime = "4 Min Read", PublishedAt = DateTime.UtcNow.AddDays(-9) },
                new Article { Title = "When Back Pain Needs a Doctor, Not Just Rest", Excerpt = "Most back pain resolves on its own — here are the specific warning signs that mean it's time to get checked.", Section = "Blog Post", Tag = "PAIN MANAGEMENT", ReadTime = "5 Min Read", PublishedAt = DateTime.UtcNow.AddDays(-10) },

                // Blog sidebar — recipe stubs, original.
                new Article { Title = "Iron-Rich Lentil Soup for Busy Weeknights", Excerpt = "Recipe", Section = "Recipe", PublishedAt = DateTime.UtcNow.AddDays(-2) },
                new Article { Title = "No-Sugar Oat Energy Bites", Excerpt = "Recipe", Section = "Recipe", PublishedAt = DateTime.UtcNow.AddDays(-4) },
                new Article { Title = "Anti-Inflammatory Turmeric Smoothie", Excerpt = "Recipe", Section = "Recipe", PublishedAt = DateTime.UtcNow.AddDays(-7) },
                new Article { Title = "High-Fiber Breakfast Bowl in 10 Minutes", Excerpt = "Recipe", Section = "Recipe", PublishedAt = DateTime.UtcNow.AddDays(-12) }
            );
        }

        if (!db.HealthFacts.Any())
        {
            db.HealthFacts.AddRange(
                new HealthFact { Title = "Your Heart's Power", Detail = "The heart creates enough energy each day to drive a truck for 20 miles.", Icon = "heart" },
                new HealthFact { Title = "Brain Processing", Detail = "Information travels along nerves at up to 268 miles per hour — faster than a super car.", Icon = "brain" },
                new HealthFact { Title = "Eye Focus", Detail = "Your eyes can process around 36,000 pieces of visual information every hour.", Icon = "eye" },
                new HealthFact { Title = "Water Component", Detail = "Your blood is roughly 90% water, which is why hydration is critical for cardiovascular health.", Icon = "droplet" }
            );
        }

        if (!db.Products.Any())
        {
            db.Products.AddRange(
                new Product { Name = "Zyrtec Allergy Relief", Category = "Allergies", Description = "10mg Tablets, 30 Count", Price = 18.99m, Stock = StockStatus.InStock, NearbyStoreCount = 4, ImageUrl = "/images/product-zyrtec.jpg", PharmacistRecommended = true },
                new Product { Name = "Ventolin HFA Inhaler", Category = "Respiratory", Description = "108mcg, 200 Metered Doses", Price = 45.00m, Stock = StockStatus.InStock, NearbyStoreCount = 2, ImageUrl = "/images/product-ventolin.jpg" },
                new Product { Name = "Centrum Silver Men", Category = "Vitamins", Description = "Multivitamin, 100 Tablets", Price = 12.49m, Stock = StockStatus.LowStock, NearbyStoreCount = 1, ImageUrl = "/images/product-centrum.jpg" },
                new Product { Name = "Hydrocortisone 1%", Category = "Topical Care", Description = "Maximum Strength, 1oz Cream", Price = 6.95m, Stock = StockStatus.InStock, NearbyStoreCount = 8, ImageUrl = "/images/product-hydrocortisone.jpg" },
                new Product { Name = "Naproxen Sodium", Category = "Pain Relief", Description = "220mg Liquid Gels, 80 Count", Price = 14.99m, Stock = StockStatus.InStock, NearbyStoreCount = 5, ImageUrl = "/images/product-naproxen.jpg" },
                new Product { Name = "Digital No-Touch Thermometer", Category = "Diagnostics", Description = "Infrared, Medical Grade Accuracy", Price = 29.99m, Stock = StockStatus.InStock, NearbyStoreCount = 6, ImageUrl = "/images/product-thermometer.jpg" }
            );
        }

        if (!db.Patients.Any())
        {
            var patient = new Patient
            {
                PatientCode = "992-BA-01",
                FullName = "James T. Harrison",
                DateOfBirth = new DateOnly(1978, 5, 12),
                BloodType = "O Positive",
                Allergies = "Penicillin",
                InsuranceStatus = "Insurance Active",
                PhotoUrl = "/images/patient-james-harrison.jpg"
            };
            db.Patients.Add(patient);
            db.SaveChanges();

            db.Prescriptions.AddRange(
                new Prescription { PatientId = patient.Id, RxId = "RX-448291", Medication = "Lisinopril", DosageInfo = "ACE Inhibitor", Dosage = "10mg Oral Tab", Physician = "Dr. Aris Thorne", Status = PrescriptionStatus.Active, DatePrescribed = new DateOnly(2023, 10, 24) },
                new Prescription { PatientId = patient.Id, RxId = "RX-129038", Medication = "Amoxicillin", DosageInfo = "Antibiotic", Dosage = "500mg (14 days)", Physician = "Dr. Sarah Miller", Status = PrescriptionStatus.Completed, DatePrescribed = new DateOnly(2023, 9, 12) },
                new Prescription { PatientId = patient.Id, RxId = "RX-448212", Medication = "Atorvastatin", DosageInfo = "Statin", Dosage = "20mg Oral Tab", Physician = "Dr. Aris Thorne", Status = PrescriptionStatus.Active, DatePrescribed = new DateOnly(2023, 8, 5) },
                new Prescription { PatientId = patient.Id, RxId = "RX-771034", Medication = "Ibuprofen", DosageInfo = "NSAID", Dosage = "400mg (As needed)", Physician = "Self-Prescribed", Status = PrescriptionStatus.Completed, DatePrescribed = new DateOnly(2023, 7, 18) }
            );

            var patient2 = new Patient
            {
                PatientCode = "441-CQ-19",
                FullName = "Maria Gonzalez",
                DateOfBirth = new DateOnly(1990, 2, 3),
                BloodType = "A Negative",
                Allergies = "None known",
                InsuranceStatus = "Insurance Active",
                PhotoUrl = "/images/patient-maria-gonzalez.jpg"
            };
            db.Patients.Add(patient2);
            db.SaveChanges();

            db.Prescriptions.Add(new Prescription { PatientId = patient2.Id, RxId = "RX-902213", Medication = "Metformin", DosageInfo = "Antidiabetic", Dosage = "500mg Oral Tab", Physician = "Dr. Sarah Miller", Status = PrescriptionStatus.Active, DatePrescribed = new DateOnly(2024, 1, 9) });
        }

        if (!db.TeamMembers.Any())
        {
            db.TeamMembers.AddRange(
                new TeamMember
                {
                    Name = "Dr. Biljana Stefanovska",
                    Role = "Chief Pharmacist Officer",
                    Bio = "Leads clinical standards across all Zegin branches. 18 years in hospital and community pharmacy, with a focus on medication safety.",
                    BranchName = "Zegin Head Office",
                    BranchAddress = "Bulevar Ilinden 1, Skopje",
                    Email = "b.stefanovska@zegin.com",
                    Phone = "+389 2 3100 101",
                    PhotoUrl = "/images/team-biljana-stefanovska.jpg",
                    IsHeadOffice = true,
                    SortOrder = 1,
                },
                new TeamMember
                {
                    Name = "Aleksandar Jovanovski",
                    Role = "Patient Support Lead",
                    Bio = "Runs the 24/7 pharmacist consultation line and patient support team. First point of contact for prescription or insurance questions.",
                    BranchName = "Zegin Head Office",
                    BranchAddress = "Bulevar Ilinden 1, Skopje",
                    Email = "a.jovanovski@zegin.com",
                    Phone = "+389 2 3100 102",
                    PhotoUrl = "/images/team-aleksandar-jovanovski.jpg",
                    IsHeadOffice = true,
                    SortOrder = 2,
                },
                new TeamMember
                {
                    Name = "Elena Trajkovska",
                    Role = "Operations Manager",
                    Bio = "Oversees stock, logistics, and day-to-day operations across all Skopje branches, keeping shelves stocked and wait times short.",
                    BranchName = "Zegin Head Office",
                    BranchAddress = "Bulevar Ilinden 1, Skopje",
                    Email = "e.trajkovska@zegin.com",
                    Phone = "+389 2 3100 103",
                    PhotoUrl = "/images/team-elena-trajkovska.jpg",
                    IsHeadOffice = true,
                    SortOrder = 3,
                },
                new TeamMember
                {
                    Name = "Marko Ilievski",
                    Role = "Branch Pharmacist",
                    Bio = "Specializes in chronic disease management and medication reviews. Fluent in Macedonian, English, and Albanian.",
                    BranchName = "Zegin Centar",
                    BranchAddress = "Makedonija 11, Skopje",
                    Email = "m.ilievski@zegin.com",
                    Phone = "+389 2 3100 201",
                    PhotoUrl = "/images/team-marko-ilievski.jpg",
                    IsHeadOffice = false,
                    SortOrder = 4,
                },
                new TeamMember
                {
                    Name = "Sara Petkovska",
                    Role = "Branch Pharmacist",
                    Bio = "Leads travel-health and vaccination consultations at the Aerodrom branch, near Skopje's main transit hub.",
                    BranchName = "Zegin Aerodrom",
                    BranchAddress = "Aleksandar Makedonski 42, Skopje",
                    Email = "s.petkovska@zegin.com",
                    Phone = "+389 2 3100 202",
                    PhotoUrl = "/images/team-sara-petkovska.jpg",
                    IsHeadOffice = false,
                    SortOrder = 5,
                },
                new TeamMember
                {
                    Name = "Filip Naumovski",
                    Role = "Branch Pharmacist",
                    Bio = "Focuses on pediatric dosing and family care at the Karpoš branch. Runs monthly community health-screening days.",
                    BranchName = "Zegin Karpoš",
                    BranchAddress = "Partizanski Odredi 45, Skopje",
                    Email = "f.naumovski@zegin.com",
                    Phone = "+389 2 3100 203",
                    PhotoUrl = "/images/team-filip-naumovski.jpg",
                    IsHeadOffice = false,
                    SortOrder = 6,
                },
                new TeamMember
                {
                    Name = "Ivana Georgievska",
                    Role = "Branch Pharmacist",
                    Bio = "Handles compounding and specialty prescriptions at the Gazi Baba branch, with a background in clinical nutrition.",
                    BranchName = "Zegin Gazi Baba",
                    BranchAddress = "Nikola Karev 5, Skopje",
                    Email = "i.georgievska@zegin.com",
                    Phone = "+389 2 3100 204",
                    PhotoUrl = "/images/team-ivana-georgievska.jpg",
                    IsHeadOffice = false,
                    SortOrder = 7,
                }
            );
        }

        db.SaveChanges();
    }
}
