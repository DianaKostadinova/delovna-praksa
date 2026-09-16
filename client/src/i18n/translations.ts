export type Language = 'en' | 'mk'

export interface TranslationDict {
  nav: {
    home: string
    pharmacy: string
    kbeauty: string
    aiChecker: string
    dashboard: string
    cart: string
    team: string
    blog: string
  }
  footer: {
    tagline: string
    resources: string
    healthEncyclopedia: string
    prescriptionGuide: string
    doctorConsultations: string
    insurancePartners: string
    contact: string
    rights: string
    contactFormNamePlaceholder: string
    contactFormEmailPlaceholder: string
    contactFormMessagePlaceholder: string
    contactFormSubmit: string
    contactFormSubmitting: string
    contactFormSuccess: string
    contactFormError: string
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
    headOfficeHeading: string
    branchesHeading: string
    contactEmail: string
    contactPhone: string
  }
  blog: {
    title: string
    subtitle: string
    loadError: string
    loading: string
    newsletterTitle: string
    newsletterCopy: string
    recipesTitle: string
    readMore: string
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
    prescriptionRequired: string
    prescriptionNote: string
  }
  stock: { InStock: string; LowStock: string; OutOfStock: string }
  categories: Record<
    | 'Allergies'
    | 'Pain Relief'
    | 'Antibiotics'
    | 'Skincare'
    | 'Supplements'
    | 'Respiratory'
    | 'Vitamins'
    | 'Topical Care'
    | 'Diagnostics'
    | 'Digestive'
    | 'K-Beauty',
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
    analyticsTitle: string
    analyticsCopy: string
    analyticsTotalViews: string
    analyticsUniqueVisitors: string
    analyticsByPage: string
    analyticsNoData: string
    analyticsViewsLabel: string
    analyticsVisitorsLabel: string
  }
  prescriptionStatus: { Active: string; Completed: string; Pending: string }
  languageToggle: { label: string }
  cartPage: {
    title: string
    subtitle: string
    emptyTitle: string
    emptyCopy: string
    continueShopping: string
    remove: string
    subtotal: string
    total: string
    itemsCount: (n: number) => string
    checkoutButton: string
    back: string
    detailsTitle: string
    firstName: string
    lastName: string
    address: string
    contact: string
    continueButton: string
    paymentTitle: string
    cash: string
    card: string
    cardNumber: string
    cardExpiry: string
    cardCvv: string
    confirmOrder: string
    successTitle: string
    successCopy: string
  }
  kbeauty: {
    badge: string
    title: string
    subtitle: string
    pick: string
  }
  cookies: {
    title: string
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
      kbeauty: 'K-Beauty',
      aiChecker: 'AI Checker',
      dashboard: 'Dashboard',
      cart: 'Cart',
      team: 'Team',
      blog: 'Blog',
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
      contactFormNamePlaceholder: 'Your name',
      contactFormEmailPlaceholder: 'Your email',
      contactFormMessagePlaceholder: 'Your message',
      contactFormSubmit: 'Send',
      contactFormSubmitting: 'Sending…',
      contactFormSuccess: 'Thanks — we’ll get back to you soon!',
      contactFormError: 'Something went wrong. Please try again.',
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
      headOfficeHeading: 'Head Office Support',
      branchesHeading: 'Branch Pharmacists — Skopje',
      contactEmail: 'Email',
      contactPhone: 'Phone',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Health tips, ingredient explainers, and family-care guides from the Zegin team.',
      loadError: "Couldn't load the blog:",
      loading: 'Loading posts…',
      newsletterTitle: 'Zegin Newsletter',
      newsletterCopy: "Don't miss a great offer!",
      recipesTitle: 'Recipes',
      readMore: 'Read More',
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
      prescriptionRequired: 'Prescription Required',
      prescriptionNote: 'A doctor’s prescription is required to purchase this medicine.',
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
      Digestive: 'Digestive',
      'K-Beauty': 'K-Beauty',
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
      analyticsTitle: 'Site Analytics',
      analyticsCopy: 'First-party, anonymous page-view tracking — recorded only for visitors who accepted the cookie banner.',
      analyticsTotalViews: 'Total Page Views',
      analyticsUniqueVisitors: 'Unique Visitors',
      analyticsByPage: 'Views by Page',
      analyticsNoData: 'No page views recorded yet — accept the cookie banner and browse the site to generate data.',
      analyticsViewsLabel: 'views',
      analyticsVisitorsLabel: 'visitors',
    },
    prescriptionStatus: {
      Active: 'Active',
      Completed: 'Completed',
      Pending: 'Pending',
    },
    languageToggle: {
      label: 'Јазик / Language',
    },
    cartPage: {
      title: 'Your Cart',
      subtitle: 'Review the items you’ve added before checking out.',
      emptyTitle: 'Your cart is empty',
      emptyCopy: 'Browse the pharmacy catalog and add some products to your cart.',
      continueShopping: 'Back to Catalog',
      remove: 'Remove',
      subtotal: 'Subtotal',
      total: 'Total',
      itemsCount: (n: number) => `${n} item${n === 1 ? '' : 's'}`,
      checkoutButton: 'Proceed to Checkout',
      back: 'Back',
      detailsTitle: 'Delivery Details',
      firstName: 'First Name',
      lastName: 'Last Name',
      address: 'Home Address',
      contact: 'Contact (phone or email)',
      continueButton: 'Continue',
      paymentTitle: 'Payment Method',
      cash: 'Cash on Delivery',
      card: 'Card',
      cardNumber: 'Card Number',
      cardExpiry: 'Expiry Date',
      cardCvv: 'CVV',
      confirmOrder: 'Done',
      successTitle: 'Your order has been approved',
      successCopy: 'Thank you — we’ve received your order and it’s on its way.',
    },
    kbeauty: {
      badge: '✨ K-Beauty',
      title: 'K-Beauty',
      subtitle: 'Korean skincare favorites, picked by Zegin — glass skin, gentle formulas, and glow.',
      pick: 'Editor’s Pick',
    },
    cookies: {
      title: 'Cookies & Privacy',
      message:
        "We use local storage for your language and demo cart, and — only if you accept — anonymous first-party analytics (page views, no accounts, no IP, nothing sold or shared with third parties).",
      acceptButton: 'Accept',
      declineButton: 'Decline',
    },
  },
  mk: {
    nav: {
      home: 'Почетна',
      pharmacy: 'Аптека',
      kbeauty: 'K-Beauty',
      aiChecker: 'АИ Проверка',
      dashboard: 'Контролна табла',
      cart: 'Кошница',
      team: 'Тимот',
      blog: 'Блог',
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
      contactFormNamePlaceholder: 'Вашето име',
      contactFormEmailPlaceholder: 'Вашата е-пошта',
      contactFormMessagePlaceholder: 'Вашата порака',
      contactFormSubmit: 'Прати',
      contactFormSubmitting: 'Се испраќа…',
      contactFormSuccess: 'Ви благодариме — ќе ви одговориме наскоро!',
      contactFormError: 'Настана грешка. Обидете се повторно.',
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
      headOfficeHeading: 'Поддршка во централна канцеларија',
      branchesHeading: 'Фармацевти по огранок — Скопје',
      contactEmail: 'Е-пошта',
      contactPhone: 'Телефон',
    },
    blog: {
      title: 'Блог',
      subtitle: 'Здравствени совети, објаснувања за состојки и водичи за семејна нега од тимот на Zegin.',
      loadError: 'Не успеа да се вчита блогот:',
      loading: 'Се вчитуваат објавите…',
      newsletterTitle: 'ZEGIN Билтен',
      newsletterCopy: 'Не пропуштај ниту една одлична понуда!',
      recipesTitle: 'Рецепти',
      readMore: 'Прочитај повеќе',
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
      prescriptionRequired: 'Потребен е лекарски упат',
      prescriptionNote: 'За купување на овој лек е потребен лекарски упат (рецепт).',
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
      Digestive: 'Пробава',
      'K-Beauty': 'K-Beauty',
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
      analyticsTitle: 'Аналитика на страницата',
      analyticsCopy: 'Анонимно следење на прегледи на страници од прва страна — снимено само за посетители кои ги прифатиле колачињата.',
      analyticsTotalViews: 'Вкупно прегледи',
      analyticsUniqueVisitors: 'Уникатни посетители',
      analyticsByPage: 'Прегледи по страница',
      analyticsNoData: 'Сè уште нема снимени прегледи — прифатете ги колачињата и разгледајте ја страницата за да се генерираат податоци.',
      analyticsViewsLabel: 'прегледи',
      analyticsVisitorsLabel: 'посетители',
    },
    prescriptionStatus: {
      Active: 'Активен',
      Completed: 'Завршен',
      Pending: 'Во исчекување',
    },
    languageToggle: {
      label: 'Јазик / Language',
    },
    cartPage: {
      title: 'Вашата кошница',
      subtitle: 'Прегледајте ги додадените производи пред да продолжите.',
      emptyTitle: 'Кошничката е празна',
      emptyCopy: 'Разгледајте го аптечниот каталог и додадете производи во кошничката.',
      continueShopping: 'Назад кон каталогот',
      remove: 'Отстрани',
      subtotal: 'Меѓузбир',
      total: 'Вкупно',
      itemsCount: (n: number) => `${n} производ${n === 1 ? '' : 'и'}`,
      checkoutButton: 'Продолжи за купување',
      back: 'Назад',
      detailsTitle: 'Податоци за достава',
      firstName: 'Име',
      lastName: 'Презиме',
      address: 'Адреса на живеење',
      contact: 'Контакт (телефон или е-пошта)',
      continueButton: 'Продолжи',
      paymentTitle: 'Начин на плаќање',
      cash: 'Кеш при достава',
      card: 'Картичка',
      cardNumber: 'Број на картичка',
      cardExpiry: 'Датум на важност',
      cardCvv: 'CVV',
      confirmOrder: 'Заврши',
      successTitle: 'Вашата пратка е одобрена',
      successCopy: 'Ви благодариме — нарачката е примена и е на пат.',
    },
    kbeauty: {
      badge: '✨ K-Beauty',
      title: 'K-Beauty',
      subtitle: 'Корејска нега на кожа, избрана од Zegin — стаклена кожа, нежни формули и сјај.',
      pick: 'Избор на уредникот',
    },
    cookies: {
      title: 'Колачиња и приватност',
      message:
        'Користиме локално складирање за вашиот јазик и демо-кошничката, и — само ако прифатите — анонимна аналитика од прва страна (прегледи на страници, без сметки, без IP, ништо не се продава ниту споделува со трети страни).',
      acceptButton: 'Прифати',
      declineButton: 'Одбиј',
    },
  },
}
