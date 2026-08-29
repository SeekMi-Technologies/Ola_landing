import { IconArrow } from './icons'
import FeishuDemo from './feishu/FeishuDemo'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bone pt-16 md:pt-24">
      <div className="shell">
        {/* Split again: the headline holds the left
            and the supporting copy plus the way in sit opposite it. */}
        {/* Boxes start together; the copy column is then nudged down so the
            two first lines share a CAP TOP — see .hero-copy in index.css.
            Neither default works on its own: `items-start` aligns box tops
            and leaves the headline's glyphs sitting low inside a tall line
            box, `items-baseline` aligns baselines and throws the larger
            type's cap far above the smaller. */}
        <div className="grid items-start gap-y-9 lg:grid-cols-[1.15fr_1fr] lg:gap-x-16">
          {/* 1.38, not the display default of 1.15. When the highlight lands
              on the second line the box paints 0.05em above its own text,
              and at 1.15 there are only ~5px of half-leading to absorb it —
              measured, the box top sat 6.5px INSIDE the descender of "your"
              on the line above. The looser line buys that back with room to
              spare, and costs nothing in Chinese, which fits on one line.

              Tracking is loosened for Chinese only — see the :lang rule in
              index.css. */}
          <h1 className="t-display leading-[1.38]">
            你的
            <span className="hero-en-space" aria-hidden>{' '}</span>
            <br className="br-en" />
            新
            <span className="mark-inline mark-inline--signal">同事</span>
          </h1>

          {/* 10px of cap-top compensation, measured: at this size the
              headline's glyphs start 11.0px (en) / 9.6px (zh) below the box
              top, the paragraph's 0. One value covers both to within a
              pixel. Only from lg — below that the columns stack and there is
              no first line to align with. */}
          <div className="lg:pt-[10px]">
            {/* Figma 519:17939 — 20px / 30px line / rgba(48,44,44,0.65),
                i.e. the ink colour at 65%, not a separate grey. Width in px,
                not ch — the ch unit measures "0" and under-sizes CJK lines. */}
            <p className="t-subheading max-w-[540px] text-ink/65 text-pretty">
              主动干活的队友，就在你原本工作的地方 ——
              飞书、Lark、WhatsApp、Slack、Teams。
            </p>

            {/* Points at the demo directly below rather than off the page, so
                it reads as "keep going" instead of a second CTA competing
                with the one in the nav. */}
            <a
              href="#demo"
              className="group mt-7 inline-flex items-center gap-2 text-[15px] text-ink underline underline-offset-4 hover:text-signal"
            >
              Ola 都能帮你做什么
              <IconArrow className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Showcase panel: black, with the same 32px grid the other fields
          use. The colour is carried by the Prompt card instead — the
          inverse of Claude Tag, which puts a dark card on a warm field. */}
      <div id="demo" className="shell mt-14 scroll-mt-[84px] md:mt-16">
        <div className="grid-field grid-field--ink rounded-[var(--radius-card)] p-3 sm:p-6 lg:p-8">
          <FeishuDemo />
        </div>
      </div>

      <div className="pb-20 md:pb-24" />
    </section>
  )
}
