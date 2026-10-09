import { useEffect, useRef, useState } from 'react'

// Reading-progress indicator drawn as an ECG trace along the bottom edge of the site header.
// The trace "records" left to right as the page scrolls; a small dot marks the leading edge.
// DOM attributes are updated directly in rAF so scrolling never re-renders React.

const BEAT = 120 // px per heartbeat
const HEIGHT = 28
const MID = HEIGHT / 2 // baseline y; the svg is centred on the header's bottom border

function buildPath(width: number) {
  let d = `M0 ${MID}`
  for (let x = 0; x < width; x += BEAT) {
    d +=
      ` L${x + 40} ${MID}` +
      ` Q${x + 45} ${MID - 4} ${x + 50} ${MID}` + // P wave
      ` L${x + 57} ${MID} L${x + 59} ${MID + 3}` + // Q
      ` L${x + 63} ${MID - 12}` + // R
      ` L${x + 67} ${MID + 8} L${x + 70} ${MID}` + // S
      ` L${x + 78} ${MID}` +
      ` Q${x + 85} ${MID - 5} ${x + 92} ${MID}` + // T wave
      ` L${x + BEAT} ${MID}`
  }
  return d
}

export function ScrollPulse() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGGElement>(null)
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
      dot.setAttribute('transform', `translate(${point.x} ${point.y})`)
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
    <div ref={wrapRef} className="pointer-events-none absolute inset-x-0 bottom-0 h-7 translate-y-1/2" aria-hidden>
      {width > 0 && (
        <svg width={width} height={HEIGHT} viewBox={`0 0 ${width} ${HEIGHT}`} className="block overflow-visible">
          {/* Faint full trace: the track still to be "recorded". */}
          <path d={buildPath(width)} fill="none" stroke="#93c5fd" strokeOpacity="0.45" strokeWidth="1.5" strokeLinejoin="round" />
          <path
            ref={pathRef}
            d={buildPath(width)}
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="drop-shadow-[0_0_4px_rgba(37,99,235,0.6)]"
          />
          <g ref={dotRef} style={{ opacity: 0 }}>
            <circle r="4" fill="#2563eb" className="pulse-ring" />
            <circle r="4" fill="#1d4ed8" stroke="white" strokeWidth="2" />
          </g>
        </svg>
      )}
    </div>
  )
}
