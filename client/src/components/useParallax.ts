import { useEffect, useRef } from 'react'

// Writes the element's scroll position into a CSS variable, --p: 0 when the element's centre sits
// at the viewport's centre, negative once it has scrolled above it, positive while still below.
// Children read it in calc() to move at their own speed. Updating a CSS variable (not React state)
// keeps scrolling free of re-renders.
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = (rect.top + rect.height / 2 - vh / 2) / vh
      el.style.setProperty('--p', Math.max(-1.5, Math.min(1.5, p)).toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return ref
}
