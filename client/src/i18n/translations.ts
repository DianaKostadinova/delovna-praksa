export type Language = 'en' | 'mk'

export interface TranslationDict {
  nav: { home: string; pharmacy: string; aiChecker: string; dashboard: string; team: string }
  footer: {
    tagline: string
    resources: string
    healthEncyclopedia: string
    prescriptionGuide: string
    doctorConsultations: string
    insurancePartners: string
    contact: string
    rights: string
  }
  home: {
    title: string
    subtitle: string
    loadError: string
    didYouKnowBadge: string
    didYouKnowFact: string
    healthTipBadge: string
    readMore: string
    spotlightBadge: string
    watchInterview: string
    didYouKnowHeading: string
    viewArchive: string
    didYouKnowCaption: string
    originalsHeading: string
    newsletterTitle: string
    newsletterCopy: string
    newsletterPlaceholder: string
    subscribeButton: string
    subscribedMessage: string
    featuredProductsTitle: string
    meetTeamTitle: string
    meetTeamCopy: string
    meetTeamButton: string
  }
  team: {
    badge: string
    title: string
    subtitle: string
    loadError: string
    loading: string
    headOfficeHeading: string
    branchesHeading: string
    contactEmail: string
    contactPhone: string
  }
  pharmacy: {
    title: string
    subtitle: string
    filters: string
    recommended: string
    cart: string
    searchPlaceholder: string
    searchButton: string
    loadError: string
    loading: string
    pharmacistRecommended: string
    addToCart: string
    nearbyStores: (n: number) => string
    onlyOneLeft: string
    consultTitle: string
    consultCopy: string
    consultButton: string
  }
  stock: { InStock: string; LowStock: string; OutOfStock: string }
  categories: Record<
    'Allergies' | 'Pain Relief' | 'Antibiotics' | 'Skincare' | 'Supplements' | 'Respiratory' | 'Vitamins' | 'Topical Care' | 'Diagnostics',
    string
  >
  aiChecker: {
    badge: string
    title: string
    subtitle: string
    ageLabel: string
    agePlaceholder: string
    symptomsLabel: string
    symptomsPlaceholder: string
    disclaimerNote: string
    submitButton: string
    submitting: string
    waitingTitle: string
    waitingCopy: string
    urgencyLabel: string
    suggestedProducts: string
    featureClinicalTitle: string
    featureClinicalText: string
    featureTrackTitle: string
    featureTrackText: string
    featureNearbyTitle: string
    featureNearbyText: string
  }
  urgency: { Low: string; Moderate: string; 'See a doctor': string }
  dashboard: {
    badge: string
    title: string
    systemOnline: string
    verifyTitle: string
    verifyCopy: string
    rxPlaceholder: string
    verifyButton: string
    verifiedPrefix: string
    noMatch: string
    recentScans: string
    verifiedLabel: string
    lookupTitle: string
    lookupCopy: string
    lookupPlaceholder: string
    lookupButton: string
    lookingButton: string
    dob: string
    bloodType: string
    allergies: string
    tableDate: string
    tableMedication: string
    tableDosage: string
    tablePhysician: string
    tableStatus: string
    pending: string
    filledToday: string
  }
  prescriptionStatus: { Active: string; Completed: string; Pending: string }
  languageToggle: { label: string }
  cookies: {
    message: string
    acceptButton: string
    declineButton: string
  }
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    nav: {
      home: 'Home',
      pharmacy: 'Pharmacy',
      aiChecker: 'AI Checker',
      dashboard: 'Dashboard',
      team: 'Team',
    },
    footer: {
      tagline:
        'Redefining the modern pharmacy experience through clinical expertise, digital agility, and a commitment to preventive health education.',
      resources: 'Resources',
      healthEncyclopedia: 'Health Encyclopedia',
      prescriptionGuide: 'Prescription Guide',
      doctorConsultations: 'Doctor Consultations',
      insurancePartners: 'Insurance Partners',
      contact: 'Contact',
      rights: '© 2026 Zegin Pharmacy. All Rights Reserved. — demo project, not a real pharmacy.',
    },
    home: {
      title: 'ZEGIN HEALTH HUB',
      subtitle: 'MEDICAL INSIGHTS & MODERN WELLNESS · ISSUE 04 · 2026',
      loadError: "Couldn't load content:",
      didYouKnowBadge: 'Did You Know?',
      didYouKnowFact: 'Drinking honey before bed can improve liver health and sleep quality.',
      healthTipBadge: 'Health Tip',
      readMore: 'Read More',
      spotlightBadge: 'Healthy Living Spotlight',
      watchInterview: 'Watch Full Interview',
      didYouKnowHeading: 'Did You Know?',
      viewArchive: 'View Archive',
      didYouKnowCaption: 'Daily doses of medical curiosity for your health.',
      originalsHeading: 'Health Hub Originals',
      newsletterTitle: 'Newsletter',
      newsletterCopy: 'Join 20k+ readers receiving weekly medical insights verified by pharmacists.',
      newsletterPlaceholder: 'Your email address',
      subscribeButton: 'Subscribe Now',
      subscribedMessage: "Thanks — you're subscribed!",
      featuredProductsTitle: 'Featured Products',
      meetTeamTitle: 'Meet the Team',
      meetTeamCopy: "The pharmacists and support staff behind Zegin's Skopje branches.",
      meetTeamButton: 'Meet the Team',
    },
    team: {
      badge: 'OUR PEOPLE',
      title: 'Meet the Team',
      subtitle: "The pharmacists and head-office support team behind Zegin's branches across Skopje.",
      loadError: "Couldn't load the team:",
      loading: 'Loading team…',
      headOfficeHeading: 'Head Office Support',
      branchesHeading: 'Branch Pharmacists — Skopje',
      contactEmail: 'Email',
      contactPhone: 'Phone',
    },
    pharmacy: {
      title: 'Pharmacy Catalog',
      subtitle:
        'Find essential medications, professional healthcare products, and wellness supplements with real-time stock availability.',
      filters: 'Filters',
      recommended: 'Recommended',
      cart: 'Cart',
      searchPlaceholder: "Search medicine, brands, symptoms (e.g. Paracetamol, Ibuprofen...)",
      searchButton: 'Search Catalog',
      loadError: "Couldn't load products:",
      loading: 'Loading catalog…',
      pharmacistRecommended: 'Pharmacist Recommended',
      addToCart: 'Add to Cart',
      nearbyStores: (n: number) => `Available at ${n} nearby store${n > 1 ? 's' : ''}`,
      onlyOneLeft: 'Only 1 nearby store left',
      consultTitle: 'Consult with our Pharmacists Online',
      consultCopy:
        'Need advice on dosage or interactions? Our licensed pharmacists are available 24/7 for a secure video consultation.',
      consultButton: 'Start Consultancy',
    },
    stock: {
      InStock: 'In Stock',
      LowStock: 'Low Stock',
      OutOfStock: 'Out of Stock',
    },
    categories: {
      Allergies: 'Allergies',
      'Pain Relief': 'Pain Relief',
      Antibiotics: 'Antibiotics',
      Skincare: 'Skincare',
      Supplements: 'Supplements',
      Respiratory: 'Respiratory',
      Vitamins: 'Vitamins',
      'Topical Care': 'Topical Care',
      Diagnostics: 'Diagnostics',
    },
    aiChecker: {
      badge: 'AI-POWERED CARE',
      title: 'AI Symptom Checker',
      subtitle:
        'Describe how you feel, and our checker will match your symptoms to common patterns for immediate health guidance and over-the-counter recommendations.',
      ageLabel: 'Age',
      agePlaceholder: 'e.g. 28',
      symptomsLabel: 'Describe your symptoms',
      symptomsPlaceholder:
        "Tell us what's bothering you... (e.g. 'I have a scratchy throat and a slight headache since yesterday')",
      disclaimerNote:
        'Demo only — this uses a simple keyword-matching rules engine, not a real clinical AI. It is not medical advice.',
      submitButton: 'Get Recommendation',
      submitting: 'Analyzing…',
      waitingTitle: 'Waiting for analysis',
      waitingCopy: 'Complete the form to receive a recommendation based on your symptoms.',
      urgencyLabel: 'Urgency',
      suggestedProducts: 'Suggested OTC Products',
      featureClinicalTitle: 'Clinically Backed',
      featureClinicalText: 'Rule-based guidance mapped to common OTC care patterns, for demonstration purposes.',
      featureTrackTitle: 'Track Progress',
      featureTrackText: 'Results shown here are session-only in this demo — nothing is saved to your account.',
      featureNearbyTitle: 'Nearby Pickups',
      featureNearbyText: 'Suggested products link back to the Pharmacy Catalog with live stock status.',
    },
    urgency: {
      Low: 'Low',
      Moderate: 'Moderate',
      'See a doctor': 'See a doctor',
    },
    dashboard: {
      badge: 'Internal Administration',
      title: 'Pharmacist Portal',
      systemOnline: 'System Status: Online',
      verifyTitle: 'Prescription Verification',
      verifyCopy: 'Enter the unique identifier provided by the patient to verify a prescription.',
      rxPlaceholder: 'Enter RX ID (e.g. RX-448291)…',
      verifyButton: 'Verify Prescription',
      verifiedPrefix: 'Verified:',
      noMatch: 'No matching prescription found in demo data.',
      recentScans: 'Recent Scans',
      verifiedLabel: 'Verified',
      lookupTitle: 'Patient ID Lookup',
      lookupCopy: 'Look up a patient by their internal patient ID (demo data only — never a real SSN).',
      lookupPlaceholder: 'e.g. 992-BA-01',
      lookupButton: 'Retrieve Info',
      lookingButton: '…',
      dob: 'DOB',
      bloodType: 'Blood Type',
      allergies: 'Allergies',
      tableDate: 'Date',
      tableMedication: 'Medication',
      tableDosage: 'Dosage',
      tablePhysician: 'Physician',
      tableStatus: 'Status',
      pending: 'Pending',
      filledToday: 'Filled Today',
    },
    prescriptionStatus: {
      Active: 'Active',
      Completed: 'Completed',
      Pending: 'Pending',
    },
    languageToggle: {
      label: 'Јазик / Language',
    },
    cookies: {
      message:
        'We use cookies and local storage to remember your language preference and keep the demo cart working. This is a portfolio project — nothing is sold or shared with third parties.',
      acceptButton: 'Accept',
      declineButton: 'Decline',
    },
  },
  mk: {
    nav: {
      home: 'Почетна',
      pharmacy: 'Аптека',
      aiChecker: 'АИ Проверка',
      dashboard: 'Контролна табла',
      team: 'Тимот',
    },
    footer: {
      tagline:
        'Го редефинираме современото аптекарско искуство преку клиничка експертиза, дигитална агилност и посветеност на превентивно здравствено образование.',
      resources: 'Ресурси',
      healthEncyclopedia: 'Здравствена енциклопедија',
      prescriptionGuide: 'Водич за рецепти',
      doctorConsultations: 'Консултации со лекар',
      insurancePartners: 'Осигурителни партнери',
      contact: 'Контакт',
      rights: '© 2026 Zegin Pharmacy. Сите права се задржани. — демо проект, не е вистинска аптека.',
    },
    home: {
      title: 'ZEGIN ЗДРАВСТВЕН ХАБ',
      subtitle: 'МЕДИЦИНСКИ УВИДИ И МОДЕРНА БЛАГОСОСТОЈБА · БРОЈ 04 · 2026',
      loadError: 'Не успеа да се вчита содржината:',
      didYouKnowBadge: 'Дали знаете?',
      didYouKnowFact: 'Пиењето мед пред спиење може да го подобри здравјето на црниот дроб и квалитетот на сонот.',
      healthTipBadge: 'Здравствен совет',
      readMore: 'Прочитај повеќе',
      spotlightBadge: 'Здрав живот во фокус',
      watchInterview: 'Гледај го целото интервју',
      didYouKnowHeading: 'Дали знаете?',
      viewArchive: 'Види архива',
      didYouKnowCaption: 'Дневна доза на медицинска љубопитност за вашето здравје.',
      originalsHeading: 'Оригинали од Health Hub',
      newsletterTitle: 'Билтен',
      newsletterCopy: 'Придружете се на 20 000+ читатели кои добиваат неделни медицински увиди потврдени од фармацевти.',
      newsletterPlaceholder: 'Вашата е-пошта',
      subscribeButton: 'Претплати се',
      subscribedMessage: 'Благодариме — успешно се претплативте!',
      featuredProductsTitle: 'Издвоени производи',
      meetTeamTitle: 'Запознајте го тимот',
      meetTeamCopy: 'Фармацевтите и тимот за поддршка зад скопските огранци на Zegin.',
      meetTeamButton: 'Запознајте го тимот',
    },
    team: {
      badge: 'НАШИТЕ ЛУЃЕ',
      title: 'Запознајте го тимот',
      subtitle: 'Фармацевтите и тимот за поддршка во централната канцеларија зад огранците на Zegin низ Скопје.',
      loadError: 'Не успеа да се вчита тимот:',
      loading: 'Се вчитува тимот…',
      headOfficeHeading: 'Поддршка во централна канцеларија',
      branchesHeading: 'Фармацевти по огранок — Скопје',
      contactEmail: 'Е-пошта',
      contactPhone: 'Телефон',
    },
    pharmacy: {
      title: 'Аптечен каталог',
      subtitle:
        'Пронајдете основни лекови, професионални здравствени производи и додатоци за здравје со достапност во реално време.',
      filters: 'Филтри',
      recommended: 'Препорачано',
      cart: 'Кошничка',
      searchPlaceholder: 'Пребарувајте лекови, брендови, симптоми (пр. Парацетамол, Ибупрофен...)',
      searchButton: 'Пребарај каталог',
      loadError: 'Не успеа да се вчитаат производите:',
      loading: 'Се вчитува каталогот…',
      pharmacistRecommended: 'Препорачано од фармацевт',
      addToCart: 'Додади во кошничка',
      nearbyStores: (n: number) => `Достапно во ${n} блиски продавниц${n === 1 ? 'а' : 'и'}`,
      onlyOneLeft: 'Само 1 блиска продавница останата',
      consultTitle: 'Консултирајте се со наши фармацевти онлајн',
      consultCopy:
        'Ви треба совет за дозирање или интеракции? Нашите лиценцирани фармацевти се достапни 24/7 за сигурна видео консултација.',
      consultButton: 'Започни консултација',
    },
    stock: {
      InStock: 'Достапно',
      LowStock: 'Ограничени количини',
      OutOfStock: 'Нема на залиха',
    },
    categories: {
      Allergies: 'Алергии',
      'Pain Relief': 'Ублажување на болка',
      Antibiotics: 'Антибиотици',
      Skincare: 'Нега на кожа',
      Supplements: 'Додатоци',
      Respiratory: 'Респираторно',
      Vitamins: 'Витамини',
      'Topical Care': 'Локална нега',
      Diagnostics: 'Дијагностика',
    },
    aiChecker: {
      badge: 'ГРИЖА ПОДДРЖАНА СО АИ',
      title: 'АИ Проверка на симптоми',
      subtitle:
        'Опишете како се чувствувате, а нашата алатка ќе ги спореди вашите симптоми со чести шеми за итни здравствени насоки и препораки за безрецептни производи.',
      ageLabel: 'Возраст',
      agePlaceholder: 'на пр. 28',
      symptomsLabel: 'Опишете ги вашите симптоми',
      symptomsPlaceholder:
        "Кажете ни што ве мачи... (на пр. 'Имам грлобол и лесна главоболка од вчера')",
      disclaimerNote:
        'Само демо — ова користи едноставен механизам за совпаѓање клучни зборови, не вистинска клиничка вештачка интелигенција. Не претставува медицински совет.',
      submitButton: 'Добиј препорака',
      submitting: 'Се анализира…',
      waitingTitle: 'Се чека анализа',
      waitingCopy: 'Пополнете ја формата за да добиете препорака врз основа на вашите симптоми.',
      urgencyLabel: 'Итност',
      suggestedProducts: 'Препорачани безрецептни производи',
      featureClinicalTitle: 'Клинички поддржано',
      featureClinicalText: 'Насоки базирани на правила поврзани со чести шеми на нега, за демонстративни цели.',
      featureTrackTitle: 'Следење на напредок',
      featureTrackText: 'Резултатите прикажани тука важат само за оваа сесија во демото — ништо не се зачувува на вашата сметка.',
      featureNearbyTitle: 'Подигање во близина',
      featureNearbyText: 'Препорачаните производи водат назад кон Аптечниот каталог со статус на залиха во реално време.',
    },
    urgency: {
      Low: 'Ниска',
      Moderate: 'Умерена',
      'See a doctor': 'Посетете лекар',
    },
    dashboard: {
      badge: 'Внатрешна администрација',
      title: 'Портал за фармацевти',
      systemOnline: 'Статус на системот: Онлајн',
      verifyTitle: 'Верификација на рецепт',
      verifyCopy: 'Внесете го уникатниот идентификатор доставен од пациентот за да верификувате рецепт.',
      rxPlaceholder: 'Внесете RX ID (на пр. RX-448291)…',
      verifyButton: 'Верификувај рецепт',
      verifiedPrefix: 'Верификувано:',
      noMatch: 'Нема пронајдено соодветен рецепт во демо податоците.',
      recentScans: 'Неодамнешни скенирања',
      verifiedLabel: 'Верификувано',
      lookupTitle: 'Пребарување по ID на пациент',
      lookupCopy: 'Пребарајте пациент по нивниот интерен ID (само демо податоци — никогаш вистински ЕМБГ).',
      lookupPlaceholder: 'на пр. 992-BA-01',
      lookupButton: 'Преземи податоци',
      lookingButton: '…',
      dob: 'Дата на раѓање',
      bloodType: 'Крвна група',
      allergies: 'Алергии',
      tableDate: 'Датум',
      tableMedication: 'Лек',
      tableDosage: 'Дозирање',
      tablePhysician: 'Лекар',
      tableStatus: 'Статус',
      pending: 'Во исчекување',
      filledToday: 'Издадени денес',
    },
    prescriptionStatus: {
      Active: 'Активен',
      Completed: 'Завршен',
      Pending: 'Во исчекување',
    },
    languageToggle: {
      label: 'Јазик / Language',
    },
    cookies: {
      message:
        'Користиме колачиња и локално складирање за да го запомниме вашиот јазик и да ја одржиме демо-кошничката функционална. Ова е портфолио проект — ништо не се продава ниту споделува со трети страни.',
      acceptButton: 'Прифати',
      declineButton: 'Одбиј',
    },
  },
}
