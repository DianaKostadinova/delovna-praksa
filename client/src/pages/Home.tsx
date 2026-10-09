import { useEffect, useState, type ComponentType, type SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import type { Article, HealthFact } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateArticle, translateFact } from '../i18n/content'
import { ArrowRightIcon, HeartPulseIcon, BrainIcon, EyeIcon, DropletIcon, LightbulbIcon, UsersIcon } from '../components/icons'
import { Reveal } from '../components/Reveal'
import { PostCarousel } from '../components/PostCarousel'

const FACT_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  heart: HeartPulseIcon,
  brain: BrainIcon,
  eye: EyeIcon,
  droplet: DropletIcon,
}

export function Home() {
  const { t, language } = useLanguage()
  const [articles, setArticles] = useState<Article[]>([])
  const [facts, setFacts] = useState<HealthFact[]>([])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [factIndex, setFactIndex] = useState(0)

  useEffect(() => {
    Promise.all([api.getArticles(), api.getHealthFacts()])
      .then(([a, f]) => {
        setArticles(a)
        setFacts(f)
      })
      .catch((e) => setError(e.message))
  }, [])

  const translatedFacts = facts.map((f) => translateFact(f, language))

  const findTranslated = (predicate: (a: Article) => boolean) => {
    const found = articles.find(predicate)
    return found ? translateArticle(found, language) : undefined
  }

  const trending = findTranslated((a) => a.tag === 'TRENDING NOW')
  const healthTip = findTranslated((a) => a.tag === 'HEALTH TIP')
  const spotlight = findTranslated((a) => a.section === 'Spotlight')
  const originals = articles.filter((a) => a.section === 'Health Hub Originals').map((a) => translateArticle(a, language))
  const blogPosts = articles.filter((a) => a.section === 'Blog Post').map((a) => translateArticle(a, language))

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    // Demo only — no email is actually sent anywhere.
    setSubscribed(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-12 pt-6 text-center">
        <h1 className="text-6xl font-black tracking-[0.25em] text-blue-700 drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)] sm:text-7xl" aria-label={t.home.title}>
          {[...t.home.title].map((letter, i) => (
            <span key={i} aria-hidden className="rise-letter" style={{ animationDelay: `${i * 70}ms` }}>
              {letter}
            </span>
          ))}
        </h1>
        <div className="rule-grow mx-auto mt-4 h-1 w-24 bg-blue-700" />
        <p className="animate-rise mt-4 text-xs font-semibold tracking-widest text-slate-700 [animation-delay:500ms]">
          {t.home.subtitle}
        </p>
      </div>

      {error && (
        <p className="mb-6 text-sm text-red-600">
          {t.home.loadError} {error}
        </p>
      )}

      <div className="mb-10 grid gap-6 lg:grid-cols-3">
        {trending && (
          <Link
            to={`/articles/${trending.id}`}
            className="animate-rise group relative overflow-hidden rounded-xl bg-slate-800 text-white transition-shadow duration-300 [animation-delay:350ms] hover:shadow-[8px_8px_0_0_#1d4ed8] lg:col-span-2"
          >
            <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
              {trending.imageUrl && (
                <img
                  src={trending.imageUrl}
                  alt={trending.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}
            </div>
            <span className="absolute left-4 top-4 rounded bg-blue-600 px-2 py-1 text-xs font-semibold">
              {trending.tag}
            </span>
            <div className="p-6">
              <h2 className="text-xl font-semibold leading-snug group-hover:underline">{trending.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{trending.excerpt}</p>
            </div>
          </Link>
        )}

        <div className="flex flex-col gap-4">
          <div className="animate-rise rounded-xl bg-blue-700 p-5 text-white shadow-[6px_6px_0_0_#0f172a] [animation-delay:500ms]">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-200">{t.home.didYouKnowBadge}</p>
            <p className="mt-2 text-sm font-medium">
              {translatedFacts.length > 0 ? translatedFacts[factIndex % translatedFacts.length].detail : t.home.didYouKnowFact}
            </p>
            <button
              onClick={() => setFactIndex((i) => i + 1)}
              disabled={translatedFacts.length === 0}
              className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50"
              aria-label={t.home.viewArchive}
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
          {healthTip && (
            <Link to={`/articles/${healthTip.id}`} className="animate-rise flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white [animation-delay:650ms]">
              {healthTip.imageUrl && (
                <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src={healthTip.imageUrl}
                    alt={healthTip.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{t.home.healthTipBadge}</p>
                <h3 className="mt-2 text-sm font-semibold text-slate-800">{healthTip.title}</h3>
                <p className="mt-2 text-xs text-slate-500 line-clamp-3">{healthTip.excerpt}</p>
                <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-700">
                  {t.home.readMore}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>

      <Reveal>
        <PostCarousel
          posts={blogPosts}
          heading={t.home.carouselHeading}
          readMore={t.home.readMore}
          prevLabel={t.home.carouselPrev}
          nextLabel={t.home.carouselNext}
        />
      </Reveal>

      {spotlight && (
        <Reveal className="box-card mb-10 grid gap-6 overflow-hidden rounded-xl border border-slate-200 bg-white p-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{t.home.spotlightBadge}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{spotlight.title}</h2>
            <blockquote className="mt-4 border-l-4 border-blue-600 pl-4 text-sm italic text-slate-600">
              {spotlight.excerpt}
            </blockquote>
            <Link
              to={`/articles/${spotlight.id}`}
              className="mt-6 inline-block rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              {t.home.watchInterview}
            </Link>
          </div>
          <div className="aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-slate-200 to-slate-300">
            {spotlight.imageUrl && (
              <img
                src={spotlight.imageUrl}
                alt={spotlight.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            )}
          </div>
        </Reveal>
      )}

      <Reveal className="mb-10">
        <Link
          to="/team"
          className="flex flex-col items-center justify-between gap-4 rounded-xl bg-blue-600 p-6 text-white shadow-[6px_6px_0_0_#0f172a] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[10px_10px_0_0_#0f172a] sm:flex-row sm:text-left"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
              <UsersIcon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">{t.home.meetTeamTitle}</h3>
              <p className="mt-1 text-sm text-blue-100">{t.home.meetTeamCopy}</p>
            </div>
          </div>
          <span className="flex shrink-0 items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50">
            {t.home.meetTeamButton}
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
      </Reveal>

      <div className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">{t.home.didYouKnowHeading}</h3>
          <Link to="/blog" className="text-xs font-medium text-blue-700 hover:text-blue-800">
            {t.home.viewArchive}
          </Link>
        </div>
        <p className="mb-4 text-xs text-slate-400">{t.home.didYouKnowCaption}</p>
        {/* Expanding strip: on wide screens the hovered panel grows horizontally and the others
            narrow to make room. Stacks into plain cards on small screens. */}
        <Reveal className="flex flex-col gap-3 lg:h-60 lg:flex-row">
          {translatedFacts.map((fact, i) => {
            const FactIcon = FACT_ICONS[fact.icon] ?? LightbulbIcon
            return (
              <div
                key={fact.id}
                className="group relative flex min-w-0 flex-col overflow-hidden border border-slate-200 bg-white p-5 transition-[flex-grow,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-blue-700 hover:bg-blue-700 lg:flex-1 lg:hover:flex-[2.6]"
              >
                <span className="pointer-events-none absolute -right-2 -top-4 font-mono text-7xl font-black text-slate-100 transition-colors duration-500 group-hover:text-white/10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 transition-colors duration-500 group-hover:bg-white/15">
                  <FactIcon className="h-5 w-5 text-blue-700 transition-colors duration-500 group-hover:text-white" />
                </span>
                <h4 className="relative mt-auto pt-4 text-sm font-semibold text-slate-800 transition-colors duration-500 group-hover:text-lg group-hover:text-white">
                  {fact.title}
                </h4>
                <p className="relative mt-1 text-xs text-slate-500 transition-colors duration-500 group-hover:text-sm group-hover:text-blue-100 lg:line-clamp-3 lg:group-hover:line-clamp-none">
                  {fact.detail}
                </p>
              </div>
            )
          })}
        </Reveal>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="mb-4 border-l-4 border-blue-600 pl-3 text-sm font-semibold text-slate-800">
            {t.home.originalsHeading}
          </h3>
          <div className="space-y-4">
            {originals.map((article, i) => (
              <Reveal key={article.id} delay={i * 80}>
                <Link
                  to={`/articles/${article.id}`}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-200"
                >
                  <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-slate-200 to-slate-300">
                    {article.imageUrl && (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-blue-600">{article.tag}</p>
                    <h4 className="mt-1 text-sm font-semibold text-slate-800">{article.title}</h4>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">{article.excerpt}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{article.readTime}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={150} className="space-y-6">
          <div className="box-card rounded-xl border border-slate-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-slate-800">{t.home.newsletterTitle}</h4>
            <p className="mt-1 text-xs text-slate-500">{t.home.newsletterCopy}</p>
            {subscribed ? (
              <p className="mt-3 text-xs font-medium text-green-700">{t.home.subscribedMessage}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-3 space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.home.newsletterPlaceholder}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
                <button className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                  {t.home.subscribeButton}
                </button>
              </form>
            )}
          </div>

          <Link to="/pharmacy" className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-200">
            <h4 className="text-sm font-semibold text-slate-800">{t.home.featuredProductsTitle}</h4>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">
                  {language === 'mk' ? 'Напреден комплекс со витамин Ц' : 'Advanced Vitamin C Complex'}
                </span>
                <span className="font-semibold text-blue-700">$24.99</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">
                  {language === 'mk' ? 'Дигитален монитор за крвен притисок Про' : 'Digital BP Monitor Pro'}
                </span>
                <span className="font-semibold text-blue-700">$89.00</span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
