import { useEffect, useRef, useState } from 'react'

// Reading-progress indicator drawn as an ECG trace along the bottom edge of the site header.
// The trace "records" left to right as the page scrolls; a small dot marks the leading edge.
// DOM attributes are updated directly in rAF so scrolling never re-renders React.

const BEAT = 120 // px per heartbeat
const MID = 8 // baseline y inside the 16px-tall svg (sits on the header's border line)

function buildPath(width: number) {
  let d = `M0 ${MID}`
  for (let x = 0; x < width; x += BEAT) {
    d +=
      ` L${x + 40} ${MID}` +
      ` Q${x + 45} ${MID - 2.5} ${x + 50} ${MID}` + // P wave
      ` L${x + 58} ${MID} L${x + 60} ${MID + 1.5}` + // Q
      ` L${x + 63} ${MID - 7}` + // R
      ` L${x + 66} ${MID + 5} L${x + 68} ${MID}` + // S
      ` L${x + 78} ${MID}` +
      ` Q${x + 85} ${MID - 3.5} ${x + 92} ${MID}` + // T wave
      ` L${x + BEAT} ${MID}`
  }
  return d
}

export function ScrollPulse() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const path = pathRef.current
    const dot = dotRef.current
    if (!path || !dot || width === 0) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    let frame = 0

    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
      path.style.strokeDashoffset = `${length * (1 - progress)}`
      const point = path.getPointAtLength(length * progress)
      dot.setAttribute('cx', `${point.x}`)
      dot.setAttribute('cy', `${point.y}`)
      dot.style.opacity = progress > 0.002 ? '1' : '0'
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // Pages grow after their data loads, which changes progress without a scroll event.
    const observer = new ResizeObserver(onScroll)
    observer.observe(document.body)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      observer.disconnect()
    }
  }, [width])

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-x-0 bottom-0 h-4 translate-y-1/2" aria-hidden>
      {width > 0 && (
        <svg width={width} height="16" viewBox={`0 0 ${width} 16`} className="block overflow-visible">
          <path
            ref={pathRef}
            d={buildPath(width)}
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle ref={dotRef} r="2.5" fill="#1d4ed8" stroke="white" strokeWidth="1.5" style={{ opacity: 0 }} />
        </svg>
      )}
    </div>
  )
}
