import { useState } from 'react'
import { api } from '../api/client'
import type { SymptomCheckResponse } from '../api/types'

export function AiChecker() {
  const [age, setAge] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [result, setResult] = useState<SymptomCheckResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!symptoms.trim()) return
    setLoading(true)
    setError(null)
    try {
      const response = await api.checkSymptoms({ age: age ? Number(age) : null, symptoms })
      setResult(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            AI-POWERED CARE
          </span>
          <h1 className="text-3xl font-bold text-slate-900">AI Symptom Checker</h1>
          <p className="mt-3 text-sm text-slate-500">
            Describe how you feel, and our checker will match your symptoms to common patterns for immediate health
            guidance and over-the-counter recommendations.
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-200 to-slate-300" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6">
          <label className="mb-1 block text-sm font-medium text-slate-700">Age</label>
          <input
            type="number"
            min={0}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g. 28"
            className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />

          <label className="mb-1 block text-sm font-medium text-slate-700">Describe your symptoms</label>
          <textarea
            required
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Tell us what's bothering you... (e.g. 'I have a scratchy throat and a slight headache since yesterday')"
            rows={5}
            className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />

          <p className="mb-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">
            ℹ️ Demo only — this uses a simple keyword-matching rules engine, not a real clinical AI. It is not
            medical advice.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-700 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? 'Analyzing…' : 'Get Recommendation →'}
          </button>
        </form>

        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6">
          {error && <p className="text-sm text-red-600">{error}</p>}

          {!result && !error && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl">
                🤖
              </span>
              <h3 className="text-sm font-semibold text-slate-700">Waiting for analysis</h3>
              <p className="mt-1 max-w-xs text-xs text-slate-400">
                Complete the form to receive a recommendation based on your symptoms.
              </p>
            </div>
          )}

          {result && (
            <div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  result.urgency === 'Low'
                    ? 'bg-green-100 text-green-700'
                    : result.urgency === 'Moderate'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                Urgency: {result.urgency}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-slate-800">{result.summary}</h3>

              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-600">•</span> {r}
                  </li>
                ))}
              </ul>

              {result.suggestedProducts.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">Suggested OTC Products</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {result.suggestedProducts.map((p) => (
                      <span key={p} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-4 text-[11px] text-slate-400">{result.disclaimer}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <FeatureCard icon="🛡" title="Clinically Backed" text="Rule-based guidance mapped to common OTC care patterns, for demonstration purposes." />
        <FeatureCard icon="🕓" title="Track Progress" text="Results shown here are session-only in this demo — nothing is saved to your account." />
        <FeatureCard icon="📍" title="Nearby Pickups" text="Suggested products link back to the Pharmacy Catalog with live stock status." />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <span className="text-lg">{icon}</span>
      <h4 className="mt-2 text-sm font-semibold text-slate-800">{title}</h4>
      <p className="mt-1 text-xs text-slate-500">{text}</p>
    </div>
  )
}
