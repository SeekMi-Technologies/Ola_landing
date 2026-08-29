/**
 * The opening band shared by every interior page: /product,
 * /integrations, /pricing, /contact, /enterprise, /how, /terms, /privacy.
 *
 * It carries no ground of its own: same bone canvas, same measure, same
 * two-column split and the same 10px cap-top compensation as the home
 * page's own hero, so an interior page opens exactly the way the home page
 * does. Earlier versions painted a coloured band here — navy, brick-red,
 * a black grid field, then one green for all four — which made every
 * interior page announce itself before its content did.
 *
 * The hero paints no rule of its own; the section below it carries
 * `border-t border-mist/70`, which is how the home page closes its own
 * opening too. /product and /pricing were missing that border — they now
 * have it, so all four pages break in the same place.
 *
 * `blurb` is optional. Without one there is nothing to sit beside, so the
 * two-column split is dropped and the heading takes the full measure —
 * which is also what lets a heading this length stay on one line.
 */

export default function PageHero({ title, blurb }: { title: string; blurb?: string }) {
  return (
    <section className="bg-bone pt-16 md:pt-24">
      <div className="shell">
        <div
          className={`grid items-start gap-y-9 ${
            blurb ? 'lg:grid-cols-[1.15fr_1fr] lg:gap-x-16' : ''
          }`}
        >
          <div>
            {/* Short enough for one line, so there is no break to place.
                Measured off claude.com's own CJK build: its page headings run
                5-14 characters (料金プラン, 最適な思考, 速く考え、さらに速く構築する)
                and never carry a hand-placed break or a trailing 。 — the
                selling happens in the line beside it. */}
            <h1 className="t-display leading-[1.38]">{title}</h1>
          </div>

          {/* 10px of cap-top compensation, the same measurement the home
              hero uses: at this size the headline's glyphs start ~10px below
              their box top and the paragraph's start at 0. Only from lg —
              below that the columns stack and there is no line to align to. */}
          {blurb && (
            <div className="lg:pt-[10px]">
              {/* Under 30 Han glyphs, and no trailing 。 — claude.com drops
                  the stop on short subheads (どなたでも無料でご利用いただけます)
                  and only keeps it once the line becomes a full sentence. */}
              <p className="t-subheading max-w-[540px] text-ink/65 text-pretty">{blurb}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
