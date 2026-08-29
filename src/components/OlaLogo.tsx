/**
 * Ola marks, from OLA_Logo.svg.
 *
 * Two things about the source file are deliberately not carried over:
 *
 * 1. It stacks two identical copies of the artwork — a cream one
 *    (#efece4 / #fff) underneath, an untinted one on top. The top copy
 *    hides the other completely, so it is an export artifact rather than
 *    a design. One copy is kept, painting with `currentColor` so these
 *    components serve the cream nav, the black footer, the blue bot
 *    avatar and dark mode without a second asset or a hardcoded colour.
 *
 * 2. The O is a ring, not a disc — but its outer and inner circles wind
 *    the same direction, so it needs `evenodd` to punch the hole through.
 *    The source declares that rule only on the hidden cream copy; the
 *    copy that actually renders would fill solid. Restored here, and it
 *    matters for the A's counter too.
 */

/** The O, on its own square. For sizes where the 2.76:1 lockup is too
 *  small to read — favicons, avatars, tight badges. */
const RING =
  'M47.35,0C21.2,0,0,21.2,0,47.35s21.2,47.35,47.35,47.35,47.35-21.2,47.35-47.35S73.5,0,47.35,0ZM47.35,80.13c-18.1,0-32.78-14.68-32.78-32.78S29.24,14.57,47.35,14.57s32.78,14.68,32.78,32.78-14.68,32.78-32.78,32.78Z'

type MarkProps = { className?: string; style?: React.CSSProperties }

/** The A mark from OLA_Favicon.svg, for compact identity surfaces such as
 *  chat avatars.
 *
 *  Drawn rather than served as /ola-favicon.svg, which is a fixed cream
 *  disc (#eaede4) under a near-black mark: on a white card the disc barely
 *  separates from it, and on a dark one it is a bright chip. Here the two
 *  values are mixed from the theme the way the mock's person avatars are —
 *  a 22% tint of the accent for the disc, the accent pulled 62% toward the
 *  ink for the mark — so it sits at the same weight as the faces beside it
 *  in both themes. The favicon file itself is untouched; a browser tab has
 *  no theme to follow. */
export function OlaAvatar({ className, style }: MarkProps) {
  return (
    <svg
      viewBox="0 0 319.96 319.96"
      className={className}
      style={style}
      fillRule="evenodd"
      aria-hidden
    >
      <circle
        cx="159.98"
        cy="159.98"
        r="159.98"
        fill="color-mix(in srgb, var(--color-signal) 22%, var(--color-paper))"
      />
      <path
        d="M173.54,63.49l76.97,133.31c8.95,15.51,4.48,23.26-13.43,23.26H83.14c-17.9,0-22.38-7.75-13.43-23.26L146.68,63.49c8.95-15.51,17.9-15.51,26.86,0ZM167.26,108.66l40.98,70.99c4.77,8.26,2.39,12.38-7.15,12.38h-81.97c-9.53,0-11.91-4.13-7.15-12.38l40.98-70.99c4.76-8.26,9.53-8.26,14.3,0Z"
        fill="color-mix(in srgb, var(--color-signal) 62%, var(--color-ink))"
      />
    </svg>
  )
}

export function OlaMark({ className, style }: MarkProps) {
  return (
    <svg
      viewBox="0 0 94.69 94.69"
      fill="currentColor"
      fillRule="evenodd"
      className={className}
      style={style}
      aria-hidden
    >
      <path d={RING} />
    </svg>
  )
}

/** The full Ola wordmark. */
export default function OlaLogo({ className, style }: MarkProps) {
  return (
    <svg
      viewBox="0 0 261.01 94.69"
      fill="currentColor"
      fillRule="evenodd"
      className={className}
      style={style}
      role="img"
      aria-label="Ola"
    >
      <path d={RING} />
      {/* L */}
      <polygon points="159.64 92.87 159.64 78.3 128.69 78.3 128.69 1.82 114.12 1.82 114.12 92.87 159.64 92.87" />
      {/* A */}
      <path d="M229.51,1.82h-18.94l-31.5,91.05h15.42l7.56-21.85h35.99l7.56,21.85h15.42L229.51,1.82ZM207.08,56.45l12.85-37.14h.21l12.85,37.14h-25.91Z" />
    </svg>
  )
}
