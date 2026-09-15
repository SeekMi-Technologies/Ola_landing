/**
 * Proactive content negotiation over the Accept header, per RFC 9110
 * §12.5.1 and the acceptmarkdown.com guidance that sits on top of it.
 *
 * This is deliberately not `accept.includes('text/markdown')`. A real
 * Chrome header — `text/html,application/xhtml+xml,application/xml;q=0.9,
 * image/avif,image/webp,*∕*;q=0.8` — contains no markdown and must get
 * HTML, while `text/markdown;q=0, text/html` names markdown and must not.
 * The only way to get both right is to parse the list, rank by q, break
 * ties by specificity, and honour q=0 as "never".
 *
 * Pure: no platform APIs, so the same function runs at the edge and in
 * node:test.
 */

export type Preference = { type: string; subtype: string; q: number; index: number }

const DEFAULT_Q = 1

export function parseAccept(header: string | null | undefined): Preference[] {
  if (header == null) return []
  const preferences: Preference[] = []
  header.split(',').forEach((entry, index) => {
    const [range, ...params] = entry.trim().split(';')
    if (!range) return
    const [type, subtype] = range.trim().toLowerCase().split('/')
    if (!type || !subtype) return
    let q = DEFAULT_Q
    for (const param of params) {
      const [key, value] = param.trim().split('=')
      if (key?.trim().toLowerCase() === 'q' && value !== undefined) {
        const parsed = Number.parseFloat(value.trim())
        if (Number.isFinite(parsed)) q = Math.min(1, Math.max(0, parsed))
      }
    }
    preferences.push({ type, subtype, q, index })
  })
  return preferences
}

/** How well one Accept entry matches a concrete media type: 3 exact,
 *  2 subtype wildcard, 1 catch-all, 0 no match. */
function specificity(preference: Preference, mediaType: string) {
  const [type, subtype] = mediaType.toLowerCase().split('/')
  if (preference.type === type && preference.subtype === subtype) return 3
  if (preference.type === type && preference.subtype === '*') return 2
  if (preference.type === '*' && preference.subtype === '*') return 1
  return 0
}

/** The q-value the client assigned to `mediaType`, taking the most
 *  specific matching entry; 0 when nothing matches or the match is q=0. */
export function quality(preferences: Preference[], mediaType: string) {
  let best: { specificity: number; q: number; index: number } | null = null
  for (const preference of preferences) {
    const s = specificity(preference, mediaType)
    if (s === 0) continue
    if (!best || s > best.specificity) best = { specificity: s, q: preference.q, index: preference.index }
  }
  return best ?? { specificity: 0, q: 0, index: Number.MAX_SAFE_INTEGER }
}

export type Negotiation =
  | { status: 'ok'; mediaType: string }
  | { status: 'not-acceptable'; available: string[] }

/**
 * Pick which of `produces` to serve.
 *
 * - No Accept header, or `*∕*` alone: no constraint — serve the default.
 * - Otherwise the producible type with the highest q wins. Ties break on
 *   the specificity of the matching entry, then the order the client
 *   listed them, then the default.
 * - Every producible type at q=0 (or unmatched): 406, with the list of
 *   what exists so the client can retry.
 */
export function negotiate(
  header: string | null | undefined,
  produces: string[],
  defaultType: string = produces[0],
): Negotiation {
  const preferences = parseAccept(header)
  if (preferences.length === 0) return { status: 'ok', mediaType: defaultType }

  /* Rank: q first; then how specific the entry that matched was (an
     exact type beats text/* beats *∕*); then the order the client listed
     them; then the default. */
  let winner: { mediaType: string; q: number; specificity: number; index: number } | null = null
  for (const mediaType of produces) {
    const match = quality(preferences, mediaType)
    if (match.q === 0) continue
    const better =
      !winner ||
      match.q > winner.q ||
      (match.q === winner.q && match.specificity > winner.specificity) ||
      (match.q === winner.q && match.specificity === winner.specificity && match.index < winner.index) ||
      (match.q === winner.q &&
        match.specificity === winner.specificity &&
        match.index === winner.index &&
        mediaType === defaultType)
    if (better) winner = { mediaType, ...match }
  }

  if (!winner) return { status: 'not-acceptable', available: produces }
  return { status: 'ok', mediaType: winner.mediaType }
}
