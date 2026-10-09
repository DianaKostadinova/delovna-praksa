import { useRef, useState, type CSSProperties, type PointerEvent } from 'react'

// Stacked copies behind the photo, pushed back in Z and darkened, read as the product's side
// wall once the card tilts — a flat cut-out gets some thickness without a real 3D model.
const DEPTH_LAYERS = 6

// Product cut-out that tilts toward the mouse in 3D, with a light glare clipped to the
// product's own silhouette and a floor shadow that slides the other way. Mouse only:
// touch devices and reduced-motion users get the plain static image.
export function Product3D({
  src,
  alt,
  className = '',
  pad = '10%',
}: {
  src: string
  alt: string
  className?: string
  pad?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const [broken, setBroken] = useState(false)

  const track = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.dataset.active = ''
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--tx', (x * 2 - 1).toFixed(3))
      el.style.setProperty('--ty', (y * 2 - 1).toFixed(3))
    })
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    delete el.dataset.active
    el.style.removeProperty('--tx')
    el.style.removeProperty('--ty')
  }

  if (broken) return <div className={className} />

  const vars = { '--pad': pad, '--src': `url("${src}")` } as CSSProperties

  return (
    <div ref={ref} className={`p3d ${className}`} style={vars} onPointerMove={track} onPointerLeave={reset}>
      <div className="p3d-shadow" aria-hidden />
      <div className="p3d-twist">
        <div className="p3d-body">
          {Array.from({ length: DEPTH_LAYERS }, (_, i) => (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden
              className="p3d-layer p3d-depth"
              style={{ '--d': DEPTH_LAYERS - i } as CSSProperties}
            />
          ))}
          <img src={src} alt={alt} className="p3d-layer p3d-front" onError={() => setBroken(true)} />
          <div className="p3d-layer p3d-glare" aria-hidden />
        </div>
      </div>
    </div>
  )
}
