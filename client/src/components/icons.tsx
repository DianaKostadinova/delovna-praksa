import type { SVGProps } from 'react'

// A small hand-rolled set of stroke icons (Feather/Lucide-style) so the app doesn't need an
// icon font or extra dependency. Every icon shares the same 24x24 viewBox and stroke styling —
// size and color are controlled entirely via `className` (e.g. "h-4 w-4 text-blue-700").
type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </Icon>
  )
}

export function UsersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M2.75 19c0-3.31 2.79-5.5 6.25-5.5s6.25 2.19 6.25 5.5" />
      <path d="M15.5 5.1c1.3.4 2.25 1.55 2.25 2.9 0 1.35-.95 2.5-2.25 2.9" />
      <path d="M17 13.6c2.55.5 4.25 2.25 4.25 5.4" />
    </Icon>
  )
}

export function HeartPulseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12.75 20.2 12 20.9l-.75-.7C6.9 16.6 3.5 13.5 3.5 9.75 3.5 6.9 5.7 4.75 8.5 4.75c1.6 0 3.05.8 3.5 2 .45-1.2 1.9-2 3.5-2 2.8 0 5 2.15 5 5 0 3.75-3.4 6.85-7.75 10.45Z" />
      <path d="M6 11h2.2l1.3-2.4 1.8 4.4 1.2-2h3.7" />
    </Icon>
  )
}

export function BrainIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 4.5a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0-1.7 4.3A2.75 2.75 0 0 0 6.5 16.5a2.5 2.5 0 0 0 2.5 2.5" />
      <path d="M15 4.5a2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1 1.7 4.3 2.75 2.75 0 0 1-1.7 5.2 2.5 2.5 0 0 1-2.5 2.5" />
      <path d="M9 4.5V19" />
      <path d="M15 4.5V19" />
    </Icon>
  )
}

export function EyeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.5 12S5.75 6 12 6s9.5 6 9.5 6-3.25 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.75" />
    </Icon>
  )
}

export function DropletIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5s6 6.4 6 10.6a6 6 0 0 1-12 0c0-4.2 6-10.6 6-10.6Z" />
    </Icon>
  )
}

export function LightbulbIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 18.5h6" />
      <path d="M10 21.5h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.45.9 1.15.9 1.9v.3h5.4v-.3c0-.75.3-1.45.9-1.9A6 6 0 0 0 12 3Z" />
    </Icon>
  )
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.25 5 5.75v5.4c0 4.55 3 7.9 7 9.6 4-1.7 7-5.05 7-9.6v-5.4L12 3.25Z" />
      <path d="M9 12.1l2.1 2.1 4-4.2" />
    </Icon>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Icon>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21.2s7-6.35 7-11.7a7 7 0 1 0-14 0c0 5.35 7 11.7 7 11.7Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Icon>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="10.75" cy="10.75" r="6.25" />
      <path d="M20 20l-4.85-4.85" />
    </Icon>
  )
}

export function ShoppingCartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.55L20.5 8.5H6.1" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </Icon>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </Icon>
  )
}

export function InfoIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <path d="M12 7.75h.01" />
    </Icon>
  )
}

export function SparklesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5l1.4 3.6 3.6 1.4-3.6 1.4L12 13.5l-1.4-3.6-3.6-1.4 3.6-1.4L12 3.5Z" />
      <path d="M18.5 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
    </Icon>
  )
}
