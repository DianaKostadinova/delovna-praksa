import { Link } from 'react-router-dom'
import { useParallax } from './useParallax'
import { Reveal } from './Reveal'
import { ArrowRightIcon } from './icons'

const TONES = {
  blue: {
    overlay: 'from-slate-950/90 via-blue-950/70 to-blue-900/20',
    eyebrow: 'text-blue-300',
    button: 'text-blue-800 shadow-[4px_4px_0_0_#1d4ed8] hover:shadow-[6px_6px_0_0_#1d4ed8]',
  },
  pink: {
    overlay: 'from-pink-950/85 via-pink-800/65 to-pink-600/10',
    eyebrow: 'text-pink-200',
    button: 'text-pink-700 shadow-[4px_4px_0_0_#db2777] hover:shadow-[6px_6px_0_0_#db2777]',
  },
}

// Full-width photo band. The photo is taller than the band and slides against the scroll, so it
// reads as a window onto a picture fixed behind the page.
export function ParallaxBand({
  image,
  eyebrow,
  title,
  copy,
  cta,
  tone = 'blue',
  as: Heading = 'h2',
  className = '',
}: {
  image: string
  eyebrow?: string
  title: string
  copy?: string
  cta?: { to: string; label: string }
  tone?: keyof typeof TONES
  as?: 'h1' | 'h2'
  className?: string
}) {
  const ref = useParallax<HTMLElement>()
  const styles = TONES[tone]

  return (
    <section ref={ref} className={`relative overflow-hidden bg-slate-900 text-white ${className}`}>
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-x-0 -top-[60%] h-[220%] w-full object-cover"
        style={{ translate: '0 calc(var(--p, 0) * -260px)' }}
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${styles.overlay}`} />
      <Reveal className="relative mx-auto flex min-h-[340px] max-w-6xl flex-col justify-center px-6 py-16 sm:min-h-[380px]">
        {eyebrow && <p className={`text-xs font-bold uppercase tracking-[0.3em] ${styles.eyebrow}`}>{eyebrow}</p>}
        <Heading className="mt-3 max-w-xl text-3xl font-black leading-tight sm:text-4xl">{title}</Heading>
        {copy && <p className="mt-4 max-w-lg text-sm text-slate-200 sm:text-base">{copy}</p>}
        {cta && (
          <Link
            to={cta.to}
            className={`mt-7 flex w-fit items-center gap-2 bg-white px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 ${styles.button}`}
          >
            {cta.label}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        )}
      </Reveal>
    </section>
  )
}
