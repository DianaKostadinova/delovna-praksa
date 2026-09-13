import { useEffect, useState } from 'react'
import { api } from '../api/client'
import type { Article, HealthFact } from '../api/types'

const FACT_ICONS: Record<string, string> = {
  heart: '❤️',
  brain: '🧠',
  eye: '👁️',
  droplet: '💧',
}

export function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [facts, setFacts] = useState<HealthFact[]>([])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([api.getArticles(), api.getHealthFacts()])
      .then(([a, f]) => {
        setArticles(a)
        setFacts(f)
      })
      .catch((e) => setError(e.message))
  }, [])

  const trending = articles.find((a) => a.tag === 'TRENDING NOW')
  const healthTip = articles.find((a) => a.tag === 'HEALTH TIP')
  const spotlight = articles.find((a) => a.section === 'Spotlight')
  const originals = articles.filter((a) => a.section === 'Health Hub Originals')

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    // Demo only — no email is actually sent anywhere.
    setSubscribed(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-wide text-blue-700">ZEGIN HEALTH HUB</h1>
        <p className="mt-1 text-xs font-medium tracking-widest text-slate-400">
          MEDICAL INSIGHTS &amp; MODERN WELLNESS · ISSUE 04 · 2026
        </p>
      </div>

      {error && <p className="mb-6 text-sm text-red-600">Couldn't load content: {error}</p>}

      <div className="mb-10 grid gap-6 lg:grid-cols-3">
        {trending && (
          <div className="relative overflow-hidden rounded-xl bg-slate-800 text-white lg:col-span-2">
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-slate-700 to-slate-900" />
            <span className="absolute left-4 top-4 rounded bg-blue-600 px-2 py-1 text-xs font-semibold">
              TRENDING NOW
            </span>
            <div className="p-6">
              <h2 className="text-xl font-semibold leading-snug">{trending.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{trending.excerpt}</p>
            </div>
          </div>
        )}

        {healthTip && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-blue-700 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-200">Did You Know?</p>
              <p className="mt-2 text-sm font-medium">Drinking honey before bed can improve liver health and sleep quality.</p>
              <button className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20">→</button>
            </div>
            <div className="flex-1 rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Health Tip</p>
              <h3 className="mt-2 text-sm font-semibold text-slate-800">{healthTip.title}</h3>
              <p className="mt-2 text-xs text-slate-500 line-clamp-3">{healthTip.excerpt}</p>
              <button className="mt-3 text-xs font-semibold text-blue-700">Read More →</button>
            </div>
          </div>
        )}
      </div>

      {spotlight && (
        <div className="mb-10 grid gap-6 overflow-hidden rounded-xl border border-slate-200 bg-white p-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Healthy Living Spotlight</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{spotlight.title}</h2>
            <blockquote className="mt-4 border-l-4 border-blue-600 pl-4 text-sm italic text-slate-600">
              {spotlight.excerpt}
            </blockquote>
            <button className="mt-6 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
              Watch Full Interview
            </button>
          </div>
          <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-200 to-slate-300" />
        </div>
      )}

      <div className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Did You Know?</h3>
          <span className="text-xs font-medium text-blue-700">View Archive</span>
        </div>
        <p className="mb-4 text-xs text-slate-400">Daily doses of medical curiosity for your health.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <span className="text-xl">{FACT_ICONS[fact.icon] ?? '💡'}</span>
              <h4 className="mt-2 text-sm font-semibold text-slate-800">{fact.title}</h4>
              <p className="mt-1 text-xs text-slate-500">{fact.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="mb-4 border-l-4 border-blue-600 pl-3 text-sm font-semibold text-slate-800">
            Health Hub Originals
          </h3>
          <div className="space-y-4">
            {originals.map((article) => (
              <div key={article.id} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4">
                <div className="h-20 w-28 shrink-0 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300" />
                <div>
                  <p className="text-xs font-semibold uppercase text-blue-600">{article.tag}</p>
                  <h4 className="mt-1 text-sm font-semibold text-slate-800">{article.title}</h4>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{article.excerpt}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{article.readTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-slate-800">Newsletter</h4>
            <p className="mt-1 text-xs text-slate-500">
              Join 20k+ readers receiving weekly medical insights verified by pharmacists.
            </p>
            {subscribed ? (
              <p className="mt-3 text-xs font-medium text-green-700">Thanks — you're subscribed!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-3 space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
                <button className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                  Subscribe Now
                </button>
              </form>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-slate-800">Featured Products</h4>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Advanced Vitamin C Complex</span>
                <span className="font-semibold text-blue-700">$24.99</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Digital BP Monitor Pro</span>
                <span className="font-semibold text-blue-700">$89.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
