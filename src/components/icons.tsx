type IconProps = { className?: string }

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  )
}

export function IconDash({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 12h12" />
    </svg>
  )
}

export function IconArrow({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

/* Feishu's add-reaction affordance: a face with a small plus. Drawn
   rather than set as "☺+" — that dingbat resolves to a line glyph on
   some platforms and a full-colour emoji on others, and like any text
   glyph it sits on the baseline rather than centred in its box. */
export function IconReaction({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="10" cy="12.5" r="7.5" />
      <path d="M6.9 14.6a4.2 4.2 0 0 0 6.2 0" />
      <circle cx="7.6" cy="10.4" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12.4" cy="10.4" r="0.9" fill="currentColor" stroke="none" />
      <path d="M19.5 2.5v5M17 5h5" />
    </svg>
  )
}
