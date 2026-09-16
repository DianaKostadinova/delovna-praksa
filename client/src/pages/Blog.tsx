import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import type { Article } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateArticle } from '../i18n/content'
import { ArrowRightIcon } from '../components/icons'

const PAGE_SIZE = 6

export function Blog() {
  const { t, language } = useLanguage()
  const [posts, setPosts] = useState<Article[]>([])
  const [recipes, setRecipes] = useState<Article[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    Promise.all([api.getArticles('Blog Post'), api.getArticles('Recipe')])
      .then(([p, r]) => {
        setPosts(p)
        setRecipes(r)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const translatedPosts = posts.map((p) => translateArticle(p, language))
  const translatedRecipes = recipes.map((r) => translateArticle(r, language))

  const totalPages = Math.max(1, Math.ceil(translatedPosts.length / PAGE_SIZE))
  const pageItems = translatedPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">{t.blog.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{t.blog.subtitle}</p>
      </div>

      {error && (
        <p className="mb-6 text-sm text-red-600">
          {t.blog.loadError} {error}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {loading ? (
            <p className="text-sm text-slate-400">{t.blog.loading}</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {pageItems.map((post) => (
                <Link
                  key={post.id}
                  to={`/articles/${post.id}`}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-blue-200"
                >
                  <div className="aspect-[16/10] bg-gradient-to-br from-slate-200 to-slate-300" />
                  <div className="p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">{post.tag}</p>
                    <h3 className="mt-1 text-sm font-semibold text-slate-800">{post.title}</h3>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-[11px] text-slate-400">{post.readTime}</p>
                      <span className="flex items-center gap-1 text-xs font-semibold text-blue-700">
                        {t.blog.readMore}
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-md text-sm font-medium ${
                    p === page ? 'bg-blue-700 text-white' : 'border border-slate-300 text-slate-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-slate-800">{t.blog.newsletterTitle}</h4>
            <p className="mt-1 text-xs text-slate-500">{t.blog.newsletterCopy}</p>
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

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-slate-800">{t.blog.recipesTitle}</h4>
            <ul className="mt-3 space-y-3">
              {translatedRecipes.map((recipe) => (
                <li key={recipe.id} className="text-xs">
                  <p className="text-[10px] text-slate-400">
                    {new Date(recipe.publishedAt).toLocaleDateString(language === 'mk' ? 'mk-MK' : 'en-US')}
                  </p>
                  <Link to={`/articles/${recipe.id}`} className="font-medium text-slate-700 hover:text-blue-700">
                    {recipe.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
