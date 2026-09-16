// Macedonian translations for the seeded demo content that comes from the API in English.
// Keyed by stable identifiers (id / patientCode / rxId) so the English record from the backend
// is simply overlaid with a Macedonian one when the language is 'mk', with an English fallback
// for anything not covered here.
import type { Language } from './translations'
import type { Article, HealthFact, Product, Patient, Prescription, SymptomCheckResponse } from '../api/types'

const articlesMk: Record<number, Partial<Pick<Article, 'title' | 'excerpt' | 'tag'>>> = {
  1: {
    title: 'Иднината на персонализираната медицина: Како вештачката интелигенција го обликува вашиот рецепт.',
    excerpt: 'Д-р Елена Петрова · 8 мин читање',
    tag: 'АКТУЕЛНО',
  },
  2: {
    title: "Зошто витаминот Д е „тивкиот шампион“ на густината на коските.",
    excerpt:
      'Неодамнешни студии сугерираат дека над 40% од возрасните имаат недоволно ниво на витамин Д во текот на зимата...',
    tag: 'ЗДРАВСТВЕН СОВЕТ',
  },
  3: {
    title: '„Превенцијата е најдобриот лек.“ — Интервју со д-р Маркус Торн',
    excerpt:
      '„Повеќето болести на начин на живот можат да се ублажат со едноставни, доследни избори. Нашата цел во Zegin е да ги обезбедиме податоците што ги поттикнуваат тие избори.“ Во нашето ексклузивно месечно интервју, разговаравме со водечкиот кардиолог д-р Торн за пресекот на биотехнологијата и секојдневните фитнес рутини.',
    tag: 'ЗДРАВ ЖИВОТ ВО ФОКУС',
  },
  4: {
    title: 'Суперхрана или маркетинг? Науката зад етикетата.',
    excerpt: 'Ја анализираме биохемиската состав на најголемите прехранбени трендови на децениата за да видиме што навистина му помага на телото.',
    tag: 'ИСХРАНА',
  },
  5: {
    title: 'Невробиологијата на внимателноста: Мерење на стресот на синапсата.',
    excerpt: 'Новата технологија за снимање покажува како 10 минути медитација го менуваат одговорот на мозокот кон кортизолот.',
    tag: 'МЕНТАЛНА ДОБРОСОСТОЈБА',
  },
}

const factsMk: Record<number, Pick<HealthFact, 'title' | 'detail'>> = {
  1: { title: 'Моќта на срцето', detail: 'Срцето создава доволно енергија секој ден за да „вози“ камион 20 милји.' },
  2: {
    title: 'Обработка на мозокот',
    detail: 'Информациите патуваат по нервите со брзина до 268 милји на час — побрзо од спорт-автомобил.',
  },
  3: { title: 'Фокус на очите', detail: 'Вашите очи можат да обработат околу 36.000 визуелни информации секој час.' },
  4: {
    title: 'Компонента вода',
    detail: 'Вашата крв е околу 90% вода, поради што хидратацијата е клучна за кардиоваскуларното здравје.',
  },
}

const productsMk: Record<number, Pick<Product, 'name' | 'description'>> = {
  1: { name: 'Zyrtec за ублажување алергии', description: '10мг таблети, 30 парчиња' },
  2: { name: 'Ventolin HFA инхалер', description: '108мкг, 200 дози' },
  3: { name: 'Centrum Silver за мажи', description: 'Мултивитамин, 100 таблети' },
  4: { name: 'Хидрокортизон 1%', description: 'Максимална јачина, крем 1oz' },
  5: { name: 'Напроксен натриум', description: '220мг гел капсули, 80 парчиња' },
  6: { name: 'Дигитален бесконтактен термометар', description: 'Инфрацрвен, медицинска точност' },
  7: { name: 'Dulcolax 5мг', description: 'Лаксативни таблети, 20 парчиња — за повремена констипација' },
  8: { name: 'Olynth HA 0,1%', description: 'Спреј за нос, 10мл — за брзо ослободување од затнат нос' },
  9: { name: 'Bisolvon сируп', description: '4мг/5мл, 100мл — експекторант против кашлица со секрет' },
  10: { name: 'Alergoforce спреј за нос', description: 'Антихистаминик, 15мл — за алергиска рина и киванje' },
  11: { name: 'Hepathrombin гел', description: '300 ИЕ, туба 40г — за модринки и заситени вени' },
  12: { name: 'Tyrosur прашок за рани', description: 'Тиротрицин 1мг/г — локален антибиотик за мали рани' },
  13: { name: 'Rinobact P', description: '0,5мг/мл + 0,5мг/мл капки за нос со антибиотик' },
  14: { name: 'Tabex', description: 'Цитизин 1,5мг, 100 таблети — терапија за престанок со пушење' },
  15: { name: 'Enterosgel', description: 'Адсорбентен гел, кесички 10 x 15г — при дијареа и детоксикација' },
  16: { name: 'Витамин Ц 500мг', description: 'Таблети, 100 парчиња' },
  17: { name: 'Цинк 15мг', description: 'Таблети, 60 парчиња (4 x 15 блистер)' },
  18: { name: 'Лизалки за грло', description: 'Лизалки против грлобол' },
  19: { name: 'Ice Power Cold спреј', description: 'Спреј за ладење и ублажување болка, 200мл' },
  20: { name: 'Bilobil Forte', description: 'Гинко Билоба 80мг капсули, 20 парчиња' },
  21: { name: 'Rinasek', description: 'Таблети против затнат нос и алергии, 10 x (60мг + 2,5мг)' },
  22: { name: 'Minotic капки за уши', description: 'Капки за уши со антибиотик и кортикостероид' },
  23: { name: 'Амоксицилин 500мг', description: 'Орален антибиотик, капсули, 16 парчиња' },
  24: { name: 'Азитромицин 500мг', description: 'Орален антибиотик, таблети, 3 парчиња' },
  25: { name: 'Avene пена за миење', description: 'Нежна пена за чувствителна кожа, 200мл' },
  26: { name: 'Mixa Ceramide Protect', description: 'Лосион за тело со керамиди, 400мл' },
  27: { name: 'Effaclar AZ гел крем', description: 'Гел крем против акни, 40мл' },
  28: { name: 'Toleriane Rosaliac SPF30', description: 'Крем против црвенило со SPF30, 50мл' },
  29: { name: 'Beauty of Joseon Dynasty Cream', description: 'Крем со женшен и полжавска мукозна суштина, 50мл' },
  30: { name: 'Beauty of Joseon Revive Serum', description: 'Серум со женшен и ретинал, 30мл' },
  31: { name: 'Anua Rice Enzyme Cleanser', description: 'Пудра за миење за светкав тен, 120г' },
  32: { name: 'Anua Azelaic Acid Serum', description: 'Серум со азелаинска киселина 10% и хијалурон, 30мл' },
  33: { name: 'Round Lab Dokdo Cleanser', description: '1025 Dokdo минерална пена за миење, 150мл' },
  34: { name: 'SKIN1004 Centella Ampoule', description: 'Ампула со центела азиатика 100%, 100мл' },
  35: { name: 'SOME BY MI AHA BHA PHA тонер', description: 'Тонер против несовршености, 150мл' },
  36: { name: 'Centellian24 360 Shot PDRN', description: 'Есенција за обнова на кожната бариера' },
  37: { name: 'VT Reedle Shot 300', description: 'Серум со микроигли текстура, 50мл' },
  38: { name: 'TIRTIR Mask Fit Red Cushion', description: 'Кушон пудра со сјај и SPF заштита' },
}

const patientsMk: Record<string, Pick<Patient, 'fullName' | 'bloodType' | 'allergies' | 'insuranceStatus'>> = {
  '992-BA-01': {
    fullName: 'Џејмс Т. Харисон',
    bloodType: 'О позитивна',
    allergies: 'Пеницилин',
    insuranceStatus: 'Активно осигурување',
  },
  '441-CQ-19': {
    fullName: 'Марија Гонзалез',
    bloodType: 'А негативна',
    allergies: 'Нема познати',
    insuranceStatus: 'Активно осигурување',
  },
}

const prescriptionsMk: Record<string, Pick<Prescription, 'medication' | 'dosageInfo' | 'dosage' | 'physician'>> = {
  'RX-448291': { medication: 'Лизиноприл', dosageInfo: 'АКЕ инхибитор', dosage: '10мг орална таблета', physician: 'Д-р Арис Торн' },
  'RX-129038': { medication: 'Амоксицилин', dosageInfo: 'Антибиотик', dosage: '500мг (14 дена)', physician: 'Д-р Сара Милер' },
  'RX-448212': { medication: 'Аторвастатин', dosageInfo: 'Статин', dosage: '20мг орална таблета', physician: 'Д-р Арис Торн' },
  'RX-771034': { medication: 'Ибупрофен', dosageInfo: 'НСАИЛ', dosage: '400мг (по потреба)', physician: 'Самопропишано' },
  'RX-902213': { medication: 'Метформин', dosageInfo: 'Антидијабетик', dosage: '500мг орална таблета', physician: 'Д-р Сара Милер' },
}

const productNameMkByEn: Record<string, string> = {
  'Zyrtec Allergy Relief': 'Zyrtec за ублажување алергии',
  'Ventolin HFA Inhaler': 'Ventolin HFA инхалер',
  'Centrum Silver Men': 'Centrum Silver за мажи',
  'Hydrocortisone 1%': 'Хидрокортизон 1%',
  'Naproxen Sodium': 'Напроксен натриум',
  'Digital No-Touch Thermometer': 'Дигитален бесконтактен термометар',
  'Dulcolax 5mg': 'Dulcolax 5мг',
  'Olynth HA 0.1%': 'Olynth HA 0,1%',
  'Bisolvon Syrup': 'Bisolvon сируп',
  'Alergoforce Nasal Spray': 'Alergoforce спреј за нос',
  'Hepathrombin Gel': 'Hepathrombin гел',
  'Tyrosur Wound Powder': 'Tyrosur прашок за рани',
  'Rinobact P': 'Rinobact P',
  Tabex: 'Tabex',
  Enterosgel: 'Enterosgel',
  'Vitamin C 500mg': 'Витамин Ц 500мг',
  'Zinc 15mg': 'Цинк 15мг',
  'Throat Lozenges': 'Лизалки за грло',
  'Ice Power Cold Spray': 'Ice Power Cold спреј',
  'Bilobil Forte': 'Bilobil Forte',
  Rinasek: 'Rinasek',
  'Minotic Ear Drops': 'Minotic капки за уши',
  'Amoxicillin 500mg': 'Амоксицилин 500мг',
  'Azithromycin 500mg': 'Азитромицин 500мг',
  'Avene Cleansing Foam': 'Avene пена за миење',
  'Mixa Ceramide Protect': 'Mixa Ceramide Protect',
  'Effaclar AZ Gel Cream': 'Effaclar AZ гел крем',
  'Toleriane Rosaliac SPF30': 'Toleriane Rosaliac SPF30',
}

// The symptom checker returns fixed, known English strings from the backend's rules engine —
// matched here by exact summary text so results display in Macedonian without touching the API.
const symptomCheckMk: Record<string, { summary: string; recommendations: string[]; disclaimer: string }> = {
  'Symptoms are consistent with a mild fever response.': {
    summary: 'Симптомите се во согласност со блага фебрилна реакција.',
    recommendations: [
      'Одморете се и внесувајте доволно течности.',
      'Проверувајте ја телесната температура на секои неколку часа.',
      'Посетете лекар доколку температурата надмине 39.5°C или трае повеќе од 3 дена.',
    ],
    disclaimer: 'Само демо — ова е механизам базиран на правила, не вистински клинички ВИ или медицински совет. Секогаш консултирајте лиценциран професионалец.',
  },
  'Symptoms suggest a common tension headache.': {
    summary: 'Симптомите укажуваат на честа тензиона главоболка.',
    recommendations: [
      'Одморете се во просторија со слаба светлина.',
      'Внесувајте течности и направете кратка пауза од екрани.',
      'Безрецептен лек против болка може да помогне кај повремени главоболки.',
    ],
    disclaimer: 'Само демо — ова е механизам базиран на правила, не вистински клинички ВИ или медицински совет. Секогаш консултирајте лиценциран професионалец.',
  },
  'Symptoms are consistent with a respiratory irritation.': {
    summary: 'Симптомите се во согласност со респираторна иритација.',
    recommendations: [
      'Избегнувајте познати иританти како чад или прашина.',
      'Користете инхалер за итни случаи доколку ви е препишан.',
      'Побарајте итна помош доколку дишењето стане отежнато.',
    ],
    disclaimer: 'Само демо — ова е механизам базиран на правила, не вистински клинички ВИ или медицински совет. Секогаш консултирајте лиценциран професионалец.',
  },
  'Symptoms are consistent with a seasonal allergy flare-up.': {
    summary: 'Симптомите се во согласност со сезонска алергиска реакција.',
    recommendations: [
      'Ограничете ја изложеноста на познати алергени.',
      'Антихистаминик може да ги ублажи повеќето симптоми во рок од еден час.',
      'Посетете лекар доколку симптомите траат подолго од две недели.',
    ],
    disclaimer: 'Само демо — ова е механизам базиран на правила, не вистински клинички ВИ или медицински совет. Секогаш консултирајте лиценциран професионалец.',
  },
  'Symptoms suggest mild skin irritation.': {
    summary: 'Симптомите укажуваат на блага кожна иритација.',
    recommendations: [
      'Избегнувајте чешање на засегнатото подрачје.',
      'Локален крем со хидрокортизон може да ја намали иритацијата.',
      'Посетете лекар доколку осипот се шири или прави мехури.',
    ],
    disclaimer: 'Само демо — ова е механизам базиран на правила, не вистински клинички ВИ или медицински совет. Секогаш консултирајте лиценциран професионалец.',
  },
  "We couldn't match your symptoms to a common pattern.": {
    summary: 'Не успеавме да ги поврземе вашите симптоми со честа шема.',
    recommendations: [
      'Опишете ги симптомите со повеќе детали (локација, траење, интензитет).',
      'Доколку симптомите се сериозни или се влошуваат, консултирајте фармацевт или лекар.',
    ],
    disclaimer: 'Само демо — ова е механизам базиран на правила, не вистински клинички ВИ или медицински совет. Секогаш консултирајте лиценциран професионалец.',
  },
}

export function translateArticle(article: Article, lang: Language): Article {
  if (lang === 'en') return article
  const mk = articlesMk[article.id]
  return mk ? { ...article, ...mk } : article
}

export function translateFact(fact: HealthFact, lang: Language): HealthFact {
  if (lang === 'en') return fact
  const mk = factsMk[fact.id]
  return mk ? { ...fact, ...mk } : fact
}

export function translateProduct(product: Product, lang: Language): Product {
  if (lang === 'en') return product
  const mk = productsMk[product.id]
  return mk ? { ...product, ...mk } : product
}

export function translatePrescription(rx: Prescription, lang: Language): Prescription {
  if (lang === 'en') return rx
  const mk = prescriptionsMk[rx.rxId]
  return mk ? { ...rx, ...mk } : rx
}

export function translatePatient(patient: Patient, lang: Language): Patient {
  if (lang === 'en') return patient
  const mk = patientsMk[patient.patientCode]
  return {
    ...patient,
    ...(mk ?? {}),
    prescriptions: patient.prescriptions.map((rx) => translatePrescription(rx, lang)),
  }
}

export function translateProductName(name: string, lang: Language): string {
  if (lang === 'en') return name
  return productNameMkByEn[name] ?? name
}

export function translateSymptomCheck(response: SymptomCheckResponse, lang: Language): SymptomCheckResponse {
  if (lang === 'en') return response
  const mk = symptomCheckMk[response.summary]
  return {
    ...response,
    summary: mk?.summary ?? response.summary,
    recommendations: mk?.recommendations ?? response.recommendations,
    disclaimer: mk?.disclaimer ?? response.disclaimer,
    suggestedProducts: response.suggestedProducts.map((p) => translateProductName(p, lang)),
  }
}
