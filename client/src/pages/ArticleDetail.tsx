import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api/client'
import type { Article } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateArticle } from '../i18n/content'
import { ArrowRightIcon } from '../components/icons'

export function ArticleDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, language } = useLanguage()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    api
      .getArticleById(Number(id))
      .then(setArticle)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  const displayArticle = article ? translateArticle(article, language) : null

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800">
        <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
        {t.articleDetail.back}
      </Link>

      {loading && <p className="text-sm text-slate-400">{t.articleDetail.loading}</p>}

      {error && (
        <p className="text-sm text-red-600">
          {t.articleDetail.loadError} {error}
        </p>
      )}

      {!loading && !error && !displayArticle && <p className="text-sm text-slate-500">{t.articleDetail.notFound}</p>}

      {displayArticle && (
        <article>
          <div className="mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-slate-900">
            {displayArticle.imageUrl && (
              <img
                src={displayArticle.imageUrl}
                alt={displayArticle.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            )}
          </div>
          {displayArticle.tag && (
            <span className="mb-3 inline-block rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
              {displayArticle.tag}
            </span>
          )}
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{displayArticle.title}</h1>
          <p className="mt-2 text-xs text-slate-400">
            {[displayArticle.author, displayArticle.readTime].filter(Boolean).join(' · ')}
          </p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            {(displayArticle.content ?? displayArticle.excerpt)
              .split(/\n\s*\n/)
              .map((paragraph, i) => (
                <p key={i}>{paragraph.trim()}</p>
              ))}
          </div>
        </article>
      )}
    </div>
  )
}
