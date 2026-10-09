import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Article } from '../api/types'
import { ArrowRightIcon } from './icons'

const AUTO_ADVANCE_MS = 5000

// A full-width, one-post-at-a-time slider. Auto-advances (paused while hovered or focused),
// with square prev/next buttons, a slide counter, and a progress bar that fills toward the
// next slide. Plain CSS transforms — no carousel library.
export function PostCarousel({
  posts,
  heading,
  readMore,
  prevLabel,
  nextLabel,
}: {
  posts: Article[]
  heading: string
  readMore: string
  prevLabel: string
  nextLabel: string
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = posts.length

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count])

  useEffect(() => {
    if (paused || count < 2) return
    const id = setTimeout(() => go(1), AUTO_ADVANCE_MS)
    return () => clearTimeout(id)
  }, [index, paused, count, go])

  if (count === 0) return null

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <section
      className="mb-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={heading}
    >
      <div className="mb-4 flex items-end justify-between">
        <h3 className="border-l-4 border-blue-600 pl-3 text-sm font-semibold text-slate-800">{heading}</h3>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-slate-500">
            {pad(index + 1)} / {pad(count)}
          </span>
          <button
            onClick={() => go(-1)}
            aria-label={prevLabel}
            className="flex h-9 w-9 items-center justify-center border border-slate-300 bg-white text-slate-700 transition-colors hover:border-blue-700 hover:bg-blue-700 hover:text-white"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label={nextLabel}
            className="flex h-9 w-9 items-center justify-center border border-slate-300 bg-white text-slate-700 transition-colors hover:border-blue-700 hover:bg-blue-700 hover:text-white"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden bg-slate-900 shadow-[8px_8px_0_0_#1d4ed8]">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {posts.map((post, i) => (
            <Link
              key={post.id}
              to={`/articles/${post.id}`}
              aria-hidden={i !== index}
              tabIndex={i === index ? 0 : -1}
              className="group relative block aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-[21/8]"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
              <div className="relative flex h-full max-w-xl flex-col justify-end p-6 text-white sm:p-10">
                {post.tag && (
                  <span className="mb-3 w-fit bg-blue-600 px-2 py-1 text-[11px] font-bold tracking-wider">{post.tag}</span>
                )}
                <h4 className="text-xl font-bold leading-tight sm:text-3xl">{post.title}</h4>
                <p className="mt-2 hidden text-sm text-slate-300 line-clamp-2 sm:block">{post.excerpt}</p>
                <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-300 transition-all group-hover:gap-3 group-hover:text-white">
                  {readMore}
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Progress toward the next slide; restarts on every slide change via the key. */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/15">
          <div
            key={`${index}-${paused}`}
            className="h-full origin-left bg-blue-500"
            style={{
              animation: paused || count < 2 ? 'none' : `rule-grow ${AUTO_ADVANCE_MS}ms linear both`,
              transform: paused ? 'scaleX(0)' : undefined,
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {posts.map((post, i) => (
          <button
            key={post.id}
            onClick={() => setIndex(i)}
            aria-label={`${i + 1} / ${count}`}
            aria-current={i === index}
            className={`h-1.5 transition-all duration-300 ${i === index ? 'w-8 bg-blue-700' : 'w-3 bg-slate-300 hover:bg-slate-400'}`}
          />
        ))}
      </div>
    </section>
  )
}
