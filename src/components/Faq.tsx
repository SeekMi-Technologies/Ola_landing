import { useState } from 'react'
import { FAQ } from './faqData'

/* Keep the home page to the six questions a prospective team needs before
   deciding whether to explore further. The longer support answers remain in
   the knowledge base rather than turning the landing page into a manual. */
const HOME_FAQ = [FAQ[0]!, FAQ[1]!, FAQ[2]!, FAQ[3]!, FAQ[6]!, FAQ[7]!]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="scroll-mt-[68px] border-t border-mist/70 bg-bone py-16 md:py-20">
      <div className="shell">
        <div>
          <h2 className="t-heading-lg">还有什么想问的？</h2>
          <p className="t-subheading mt-4 max-w-[620px] text-ink/65 text-pretty">
            关于 Ola 的身份、权限边界和接入方式，这里有你最关心的答案。
          </p>
        </div>

        <div className="mt-8 grid items-start gap-2 md:mt-10 lg:grid-cols-2">
          {HOME_FAQ.map((item, index) => {
            const isOpen = openIndex === index
            const answerId = `faq-answer-${index}`

            return (
              <article
                key={item.q}
                className={`overflow-hidden rounded-[var(--radius-card)] border bg-paper shadow-[var(--shadow-sm)] transition-colors duration-200 ${
                  isOpen ? 'border-ink/20' : 'border-mist/55 hover:border-ink/15'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-center gap-4 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-signal/30 focus-visible:ring-inset"
                  >
                    {/* Inline prefix rather than a fixed 88px column — at
                        half width that column left no room for the question. */}
                    <span className="t-caption hidden shrink-0 text-ash sm:block">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="flex-1 text-[16px] font-medium leading-[1.45] tracking-[-0.01em] text-ink">
                      {item.q}
                    </span>

                    {/* An SVG cross, not a text "+". Inter hangs the plus
                        on the math axis: its ink runs 8.85px above to
                        0.83px below the baseline, so the ink centre sits
                        4.84px above the baseline while flex centres the
                        line box instead. In a 28px circle that pushed the
                        glyph 1.16px below true centre. Two symmetric
                        strokes have no such offset, and they rotate to a
                        clean × as well. */}
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-[var(--color-on-ink)] transition-transform duration-200 group-hover:bg-signal ${
                        isOpen ? 'rotate-45 bg-signal' : ''
                      }`}
                      aria-hidden
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={answerId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mx-5 border-t border-mist/70 pb-5 pt-4">
                      <p className="text-[14px] leading-[1.7] text-charcoal text-pretty">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
