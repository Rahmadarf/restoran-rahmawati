type IconProps = { className?: string }

const svgProps = { viewBox: '0 0 24 24', 'aria-hidden': true } as const

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  )
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M6 18 18 6M6 6h12v12" />
    </svg>
  )
}

export function MenuBarsIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="m6 6 12 12M6 18 18 6" />
    </svg>
  )
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="m3 10 9-7 9 7v10H3Z" />
      <path d="M9 20v-7h6v7" />
    </svg>
  )
}

export function CutleryIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M4 3v7c0 3 6 3 6 0V3M7 3v18M18 3c-4 5-4 10 0 10h2V3h-2Zm2 10v8" />
    </svg>
  )
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M7 3v4m10-4v4M3 11h18m-13 5h3" />
    </svg>
  )
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M4 7h16l1 14H3L4 7Zm4 0V6a4 4 0 0 1 8 0v1" />
    </svg>
  )
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M20.8 11.5a8.7 8.7 0 0 1-12.7 7.8L3 21l1.6-5A8.8 8.8 0 1 1 20.8 11.5Z" />
      <path d="M8 7c-1 3 3 7 6 8l2-2-3-2-1 1-2-2 1-1-2-3-1 1Z" />
    </svg>
  )
}

export function TableIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M3 5h18v7H3ZM6 12v9m12-9v9M3 8h18" />
    </svg>
  )
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <circle cx="10" cy="10" r="6" />
      <path d="m15 15 6 6" />
    </svg>
  )
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M20 3C8 1 1 7 6 16c10 5 16-2 14-13ZM4 21 16 8" />
    </svg>
  )
}

export function FamilyIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m2 4c3 1 3 4 3 7" />
    </svg>
  )
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M20 5c-3-3-7-1-8 2-1-3-5-5-8-2-5 5 8 15 8 15S25 10 20 5Z" />
    </svg>
  )
}
