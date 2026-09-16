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
                new Product { Name = "Zyrtec Allergy Relief", Category = "Allergies", Description = "10mg Tablets, 30 Count", Price = 450m, Stock = StockStatus.InStock, NearbyStoreCount = 4, ImageUrl = "/images/product-zyrtec.png", PharmacistRecommended = true },
                new Product { Name = "Ventolin HFA Inhaler", Category = "Respiratory", Description = "108mcg, 200 Metered Doses", Price = 380m, Stock = StockStatus.InStock, NearbyStoreCount = 2, ImageUrl = "/images/product-ventolin.png" },
                new Product { Name = "Centrum Silver Men", Category = "Vitamins", Description = "Multivitamin, 100 Tablets", Price = 1450m, Stock = StockStatus.LowStock, NearbyStoreCount = 1, ImageUrl = "/images/product-centrum.png" },
                new Product { Name = "Hydrocortisone 1%", Category = "Topical Care", Description = "Maximum Strength, 1oz Cream", Price = 180m, Stock = StockStatus.InStock, NearbyStoreCount = 8, ImageUrl = "/images/product-hydrocortisone.png" },
                new Product { Name = "Naproxen Sodium", Category = "Pain Relief", Description = "220mg Liquid Gels, 80 Count", Price = 420m, Stock = StockStatus.InStock, NearbyStoreCount = 5, ImageUrl = "/images/product-naproxen.png" },
                new Product { Name = "Digital No-Touch Thermometer", Category = "Diagnostics", Description = "Infrared, Medical Grade Accuracy", Price = 1200m, Stock = StockStatus.InStock, NearbyStoreCount = 6, ImageUrl = "/images/product-thermometer.png" },
                new Product { Name = "Dulcolax 5mg", Category = "Digestive", Description = "Laxative Tablets, 20 Count", Price = 327m, Stock = StockStatus.InStock, NearbyStoreCount = 5, ImageUrl = "/images/product-dulcolax.png" },
                new Product { Name = "Olynth HA 0.1%", Category = "Respiratory", Description = "Nasal Spray, 10ml", Price = 299m, Stock = StockStatus.InStock, NearbyStoreCount = 7, ImageUrl = "/images/product-olynth.png" },
                new Product { Name = "Bisolvon Syrup", Category = "Respiratory", Description = "4mg/5ml Cough Expectorant, 100ml", Price = 443m, Stock = StockStatus.InStock, NearbyStoreCount = 4, ImageUrl = "/images/product-bisolvon.png" },
                new Product { Name = "Alergoforce Nasal Spray", Category = "Allergies", Description = "Antihistamine Nasal Spray, 15ml", Price = 399m, Stock = StockStatus.InStock, NearbyStoreCount = 3, ImageUrl = "/images/product-alergoforce.webp" },
                new Product { Name = "Hepathrombin Gel", Category = "Topical Care", Description = "300 IE, Heparin Gel, 40g Tube", Price = 254m, Stock = StockStatus.InStock, NearbyStoreCount = 6, ImageUrl = "/images/product-hepathrombin.png" },
                new Product { Name = "Tyrosur Wound Powder", Category = "Topical Care", Description = "Tyrothricin 1mg/g Topical Powder", Price = 389m, Stock = StockStatus.InStock, NearbyStoreCount = 2, ImageUrl = "/images/product-tyrosur.png" },
                new Product { Name = "Rinobact P", Category = "Respiratory", Description = "0.5mg/ml + 0.5mg/ml Nasal Drops with Antibiotic", Price = 280m, Stock = StockStatus.LowStock, NearbyStoreCount = 2, ImageUrl = "/images/product-rinobact.webp", RequiresPrescription = true },
                new Product { Name = "Tabex", Category = "Supplements", Description = "Cytisine 1.5mg, Smoking Cessation Tablets x 100", Price = 880m, Stock = StockStatus.InStock, NearbyStoreCount = 3, ImageUrl = "/images/product-tabex.png", RequiresPrescription = true },
                new Product { Name = "Enterosgel", Category = "Digestive", Description = "Adsorbent Gel Sachets, 10 x 15g", Price = 1664m, Stock = StockStatus.InStock, NearbyStoreCount = 4, ImageUrl = "/images/product-enterosgel.png" },
                new Product { Name = "Vitamin C 500mg", Category = "Supplements", Description = "Tablets, 100 Count", Price = 1194m, Stock = StockStatus.InStock, NearbyStoreCount = 6, ImageUrl = "/images/product-vitaminc.png" },
                new Product { Name = "Zinc 15mg", Category = "Supplements", Description = "Tablets, 60 Count (4 x 15 Blister)", Price = 580m, Stock = StockStatus.InStock, NearbyStoreCount = 5, ImageUrl = "/images/product-zinc.png" },
                new Product { Name = "Throat Lozenges", Category = "Respiratory", Description = "Sore Throat Lozenges", Price = 29m, Stock = StockStatus.InStock, NearbyStoreCount = 8, ImageUrl = "/images/product-throat-lozenges.png" },
                new Product { Name = "Ice Power Cold Spray", Category = "Pain Relief", Description = "Cooling Pain Relief Spray, 200ml", Price = 499m, Stock = StockStatus.InStock, NearbyStoreCount = 3, ImageUrl = "/images/product-icepower.webp" },
                new Product { Name = "Bilobil Forte", Category = "Supplements", Description = "Ginkgo Biloba 80mg Capsules, 20 Count", Price = 235m, Stock = StockStatus.LowStock, NearbyStoreCount = 2, ImageUrl = "/images/product-bilobil.png" },
                new Product { Name = "Rinasek", Category = "Allergies", Description = "Decongestant + Antihistamine Tablets, 10 x (60mg + 2.5mg)", Price = 127m, Stock = StockStatus.InStock, NearbyStoreCount = 5, ImageUrl = "/images/product-rinasek.png" },
                new Product { Name = "Minotic Ear Drops", Category = "Topical Care", Description = "Antibiotic + Corticosteroid Ear Drops", Price = 521m, Stock = StockStatus.InStock, NearbyStoreCount = 2, ImageUrl = "/images/product-minotic.png", RequiresPrescription = true },
                new Product { Name = "Amoxicillin 500mg", Category = "Antibiotics", Description = "Oral Antibiotic Capsules, 16 Count", Price = 450m, Stock = StockStatus.InStock, NearbyStoreCount = 4, ImageUrl = "/images/product-amoxicillin.png", RequiresPrescription = true },
                new Product { Name = "Azithromycin 500mg", Category = "Antibiotics", Description = "Oral Antibiotic Tablets, 3 Count", Price = 620m, Stock = StockStatus.InStock, NearbyStoreCount = 3, ImageUrl = "/images/product-azithromycin.png", RequiresPrescription = true },
                new Product { Name = "Avene Cleansing Foam", Category = "Skincare", Description = "Gentle Cleansing Foam for Sensitive Skin, 200ml", Price = 1344m, Stock = StockStatus.InStock, NearbyStoreCount = 4, ImageUrl = "/images/product-avene.png" },
                new Product { Name = "Mixa Ceramide Protect", Category = "Skincare", Description = "Ceramide Protect Body Lotion, 400ml", Price = 445m, Stock = StockStatus.InStock, NearbyStoreCount = 5, ImageUrl = "/images/product-mixa.webp" },
                new Product { Name = "Effaclar AZ Gel Cream", Category = "Skincare", Description = "Acne Treatment Gel Cream, 40ml", Price = 2674m, Stock = StockStatus.LowStock, NearbyStoreCount = 2, ImageUrl = "/images/product-effaclar.png" },
                new Product { Name = "Toleriane Rosaliac SPF30", Category = "Skincare", Description = "Redness Relief Cream SPF30, 50ml", Price = 2000m, Stock = StockStatus.InStock, NearbyStoreCount = 2, ImageUrl = "/images/product-toleriane.png" },
                new Product { Name = "Beauty of Joseon Dynasty Cream", Category = "K-Beauty", Description = "Ginseng & Snail Mucin Cream, 50ml", Price = 1099m, Stock = StockStatus.InStock, NearbyStoreCount = 3, ImageUrl = "/images/product-kbeauty-joseon-cream.webp", PharmacistRecommended = true },
                new Product { Name = "Beauty of Joseon Revive Serum", Category = "K-Beauty", Description = "Ginseng + Retinal Revive Serum, 30ml", Price = 1499m, Stock = StockStatus.InStock, NearbyStoreCount = 2, ImageUrl = "/images/product-kbeauty-joseon-serum.png" },
                new Product { Name = "Anua Rice Enzyme Cleanser", Category = "K-Beauty", Description = "Brightening Powder Wash, 120g", Price = 1099m, Stock = StockStatus.InStock, NearbyStoreCount = 4, ImageUrl = "/images/product-kbeauty-anua-cleanser.png" },
                new Product { Name = "Anua Azelaic Acid Serum", Category = "K-Beauty", Description = "Azelaic Acid 10% + Hyaluron Serum, 30ml", Price = 1699m, Stock = StockStatus.LowStock, NearbyStoreCount = 2, ImageUrl = "/images/product-kbeauty-anua-serum.png" },
                new Product { Name = "Round Lab Dokdo Cleanser", Category = "K-Beauty", Description = "1025 Dokdo Mineral Cleansing Foam, 150ml", Price = 799m, Stock = StockStatus.InStock, NearbyStoreCount = 3, ImageUrl = "/images/product-kbeauty-roundlab.png" },
                new Product { Name = "SKIN1004 Centella Ampoule", Category = "K-Beauty", Description = "Madagascar Centella Asiatica 100 Ampoule, 100ml", Price = 949m, Stock = StockStatus.InStock, NearbyStoreCount = 5, ImageUrl = "/images/product-kbeauty-skin1004.png", PharmacistRecommended = true },
                new Product { Name = "SOME BY MI AHA BHA PHA Toner", Category = "K-Beauty", Description = "30 Days Miracle Toner for Blemishes, 150ml", Price = 1099m, Stock = StockStatus.InStock, NearbyStoreCount = 3, ImageUrl = "/images/product-kbeauty-somebymi.png" },
                new Product { Name = "Centellian24 360 Shot PDRN", Category = "K-Beauty", Description = "PDRN Barrier Repair Essence", Price = 899m, Stock = StockStatus.InStock, NearbyStoreCount = 4, ImageUrl = "/images/product-kbeauty-centellian24.png" },
                new Product { Name = "VT Reedle Shot 300", Category = "K-Beauty", Description = "Microneedle Texture Serum, 50ml", Price = 1999m, Stock = StockStatus.LowStock, NearbyStoreCount = 1, ImageUrl = "/images/product-kbeauty-vt.png" },
                new Product { Name = "TIRTIR Mask Fit Red Cushion", Category = "K-Beauty", Description = "Glow Cushion Foundation with SPF", Price = 1599m, Stock = StockStatus.InStock, NearbyStoreCount = 3, ImageUrl = "/images/product-kbeauty-tirtir.png" }
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
