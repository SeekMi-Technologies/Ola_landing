import { useState, type ReactNode } from 'react'
import OlaLogo, { OlaAvatar } from '../OlaLogo'
import {
  GROUPS,
  type Block,
  type Glyph,
  type Group,
  type IconKey,
  type Person,
} from './groups'

/* ------------------------------------------------------------------ */
/* Left icon rail — the most recognisable piece of Feishu's chrome     */
/* ------------------------------------------------------------------ */

const RAIL = [
  {
    label: '消息',
    active: true,
    path: 'M4 5h16v10H9l-5 4V5Z',
  },
  { label: '日程', path: 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18M12 7v5l3.4 2' },
  { label: '任务', path: 'M4.5 7.2 6.4 9.1l3.4-3.4M4.5 16.2l1.9 1.9 3.4-3.4M13.5 7.5h6M13.5 16.5h6' },
  { label: '会议', path: 'M3 7h11v10H3V7Z M14 11l7-4v10l-7-4Z' },
  { label: '工作台', path: 'M4 4h6v6H4V4Z M14 4h6v6h-6V4Z M4 14h6v6H4v-6Z M14 14h6v6h-6v-6Z' },
]

function Rail() {
  return (
    /* Icons only. The labels underneath were the smallest type on the page
       at 10px, and they named parts of Feishu the demo never uses — noise
       around the one thing this rail has to say, which is "this is a real
       client". Narrower now that nothing has to fit under the glyphs. */
    <aside className="hidden w-[52px] shrink-0 flex-col items-center gap-1 border-r border-mist bg-linen py-3 sm:flex">
      {/* The wordmark on its own, no chip. A filled tile made it read as
          one more button in the rail; unboxed it reads as the client's
          identity, which is what a logo in this position is for. */}
      <span className="mb-2 flex h-[26px] items-center justify-center">
        <OlaLogo className="w-[26px] text-ink" />
      </span>
      {RAIL.map((r) => (
        <button
          key={r.label}
          aria-label={r.label}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
            r.active ? 'bg-ink/[0.06] text-ink' : 'text-charcoal hover:bg-black/[0.03]'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[19px] w-[19px]"
          >
            <path d={r.path} />
          </svg>
        </button>
      ))}
    </aside>
  )
}

/* ------------------------------------------------------------------ */

/* Claude Tag's avatars are a pale wash of the person's colour with a
   saturated mark on top, rather than a solid fill with a letter — the tint
   keeps a column of them from turning into a stripe of colour blocks, and
   the mark reads at 36px where two letters do not. */
const GLYPHS: Record<Glyph, string> = {
  bowtie: 'M4 4.5v15L11.4 12Z M20 4.5v15L12.6 12Z',
  squares: 'M3.5 3.5h8.5v8.5H3.5Z M12 12h8.5v8.5H12Z',
  diamond: 'M12 2.5 21.5 12 12 21.5 2.5 12Z',
  arch: 'M3.5 20.5V12a8.5 8.5 0 0 1 17 0v8.5h-5.5V12a3 3 0 0 0-6 0v8.5Z',
  clover:
    'M12 3a4.5 4.5 0 0 1 4.5 4.5A4.5 4.5 0 0 1 21 12a4.5 4.5 0 0 1-4.5 4.5A4.5 4.5 0 0 1 12 21a4.5 4.5 0 0 1-4.5-4.5A4.5 4.5 0 0 1 3 12a4.5 4.5 0 0 1 4.5-4.5A4.5 4.5 0 0 1 12 3Z',
  chevrons: 'M3.5 4.5 11 12l-7.5 7.5V14L5.5 12 3.5 10Z M13 4.5 20.5 12 13 19.5V14l2-2-2-2Z',
  ring: 'M12 2.5A9.5 9.5 0 1 0 21.5 12 9.5 9.5 0 0 0 12 2.5Zm0 6A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Z',
  cross: 'M9.5 2.5h5v7h7v5h-7v7h-5v-7h-7v-5h7Z',
}

function Avatar({
  person,
  size = 36,
}: {
  person: Person
  size?: number
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-lg"
      style={{
        background: `color-mix(in srgb, ${person.tone} 18%, #fff)`,
        width: size,
        height: size,
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill={person.tone}
        style={{ width: size * 0.52, height: size * 0.52 }}
      >
        <path d={GLYPHS[person.glyph]} fillRule="evenodd" />
      </svg>
    </span>
  )
}

function BotAvatar({ size = 36 }: { size?: number }) {
  return (
    <OlaAvatar
      className="shrink-0 rounded-lg"
      style={{ width: size, height: size }}
    />
  )
}

/* Consecutive messages from one person drop the avatar and name — every
   real client does this, and its absence is what made the old mock-up
   read as a transcript rather than a conversation. */
function Message({
  person,
  at,
  showHeader,
  children,
}: {
  person: Person
  at: string
  showHeader: boolean
  children: ReactNode
}) {
  return (
    <div className={`flex items-start gap-3 ${showHeader ? '' : '-mt-3.5'}`}>
      <div className="w-9 shrink-0">{showHeader && <Avatar person={person} />}</div>
      <div className="min-w-0 flex-1">
        {showHeader && (
          <div className="flex items-baseline gap-2">
            <span className="text-[14px] font-semibold text-ink">{person.name}</span>
            <span className="text-[12px] text-charcoal">{at}</span>
          </div>
        )}
        <div className={showHeader ? 'mt-1' : ''}>{children}</div>
      </div>
    </div>
  )
}

/* Feishu keeps a composer pinned under every thread. Without one the panel
   looks like a screenshot of a log, not a place you can type. */
function Composer({ group }: { group: string }) {
  return (
    <div className="border-t border-mist px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2 rounded-[10px] border border-mist bg-white px-3 py-2.5">
        <span className="flex-1 truncate text-[13px] text-charcoal">
          {`发消息到「${group}」`}
        </span>
        <div className="flex items-center gap-3 text-charcoal">
          {[
            'M12 5v14M5 12h14',
            'M8 9h8M8 13h5M4 19V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H8l-4 3Z',
            'M12 4a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-5 0v-5A2.5 2.5 0 0 1 12 4ZM6 11a6 6 0 0 0 12 0M12 17v3',
          ].map((d) => (
            <svg
              key={d}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden
            >
              <path d={d} />
            </svg>
          ))}
        </div>
      </div>
    </div>
  )
}


/* ------------------------------------------------------------------ */
/* Answer blocks, after Claude Tag's transcripts. Their bot does not    */
/* speak in one flat paragraph: it posts a ✓ plan first, then an answer */
/* built from labelled sections, a table, a result line, an attachment  */
/* and a footer link. That shape is what makes it read like work.       */
/* ------------------------------------------------------------------ */

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'todos':
      return (
        <div className="rounded-[8px] border border-mist bg-linen/60 px-3 py-2.5">
          <ul className="space-y-1">
            {block.items.map((it) => (
              <li key={it} className="flex gap-2 text-[13px] leading-[21px] text-ink">
                <span className="shrink-0 text-ok" aria-hidden>
                  ✓
                </span>
                <span className="min-w-0">{it}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-charcoal">
            {`任务清单 · 截至 ${block.at}`}
          </p>
        </div>
      )

    case 'text':
      return (
        <>
          {block.lines.map((l) => (
            <p key={l} className="text-[14px] leading-[22px] text-ink">
              {l}
            </p>
          ))}
        </>
      )

    case 'section':
      return (
        <div>
          {block.label && (
            <p className="text-[14px] font-semibold leading-[22px] text-ink">
              {block.label}
            </p>
          )}
          <ul className={block.label ? 'mt-1 space-y-1' : 'space-y-1'}>
            {block.items.map((it) => (
              <li key={it} className="flex gap-2 text-[14px] leading-[22px] text-ink">
                <span className="shrink-0 text-charcoal" aria-hidden>
                  ·
                </span>
                <span className="min-w-0">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'table':
      return (
        <div className="overflow-hidden rounded-[8px] border border-mist">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-linen/70">
                {block.head.map((h) => (
                  <th
                    key={h}
                    className="px-3 py-1.5 text-left font-medium text-charcoal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r) => (
                <tr key={r.join()} className="border-t border-mist">
                  {r.map((c, i) => (
                    <td
                      key={c + i}
                      className={`px-3 py-1.5 ${i === 0 ? 'text-ink' : 'text-charcoal'}`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'meta':
      return (
        <p className="font-mono text-[12px] leading-[20px] text-charcoal">
          {block.text}
        </p>
      )

    case 'links':
      return (
        <p className="text-[13px] leading-[21px]">
          {block.items.map((l, i) => (
            <span key={l}>
              {i > 0 && <span className="text-charcoal"> · </span>}
              {/* Part of the mock-up, not navigation: these name issues in a
                  fictional workspace. Styled as links, but not anchors —
                  href="#" would be a real dead link on a real page. */}
              <span className="text-fs-link underline underline-offset-2">{l}</span>
            </span>
          ))}
        </p>
      )
  }
}

function Thread({ group }: { group: Group }) {
  const { context, ask, replies, replyCount, followUp } = group
  const lastCtx = context[context.length - 1]

  return (
    <div className="space-y-3.5 px-4 py-5 sm:px-6">
      {context.map((m, i) => (
        <Message
          key={`${m.at}-${i}`}
          person={m.by}
          at={m.at}
          showHeader={i === 0 || context[i - 1].by.name !== m.by.name}
        >
          <p className="text-[14px] leading-[22px] text-ink">{m.body}</p>
        </Message>
      ))}

      <Message
        person={ask.by}
        at={ask.at}
        showHeader={!lastCtx || lastCtx.by.name !== ask.by.name}
      >
        <p className="text-[14px] leading-[22px] text-ink">
          {/* One source of truth: the Prompt card and this bubble both read
              `group.prompt`. The leading @Ola becomes a mention chip here,
              the way Feishu renders it. */}
          <span className="rounded-[3px] bg-signal/10 px-1 font-semibold text-signal">
            @Ola
          </span>
          {group.prompt.replace(/^@Ola\s*/, ' ')}
        </p>
      </Message>

      {/* Feishu, like Slack, marks how many messages the answer took. */}
      <p className="pl-12 text-[12px] text-fs-link">
        {`${replyCount} 条回复`}
      </p>

      {replies.map((msg, i) => (
        <div key={msg.at + i} className={`flex items-start gap-3 ${i ? '-mt-1' : 'pt-1'}`}>
          <div className="w-9 shrink-0">{i === 0 && <BotAvatar />}</div>
          <div className="min-w-0 flex-1">
            {i === 0 && (
              <div className="flex items-baseline gap-2">
                <span className="text-[14px] font-semibold text-ink">Ola</span>
                <span className="rounded-[4px] bg-mist/50 px-1.5 py-px text-[11px] leading-[18px] text-charcoal">
                  智能体
                </span>
                <span className="text-[12px] text-charcoal">{msg.at}</span>
              </div>
            )}
            {i > 0 && (
              <span className="text-[12px] text-charcoal">{msg.at}</span>
            )}

            <div className="mt-1 space-y-2">
              {msg.blocks.map((b, bi) => (
                <BlockView key={bi} block={b} />
              ))}
            </div>
          </div>
        </div>
      ))}

      {followUp && (
        <Message person={followUp.by} at={followUp.at} showHeader>
          <p className="text-[14px] leading-[22px] text-ink">{followUp.body}</p>
        </Message>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Use-case tabs, after Claude Tag's "How teams use @Claude" section.  */
/* Their structure: a row of verb-labelled tabs above a coloured panel */
/* holding a dark Prompt card beside the product mock-up. Structure    */
/* copied; the palette is this page's own.                            */
/* ------------------------------------------------------------------ */

const ICONS: Record<IconKey, string> = {
  catchup: 'M4 6h16M4 11h16M4 16h9',
  chart: 'M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-7',
  watch: 'M2 12s3.6-6.2 10-6.2S22 12 22 12s-3.6 6.2-10 6.2S2 12 2 12Z M12 14.4a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8',
  issue: 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18M12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4',
  callprep: 'M7 3v3M17 3v3M4 9h16M5 21h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1Z',
  mic: 'M12 4a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-5 0v-5A2.5 2.5 0 0 1 12 4ZM6 11a6 6 0 0 0 12 0M12 17v3',
  tasks: 'M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2',
  search: 'M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14ZM20 20l-4-4',
  book: 'M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4ZM17 7h2v13H8',
  history: 'M12 8v4l3 1.8M3.6 12a8.4 8.4 0 1 0 2.6-6.1M3.6 5.4v4.2h4.2',
  morning: 'M12 3.5v3M5.4 8.4 3.6 6.6M18.6 8.4l1.8-1.8M2.5 18h19M6.8 18a5.2 5.2 0 0 1 10.4 0',
  draft: 'M4 20h4L18.6 9.4a2 2 0 0 0-2.8-2.8L5 17.2V20ZM14.6 8.2l2.8 2.8',
  pickup: 'M4 13h4.2l1.4 2.6h4.8L15.8 13H20M4 13l2-8h12l2 8v6.5H4V13Z',
  deepwork: 'M12 3.2 3.4 7.6 12 12l8.6-4.4L12 3.2ZM3.4 12.4 12 16.8l8.6-4.4M3.4 16.8 12 21.2l8.6-4.4',
  recap: 'M20.2 14.6A8.4 8.4 0 1 1 9.6 4a6.9 6.9 0 0 0 10.6 10.6Z',
}

function TabIcon({ icon }: { icon: IconKey }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px] shrink-0"
      aria-hidden
    >
      <path d={ICONS[icon]} />
    </svg>
  )
}

function TabBar({
  active,
  onPick,
}: {
  active: string
  onPick: (id: string) => void
}) {
  return (
    /* One swipeable row on phones, a grid from sm.
       At 375 the 3-column grid ran to five rows and 410px — a whole screen
       of tabs before any of the thing they switch. A phone tab bar scrolls
       sideways, so the rail is 45px there and the mock-up starts above the
       fold. `-mx` + matching `px` let the row bleed to the panel edge so the
       last chip is visibly cut, which is what says "keep swiping".

       From lg it is a grid, not flex-wrap: wrapping by content left a second
       row four items long against a first row of eleven. 15 divides evenly
       by 5, so every row is full — and 5 columns leave room for the English
       labels, which run to "Monitor channels".

       Below lg it stays the scrolling rail. It used to become the grid at
       sm, where 673px across five columns fitted the 3-character Chinese but
       not "Split handoffs" / "Catch loose ends", which collided on iPad. */
    <div
      className="-mx-1.5 flex snap-x snap-mandatory gap-1 overflow-x-auto rounded-[14px] px-1.5 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:bg-white/[0.07] lg:px-1.5"
      role="tablist"
    >
      {GROUPS.map((g) => {
        const on = g.id === active
        return (
          <button
            key={g.id}
            role="tab"
            aria-selected={on}
            onClick={() => onPick(g.id)}
            className={`flex shrink-0 snap-start items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] px-3 py-2 text-[14px] transition-colors lg:shrink lg:px-2 ${
              on
                ? 'bg-bone font-medium text-ink shadow-[var(--shadow-sm)]'
                : 'bg-white/[0.07] text-white/70 hover:bg-white/10 hover:text-white lg:bg-transparent'
            }`}
          >
            <TabIcon icon={g.icon} />
            {g.useCase}
          </button>
        )
      })}
    </div>
  )
}

function BlurbCard({ blurb }: { blurb: Group['blurb'] }) {
  return (
    /* Same white/7 field as the tab bar: the mock-up shows what happened,
       these two say how to drive it and why it matters, and sharing one
       surface keeps them reading as commentary rather than more content. */
    <div className="w-full rounded-[12px] bg-white/[0.07] p-4">
      <p className="text-[15px] font-semibold leading-[1.4] text-white">
        {blurb.title}
      </p>
      <p className="mt-2 text-[13px] leading-[1.65] text-white/60">
        {blurb.body}
      </p>
    </div>
  )
}

function PromptCard({ prompt }: { prompt: string }) {
  return (
    /* Claude Tag's shape — 12px radius, 16px padding, ~245px wide, a small
       label over the prompt — with the colours swapped: their dark card
       sits on a warm field, ours is the warm block on a black one. */
    <div className="theme-light w-full rounded-[12px] bg-clay p-4 text-white md:w-[262px]">
      {/* No uppercase and no tracking: both are Latin devices that do
          nothing for 提示词 except pull the glyphs apart. Contrast still
          has to clear 4.5:1 on clay, which 70% white does not — 80% does,
          at 4.8. */}
      <p className="text-[12px] font-semibold text-white/80">提示词</p>
      <p className="mt-2 text-[14px] leading-[1.6] text-white">
        {/* The handle is bolded rather than tinted — the card is already
            clay, so a colour here would be a third value on one block. */}
        <span className="font-semibold">@Ola</span>
        {prompt.replace(/^@Ola\s*/, ' ')}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export default function FeishuDemo() {
  /* Derived from the data, not a hardcoded id. A literal here silently
     went stale when the groups were renamed — `find` returned undefined
     and the whole demo crashed. `tsc` cannot catch it because the id is
     a plain string. */
  const [active, setActive] = useState(GROUPS[0].id)
  const group = GROUPS.find((g) => g.id === active)!

  return (
    <div>
      <TabBar active={active} onPick={setActive} />

      <div className="mt-4 flex flex-col gap-4 md:mt-5 md:flex-row md:items-start md:gap-6">
        <div className="flex w-full shrink-0 flex-col gap-3 md:w-[262px]">
          <PromptCard prompt={group.prompt} />
          <BlurbCard blurb={group.blurb} />
        </div>

        {/* Hidden below sm. The mock-up is a desktop chat client — a rail,
            a group header, a thread and a composer — squeezed into 327px it
            was 420px of shrunken chrome that read as a screenshot rather
            than as software, and it put the prompt and the explanation two
            screens apart. On phones those two carry the section on their
            own.

            From sm: one fixed height for every tab. Reply length used to set
            the panel height, so switching tabs made the whole page jump; now
            the window is a constant 500px and the thread scrolls inside it,
            which is what a real client does anyway.

            `flex-1` only from md. Below that the parent is a column, where
            `flex: 1 1 0%` takes the main axis off `height` and let the panel
            grow — measured 754px against the 500 it is meant to be. */}
        <div className="theme-light hidden h-[420px] w-full min-w-0 overflow-hidden rounded-[var(--radius-card)] bg-paper shadow-[0_20px_50px_-24px_rgba(24,23,23,0.45)] sm:flex sm:h-[500px] md:w-auto md:flex-1">
          <Rail />

          <div className="flex min-w-0 flex-1 flex-col">
            {/* Group header: name + member count, no `#` */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-mist px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate text-[15px] font-semibold text-ink">
                  {group.name}
                </span>
                <span className="shrink-0 text-[13px] text-charcoal">
                  ({group.members})
                </span>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <Thread group={group} />
            </div>

            <div className="shrink-0">
              <Composer group={group.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
