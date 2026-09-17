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
                    Content = """
                    A decade ago, "personalized medicine" mostly meant asking about family history and adjusting a dose up or down based on age and weight. Today, the same phrase describes something far more specific: software that reads a patient's genetic markers, prior lab results, and even how they've metabolized similar drugs in the past, then flags which medication — and which dose — is statistically most likely to work for that person.

                    The clearest gains so far are in pharmacogenomics, the study of how genes affect drug response. Certain variants in the CYP2D6 gene, for instance, change how quickly a person breaks down common antidepressants and painkillers. A "slow metabolizer" can experience side effects at a dose that does nothing for a "fast metabolizer." Genetic screening panels that check for these variants are still expensive and not routine, but AI-assisted analysis is what makes them fast enough to be useful in an ordinary appointment rather than a multi-week research process.

                    Hospitals are also piloting models that scan a patient's chart for interaction risks a human reviewer might miss under time pressure — a new prescription that conflicts with something prescribed by a different specialist six months earlier, for example. These tools are decision support, not decision makers: every flag still goes to a licensed pharmacist or physician for a final call.

                    That distinction matters. The technology is genuinely useful for narrowing options and catching errors, but it works from historical data, and historical data reflects whoever was studied to produce it — which has historically skewed toward certain populations. Researchers are actively working to diversify the datasets these models train on, but it's a real limitation today, not a solved problem.

                    For patients, the practical takeaway is smaller than the headlines suggest: don't expect an AI to hand you a diagnosis. Do expect your pharmacist to increasingly have better tools for catching the kind of subtle interaction or dosing mismatch that used to slip through.
                    """,
                    Author = "Dr. Elena Petrova",
                    ReadTime = "8 Min Read",
                    ImageUrl = "/images/article-personalized-medicine.webp",
                    Section = "Trending Now",
                    Tag = "TRENDING NOW",
                    IsFeatured = true,
                    PublishedAt = DateTime.UtcNow.AddDays(-2)
                },
                new Article
                {
                    Title = "Why Vitamin D is the 'Silent Champion' of Bone Density.",
                    Excerpt = "Recent studies suggest that over 40% of adults lack sufficient Vitamin D levels during winter...",
                    Content = """
                    Calcium gets most of the credit for strong bones, but it can't do its job without vitamin D. The vitamin controls how much calcium your gut actually absorbs from food — without enough of it, you can eat a calcium-rich diet and still not build or maintain bone density effectively. That's why doctors describe vitamin D as calcium's quiet partner rather than a nutrient that does much on its own.

                    Most of the body's vitamin D isn't eaten — it's synthesized in the skin after sunlight exposure, which is exactly why levels dip so sharply in winter and at higher latitudes. Surveys in Northern and Central Europe regularly find that a large share of adults fall below the recommended range between November and March, even among people who feel perfectly healthy. Deficiency is often silent at first: fatigue and mild aches are easy to attribute to almost anything else.

                    Food sources exist but are limited — fatty fish, egg yolks, and fortified dairy or cereal are the main ones — which is why a supplement is often the more reliable option during the low-sunlight months, particularly for people who are older, have darker skin, or spend most daylight hours indoors. Typical maintenance doses for adults fall in the 600–800 IU/day range, though your doctor may recommend more if a blood test shows you're significantly deficient.

                    A blood test for 25-hydroxyvitamin D is the only accurate way to know where you actually stand — guessing from symptoms alone isn't reliable, and taking very high doses without medical guidance can cause problems of its own, since vitamin D is fat-soluble and builds up in the body over time.
                    """,
                    ImageUrl = "/images/article-vitamin-d.png",
                    Section = "Health Tip",
                    Tag = "HEALTH TIP",
                    IsFeatured = false,
                    PublishedAt = DateTime.UtcNow.AddDays(-1)
                },
                new Article
                {
                    Title = "“Prevention is the best cure.” — An Interview with Dr. Marcus Thorne",
                    Excerpt = "“Most lifestyle diseases can be mitigated with simple, consistent choices. Our goal at Zegin is to provide the data that empowers those choices.” In our exclusive monthly interview, we sit down with leading cardiologist Dr. Thorne to discuss the intersection of biotechnology and daily fitness routines.",
                    Content = """
                    Zegin Health Hub: You've spent twenty years in cardiology. What's changed the most about how you talk to patients about prevention?

                    Dr. Thorne: Honestly, the conversation used to start after something had already gone wrong — a first cardiac event, a bad set of labs. Now, with wearable data and better screening, we can often have the conversation ten or fifteen years earlier, while the changes needed are still small ones. That shift matters more than any single new drug.

                    ZHH: What does "small changes" actually mean in practice?

                    Dr. Thorne: Consistency beats intensity almost every time. A twenty-minute walk five days a week does more for long-term cardiovascular risk than an occasional intense workout squeezed in once a month. Same with diet — cutting back on processed sodium and added sugar gradually is far more sustainable, and just as effective, as a strict short-term diet that nobody keeps up.

                    ZHH: Where does technology genuinely help, versus just being a gadget?

                    Dr. Thorne: Continuous data is the real advantage. A single blood pressure reading in a clinic can be thrown off by "white coat syndrome" — people are anxious in a doctor's office. A week of home readings, or a good wearable, gives us a trend instead of one noisy data point. That's a much better basis for a decision.

                    ZHH: Any advice you find yourself repeating most often?

                    Dr. Thorne: Know your numbers — blood pressure, cholesterol, blood sugar — and don't wait for a symptom to check them. Most of the lifestyle diseases we manage announce themselves quietly, in lab values, long before they announce themselves loudly.
                    """,
                    Author = "Dr. Marcus Thorne",
                    ImageUrl = "/images/article-dr-thorne.webp",
                    Section = "Spotlight",
                    Tag = "HEALTHY LIVING SPOTLIGHT",
                    IsFeatured = true,
                    PublishedAt = DateTime.UtcNow.AddDays(-3)
                },
                new Article
                {
                    Title = "Superfoods or Marketing? The Science Behind the Label.",
                    Excerpt = "We analyze the biochemical composition of the decade's biggest food trends to see what actually helps your body.",
                    Content = """
                    "Superfood" isn't a scientific term — it's a marketing one. No regulatory body defines it, which means a label can slap it on almost anything with a favorable nutrient or two. That doesn't mean every superfood claim is nonsense, but it does mean the label itself tells you nothing about whether the evidence behind a specific food is strong, weak, or nearly nonexistent.

                    Take blueberries: they're genuinely high in anthocyanins, plant compounds with real antioxidant activity in lab studies. But "antioxidant activity in a test tube" and "measurable health benefit in a human eating a normal diet" are two different claims, and the gap between them is where a lot of marketing quietly lives. The honest summary is that blueberries are a nutrient-dense, low-calorie fruit worth eating — not that they're uniquely magical compared to other berries.

                    Chia seeds are a good source of fiber and plant-based omega-3s (specifically ALA, which the body converts to the more active forms less efficiently than the omega-3s found in fatty fish). Kale is nutrient-rich but nutritionally similar to other leafy greens that cost less and carry less hype. Goji berries have a loyal following but a comparatively thin evidence base for the specific claims often made about them.

                    None of this means these foods are bad choices — most "superfoods" are, at minimum, healthy foods. The actual research consistently points to a different conclusion than any single ingredient: dietary pattern matters far more than any one item on the plate. A varied diet built around vegetables, fruit, whole grains, and lean protein will outperform a diet built around a handful of trendy ingredients surrounded by less healthy choices, every time.
                    """,
                    ImageUrl = "/images/article-superfoods.png",
                    Section = "Health Hub Originals",
                    Tag = "NUTRITION",
                    ReadTime = "12 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-5)
                },
                new Article
                {
                    Title = "The Neurobiology of Mindfulness: Measuring Stress at the Synapse.",
                    Excerpt = "New imaging technology shows exactly how 10 minutes of meditation changes your brain's response to cortisol.",
                    Content = """
                    "Meditation reduces stress" used to be a claim you had to take on faith, or on the self-reported mood of the person meditating. Modern neuroimaging has made it possible to watch something closer to a mechanism: regular mindfulness practice is associated with measurable changes in activity in the amygdala, the brain region most closely tied to the body's fear and stress response.

                    In several controlled studies, participants who completed short daily mindfulness sessions over a period of weeks showed reduced amygdala reactivity when shown stressful images, compared to a control group. Some studies also found changes in functional connectivity between the amygdala and the prefrontal cortex — the region involved in regulating emotional responses — suggesting the brain was getting measurably better at reeling in a stress reaction once it started, not just suppressing it in the moment.

                    Cortisol, the body's primary stress hormone, follows a similar pattern in some — though not all — studies: lower baseline levels and a faster return to baseline after a stressful event in regular meditators. The effect sizes vary considerably between studies, and mindfulness is not a substitute for treatment of a diagnosed anxiety or mood disorder — it's a tool, not a cure, and the research is still an active area rather than settled science.

                    What does seem consistent across the research is that the practice itself doesn't need to be elaborate. Ten minutes of focused breathing, done consistently, shows up in the data more reliably than occasional long sessions. If you're looking to start, consistency is a better goal than duration.
                    """,
                    ImageUrl = "/images/article-mindfulness.png",
                    Section = "Health Hub Originals",
                    Tag = "MENTAL WELLBEING",
                    ReadTime = "6 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-6)
                },

                // Blog page — original posts, written for this demo (not sourced from any real site).
                new Article
                {
                    Title = "Magnesium and Sleep: The Mineral Your Nightly Routine Is Missing",
                    Excerpt = "Why this often-overlooked mineral plays a bigger role in muscle recovery and sleep quality than most people realize.",
                    Content = """
                    Magnesium is involved in more than 300 enzymatic reactions in the body, but it's best known to most people — if at all — as "the one that helps with muscle cramps." That reputation undersells it. Magnesium also plays a role in regulating the neurotransmitters that calm the nervous system, which is why low levels are often associated with poorer sleep quality and more frequent nighttime waking.

                    Deficiency is more common than most people assume, particularly among people with diets low in leafy greens, nuts, and whole grains, and among people with certain digestive conditions that reduce absorption. Mild deficiency often shows up as subtle symptoms — restlessness, muscle tension, or sleep that doesn't feel restorative even after a full night — rather than anything dramatic.

                    Food sources include spinach, almonds, pumpkin seeds, and black beans. For people who don't get enough through diet, magnesium glycinate is generally considered gentler on the stomach than magnesium oxide, which is cheaper but more likely to cause loose stools at higher doses.

                    As with most supplements, more isn't automatically better — very high doses can cause digestive upset, and people with kidney conditions should check with a doctor before supplementing, since the kidneys are responsible for clearing excess magnesium from the body.
                    """,
                    ImageUrl = "/images/article-magnesium-sleep.webp",
                    Section = "Blog Post",
                    Tag = "VITAMINS & MINERALS",
                    ReadTime = "5 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-1)
                },
                new Article
                {
                    Title = "Probiotics 101: How to Actually Choose the Right Strain",
                    Excerpt = "Not all probiotic supplements are created equal — a quick guide to matching the strain to the symptom.",
                    Content = """
                    "Probiotics" is a category, not a single product — and the strain matters much more than the total bacterial count printed largest on the label. A supplement with 50 billion CFU of a strain that isn't well-studied for your situation is likely to do less than a lower-count product with a strain backed by actual clinical trials for that specific use.

                    For antibiotic-associated digestive upset, Saccharomyces boulardii and certain Lactobacillus rhamnosus strains have the strongest evidence. For general digestive regularity, a multi-strain blend including Bifidobacterium species is more commonly studied. For travelers' diarrhea prevention, again, S. boulardii shows up frequently in the research.

                    Timing matters too: probiotics taken alongside or shortly after an antibiotic dose (rather than at the exact same time) tend to survive better, since some antibiotics will kill the supplement's bacteria right along with the infection it's targeting.

                    If you're taking a probiotic for a specific symptom and haven't seen any change after several weeks, that's a reasonable point to reassess with a pharmacist rather than continuing indefinitely — probiotics aren't one-size-fits-all, and "give it more time" isn't always the right answer.
                    """,
                    ImageUrl = "/images/article-probiotics.webp",
                    Section = "Blog Post",
                    Tag = "GUT HEALTH",
                    ReadTime = "6 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-2)
                },
                new Article
                {
                    Title = "Sunscreen Myths, Debunked by a Dermatologist",
                    Excerpt = "From \"my skin is too dark to burn\" to \"higher SPF means I can skip reapplying\" — separating fact from habit.",
                    Content = """
                    "My skin is too dark to burn" is one of the most persistent sunscreen myths, and one of the more consequential — darker skin does have more natural melanin protection, but it is not immune to UV damage, and skin cancers in people with darker skin tones are often diagnosed later, at a more advanced stage, partly because of this exact assumption.

                    "Higher SPF means I can reapply less often" is another common misunderstanding. SPF measures how much UVB radiation is blocked, not how long the protection lasts. SPF 30 blocks about 97% of UVB rays and SPF 50 blocks about 98% — a real but modest difference — and both need reapplication roughly every two hours regardless of the number on the bottle, more often after swimming or heavy sweating.

                    A third myth: "cloudy days don't need sunscreen." Up to 80% of UV rays pass through cloud cover, which is why cloudy-day sunburns are common and often catch people by surprise.

                    Finally: "spray sunscreen works as well as lotion, applied the same way." In practice, spray formulas are frequently under-applied because it's harder to see and feel where the product has landed. If you use spray sunscreen, rubbing it in by hand afterward helps ensure even coverage.
                    """,
                    ImageUrl = "/images/article-sunscreen-myths.webp",
                    Section = "Blog Post",
                    Tag = "SKIN CARE",
                    ReadTime = "4 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-3)
                },
                new Article
                {
                    Title = "Managing Seasonal Allergies Without Overmedicating",
                    Excerpt = "A practical, step-by-step approach — from air quality habits to knowing when an antihistamine is actually necessary.",
                    Content = """
                    The instinct when allergy season hits is to reach straight for medication, but a few free, low-effort habits can meaningfully reduce how much you need in the first place. Checking a local pollen forecast and keeping windows closed on high-count days, showering before bed to rinse pollen out of hair, and swapping air filters more often during peak season all reduce your actual allergen exposure rather than just treating the symptoms after the fact.

                    When medication is needed, non-drowsy second-generation antihistamines (like cetirizine or loratadine) are generally the reasonable first step for sneezing, itchy eyes, and a runny nose. They work best when taken consistently during allergy season rather than only reactively after symptoms have already started, since it takes time for them to build a steady effect.

                    For nasal congestion specifically, a saline rinse is a genuinely underrated first-line option with essentially no downside, and can reduce how much medication you need on top of it. Decongestant nasal sprays work faster but shouldn't be used for more than a few days in a row — beyond that, they can cause rebound congestion that's worse than the original problem.

                    If symptoms are severe, don't respond to standard antihistamines, or last well beyond the usual pollen season for your area, that's a reasonable point to talk to a doctor about further options rather than escalating the dose on your own.
                    """,
                    ImageUrl = "/images/article-seasonal-allergies.webp",
                    Section = "Blog Post",
                    Tag = "ALLERGIES",
                    ReadTime = "5 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-4)
                },
                new Article
                {
                    Title = "Building a Home Pharmacy Cabinet That's Actually Baby-Safe",
                    Excerpt = "What belongs in easy reach, what belongs locked away, and the OTC basics every new parent should stock.",
                    Content = """
                    The most important rule of a baby-safe medicine cabinet has nothing to do with what's in it: it's where it's kept. Anything you'd keep for yourself — pain relievers, vitamins, even things that seem harmless like iron supplements — needs to be stored well out of reach and, ideally, behind a child-proof latch, not just "up high," since toddlers are more capable climbers than most parents expect.

                    For the basics worth keeping on hand: an accurate digital thermometer, infant and children's formulations of acetaminophen or ibuprofen (dosed by weight, not age — check the label or ask your pharmacist), a hydrating oral rehydration solution for stomach bugs, and a basic first-aid kit with adhesive bandages and antiseptic wipes cover most common early-childhood scares.

                    Two things worth specifically avoiding: adult medications are not simply "smaller doses" of the same thing for children — never estimate a child's dose by scaling down an adult one. And honey should never be given to a child under twelve months old due to the risk of infant botulism, a rare but serious illness.

                    Finally, keep the number for your local poison control center saved somewhere you'll actually find it in a panic — a phone case, a kitchen magnet — rather than assuming you'll be able to search for it calmly in the moment.
                    """,
                    ImageUrl = "/images/article-baby-safe-cabinet.webp",
                    Section = "Blog Post",
                    Tag = "FAMILY CARE",
                    ReadTime = "7 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-6)
                },
                new Article
                {
                    Title = "Understanding Your Blood Pressure Numbers",
                    Excerpt = "What systolic and diastolic actually measure, and why one high reading isn't automatically a diagnosis.",
                    Content = """
                    A blood pressure reading like "120/80" describes two different moments in your heartbeat. The first, higher number — systolic — measures the pressure in your arteries when your heart contracts and pushes blood out. The second, lower number — diastolic — measures the pressure when your heart relaxes between beats. Both matter, and doctors look at the relationship between them, not just one number in isolation.

                    Current general guidelines consider a reading below 120/80 mmHg "normal," 120–129 systolic (with diastolic under 80) as "elevated," and 130/80 or above as the threshold where "high blood pressure" is typically discussed — though the exact thresholds and what they mean for you depend on your broader health picture, and a single reading is not a diagnosis.

                    That last point is worth repeating: a single high reading, especially one taken in a clinic, can easily be inflated by "white coat syndrome" — the anxiety of the appointment itself. Doctors increasingly rely on multiple readings over time, sometimes with a home monitor, to get an accurate average before making any decisions about treatment.

                    A few things that reliably skew a single reading: caffeine or exercise in the hour beforehand, a full bladder, crossed legs, or an incorrectly sized cuff. If you're tracking blood pressure at home, sitting quietly for five minutes beforehand and using a properly fitted cuff will give you numbers worth actually trusting.
                    """,
                    ImageUrl = "/images/article-blood-pressure.webp",
                    Section = "Blog Post",
                    Tag = "HEART HEALTH",
                    ReadTime = "5 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-7)
                },
                new Article
                {
                    Title = "The Gut-Skin Connection: Is Your Diet Behind Your Breakouts?",
                    Excerpt = "Emerging research on how gut inflammation shows up on your skin — and what changes actually help.",
                    Content = """
                    The idea that gut health and skin condition are connected isn't new — dermatologists have anecdotally noticed the link for decades — but the research explaining why has developed considerably in recent years, centered on a concept researchers call the gut-skin axis. Inflammation that starts in the digestive system appears able to influence inflammatory skin conditions, including acne and eczema, through shared immune signaling pathways.

                    High-glycemic diets — lots of refined sugar and processed carbohydrates — have some of the stronger evidence behind them, with several studies linking them to increased acne severity, likely through their effect on insulin and downstream inflammatory hormones. Dairy, particularly skim milk, shows a similar but less consistently replicated association in the research.

                    On the other side, diets higher in fiber, fermented foods, and omega-3 fatty acids are associated with more favorable gut microbiome diversity, which some researchers believe plays a role in lower systemic inflammation generally.

                    It's worth being cautious with the conclusion here: this is a genuinely emerging area of research, individual results vary considerably, and diet is one factor among several — including genetics, hormones, and skincare routine — not a guaranteed fix on its own. If breakouts are persistent or severe, a dermatologist can rule out other causes and suggest treatment alongside any dietary changes, rather than in place of them.
                    """,
                    ImageUrl = "/images/article-gut-skin.png",
                    Section = "Blog Post",
                    Tag = "SKIN CARE",
                    ReadTime = "6 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-8)
                },
                new Article
                {
                    Title = "Hydration Beyond Eight Glasses a Day",
                    Excerpt = "Why the old rule of thumb oversimplifies things, and how to actually gauge whether you're drinking enough.",
                    Content = """
                    "Drink eight glasses of water a day" is easy to remember, which is probably why it's stuck around — but it isn't based on individual need, and individual need varies enormously based on body size, activity level, climate, and even diet, since a large share of daily fluid intake normally comes from food, not drinking.

                    A more reliable everyday gauge is urine color: pale yellow generally indicates good hydration, while consistently dark yellow suggests you need more fluids. It's not a perfect measure — some vitamins and medications affect urine color regardless of hydration — but it's far more individualized than a flat glass count.

                    Activity level and climate both raise fluid needs significantly. Someone exercising heavily or spending time in hot weather can lose over a liter of fluid per hour through sweat, and water alone may not be enough — electrolyte replacement matters too, since sweat carries out sodium and other minerals along with water.

                    Certain conditions — some kidney or heart conditions among them — actually require fluid intake to be limited rather than increased, which is a good reminder that "more water" isn't a universal health tip. If you have a diagnosed condition that affects fluid balance, your doctor's specific guidance should take priority over any general rule of thumb.
                    """,
                    ImageUrl = "/images/article-hydration.webp",
                    Section = "Blog Post",
                    Tag = "WELLNESS",
                    ReadTime = "4 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-9)
                },
                new Article
                {
                    Title = "When Back Pain Needs a Doctor, Not Just Rest",
                    Excerpt = "Most back pain resolves on its own — here are the specific warning signs that mean it's time to get checked.",
                    Content = """
                    The overwhelming majority of acute back pain — the kind that comes from an awkward lift or a long day hunched at a desk — improves on its own within a few weeks with rest, gentle movement, and over-the-counter pain relief. That's the reassuring baseline. But a specific set of warning signs, sometimes called "red flags," mean it's worth seeing a doctor rather than waiting it out.

                    Numbness, tingling, or weakness in the legs — especially if it's new or getting worse — can indicate nerve involvement that benefits from earlier evaluation. Loss of bladder or bowel control alongside back pain is a genuine emergency and warrants immediate medical attention, not a wait-and-see approach, as it can signal a rare but serious condition affecting the nerves at the base of the spine.

                    Back pain that follows a significant fall or injury, particularly in someone with osteoporosis or who is on long-term steroid medication, should be checked for a possible fracture rather than assumed to be a normal strain. Pain that's worse at night or doesn't improve at all with rest — rather than easing when you lie down — is also a pattern worth flagging to a doctor rather than a typical mechanical strain pattern.

                    Finally, back pain accompanied by unexplained weight loss or fever deserves prompt evaluation, since together they can (rarely) point to something beyond a musculoskeletal cause. None of these signs are common, but knowing them is what separates "wait it out" from "get it checked" — and getting that distinction right matters more than trying to tough out pain that's actually a signal.
                    """,
                    ImageUrl = "/images/article-back-pain.png",
                    Section = "Blog Post",
                    Tag = "PAIN MANAGEMENT",
                    ReadTime = "5 Min Read",
                    PublishedAt = DateTime.UtcNow.AddDays(-10)
                },

                // Blog sidebar — recipe stubs, original.
                new Article
                {
                    Title = "Iron-Rich Lentil Soup for Busy Weeknights",
                    Excerpt = "Recipe",
                    Content = """
                    A one-pot soup built around red lentils, which cook quickly and are a solid plant-based iron source — pair with a source of vitamin C to help your body absorb the iron more effectively.

                    Ingredients: 1 cup red lentils, 1 chopped onion, 2 minced garlic cloves, 1 diced carrot, 1 tsp cumin, 1 tsp paprika, 4 cups vegetable broth, 1 cup chopped tomatoes, juice of half a lemon, olive oil, salt and pepper.

                    Method: Sauté the onion, garlic, and carrot in olive oil over medium heat for 5 minutes. Stir in the cumin and paprika and cook for 30 seconds until fragrant. Add the lentils, broth, and tomatoes, then simmer uncovered for 20–25 minutes until the lentils are soft. Finish with the lemon juice and season to taste. Serves 4, ready in about 35 minutes.
                    """,
                    ImageUrl = "/images/article-lentil-soup.webp",
                    Section = "Recipe",
                    PublishedAt = DateTime.UtcNow.AddDays(-2)
                },
                new Article
                {
                    Title = "No-Sugar Oat Energy Bites",
                    Excerpt = "Recipe",
                    Content = """
                    A no-bake snack sweetened only with dates — a good option for a quick source of fiber and slow-release energy between meals.

                    Ingredients: 1 cup rolled oats, 10 pitted dates, 2 tbsp almond butter, 2 tbsp chia seeds, 1 tsp vanilla extract, a pinch of cinnamon, 2 tbsp water if needed.

                    Method: Blend the dates in a food processor until they form a sticky paste. Add the oats, almond butter, chia seeds, vanilla, and cinnamon, and pulse until combined — add a little water if the mixture is too dry to hold together. Roll into small balls and refrigerate for at least 30 minutes. Makes about 12 bites; keeps refrigerated for up to a week.
                    """,
                    ImageUrl = "/images/article-oat-bites.webp",
                    Section = "Recipe",
                    PublishedAt = DateTime.UtcNow.AddDays(-4)
                },
                new Article
                {
                    Title = "Anti-Inflammatory Turmeric Smoothie",
                    Excerpt = "Recipe",
                    Content = """
                    A cold smoothie built around turmeric and black pepper — the piperine in black pepper significantly improves how well the body absorbs turmeric's active compound, curcumin.

                    Ingredients: 1 frozen banana, 1 cup unsweetened almond milk, 1 tsp ground turmeric, a pinch of black pepper, 1 tsp grated fresh ginger, 1 tbsp honey (optional), a handful of ice.

                    Method: Add all ingredients to a blender and blend until smooth, about 45 seconds. Taste and adjust honey or ginger to preference. Serves 1, ready in 5 minutes.
                    """,
                    ImageUrl = "/images/article-turmeric-smoothie.png",
                    Section = "Recipe",
                    PublishedAt = DateTime.UtcNow.AddDays(-7)
                },
                new Article
                {
                    Title = "High-Fiber Breakfast Bowl in 10 Minutes",
                    Excerpt = "Recipe",
                    Content = """
                    A make-ahead breakfast bowl combining oats and chia seeds for a fiber and protein combination that holds off mid-morning hunger better than a low-fiber breakfast.

                    Ingredients: 1/2 cup rolled oats, 1 tbsp chia seeds, 3/4 cup milk or plant milk, 1/2 cup plain yogurt, 1/2 cup mixed berries, 1 tbsp chopped walnuts, a drizzle of honey.

                    Method: Combine the oats, chia seeds, and milk in a jar or bowl and refrigerate overnight (or for at least 2 hours). In the morning, stir in the yogurt, top with berries and walnuts, and finish with a drizzle of honey. Serves 1, ready in 10 minutes if prepped the night before.
                    """,
                    ImageUrl = "/images/article-breakfast-bowl.webp",
                    Section = "Recipe",
                    PublishedAt = DateTime.UtcNow.AddDays(-12)
                }
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

        db.SaveChanges();
    }
}
