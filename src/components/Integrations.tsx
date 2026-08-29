import OlaLogo from './OlaLogo'

/* A tile is either a placeholder letter on a brand colour, or — once a
   real logo exists in /public/logos — the logo itself. Logos ship in two
   files because the mark has to invert with the page: upstream calls the
   pale one `-light` meaning "light artwork", which is the file that needs
   a DARK ground, so they are renamed here by where they go. */
type Tile = {
  label: string
  bg: string
  fg?: string
  /** Dark artwork, for the light theme. A full-colour mark works on both
   *  grounds, so it only needs this one. */
  logo?: string
  /** Pale artwork, for the dark theme. Omit when `logo` is full-colour. */
  logoDark?: string
  /** Plate behind the mark. Defaults to `paper`, which flips with the
   *  theme; set a brand colour to keep one tile coloured in both — a wall
   *  of white plates goes flat once several logos land. A tile with a
   *  plate needs no dark variant: the ground no longer changes. */
  plate?: string
  /** A wordmark rather than a square icon. Given the same 58% box it would
   *  render at a fraction of the height of its neighbours, so it gets a
   *  wider one and lets `object-contain` set the height. */
  wordmark?: boolean
}

/* Order is the layout. Each half renders as a 3-column grid, so index 0-2
   are row one and so on; the right half is offset by one, starting at
   column two.

   The three monochrome marks — Notion, Linear, GitHub — are placed so that
   none of them touches another, not even diagonally. Grouped, they read as
   one grey smudge and the wall looks unfinished; spread out, they punctuate
   the colour instead of clumping in it. Notion sits top-left, Linear two
   columns away and a row down, and GitHub and X take the top and
   bottom rows of the other half — the two free slots left over from the
   last pass both bordered GitHub, so the right half had to be re-dealt
   rather than simply filled. */
const LEFT: Tile[] = [
  { label: 'N', bg: '#000000', logo: '/logos/notion.webp', logoDark: '/logos/notion-dark.webp' },
  { label: 'S', bg: '#00a1e0', logo: '/logos/slack.webp' },
  { label: 'H', bg: '#ff7a59', logo: '/logos/hubspot.svg', logoDark: '/logos/hubspot-dark.svg' },
  { label: 'W', bg: '#25d366', logo: '/logos/whatsapp.webp' },
  { label: 'D', bg: '#4285f4', logo: '/logos/google-drive.webp' },
  { label: 'L', bg: '#5e6ad2', logo: '/logos/linear.webp', logoDark: '/logos/linear-dark.webp' },
  {
    label: 'S',
    bg: '#635bff',
    /* Blurple on the paper plate, like every other tile. In dark mode the
       plate goes to #232220 and Blurple lands at 2.6:1 against it, so the
       white cut takes over there. */
    logo: '/logos/stripe-wordmark.svg',
    logoDark: '/logos/stripe-wordmark-white.svg',
    wordmark: true,
  },
  { label: '飞', bg: '#3370ff', logo: '/logos/lark.webp' },
]

const RIGHT: Tile[] = [
  { label: 'G', bg: '#24292f', logo: '/logos/github.webp', logoDark: '/logos/github-dark.webp' },
  { label: 'F', bg: '#f24e1e', logo: '/logos/figma.webp' },
  { label: 'Z', bg: '#2d8cff', logo: '/logos/langfuse.webp' },
  { label: 'M', bg: '#ea4335', logo: '/logos/gmail.webp' },
  { label: 'T', bg: '#5059c9', logo: '/logos/microsoft-teams.webp' },
  { label: 'I', bg: '#0a66c2', logo: '/logos/linkedin.webp' },
  { label: 'X', bg: '#000000', logo: '/logos/x.webp', logoDark: '/logos/x-dark.webp' },
]

function TileGrid({ tiles, offset = false }: { tiles: Tile[]; offset?: boolean }) {
  return (
    <div className="grid w-full grid-cols-3 gap-1.5 sm:gap-2">
      {tiles.map((tile, index) => {
        const cls = `flex aspect-square items-center justify-center overflow-hidden rounded-[12px] text-[16px] font-semibold shadow-[var(--shadow-sm)] sm:text-[20px] ${
          offset && index === 0 ? 'col-start-2' : ''
        }`

        if (tile.logo) {
          return (
            /* The mark sits on a `paper` plate at 58%, not bled to the tile
               edge. These logos carry their own silhouette and transparent
               corners, so filling the tile left the page ground showing
               through the corners and the tile stopped reading as part of
               the mosaic. `paper` also flips with the theme, which is what
               the two artwork files are for. */
            <span
              key={`${tile.label}-${index}`}
              className={`${cls} ${tile.plate ? '' : 'bg-paper'}`}
              style={tile.plate ? { background: tile.plate } : undefined}
            >
              <picture
                className={`flex items-center justify-center ${
                  tile.wordmark ? 'w-[74%]' : 'h-[58%] w-[58%]'
                }`}
              >
                <source
                  srcSet={tile.logoDark ?? tile.logo}
                  media="(prefers-color-scheme: dark)"
                />
                <img
                  src={tile.logo}
                  alt=""
                  className="h-full w-full object-contain"
                  aria-hidden
                />
              </picture>
            </span>
          )
        }

        return (
          <span
            key={`${tile.label}-${index}`}
            className={cls}
            style={{ background: tile.bg, color: tile.fg ?? '#fff' }}
            aria-hidden
          >
            {tile.label}
          </span>
        )
      })}
    </div>
  )
}

/* The dark tile at the centre of the integration grid. It used to hold a
   3×3 dot matrix standing in for the logo; now it carries the real
   wordmark. The tile is dark in both themes, so white is safe here. */
function PanelMark() {
  /* Half the tile is right in the square, but on phones the tile is a
     full-width banner — half of that would be an outsized mark. */
  return <OlaLogo className="w-[28%] max-w-[180px] text-white/90 sm:w-1/2" />
}

export default function Integrations() {
  return (
    <section id="integrations" className="scroll-mt-[68px] border-t border-mist/70 bg-bone py-16 md:py-20">
      <div className="shell">
        {/* No width cap here. A capped block with no `mx-auto` sat flush
            left and left ~240px dead on the right; centring it instead
            would have pulled the tiles out of line with the heading.
            The Figma runs this row the full content width. */}
        <div>
          {/* A claim about connecting, not an inventory of what is connected.
              Naming the four integrations invited the reader to count them,
              and went stale the moment a fifth shipped — but the claim that
              replaced it ("一条指令，剩下的他自己跑") described autonomy, which
              is every other section's subject and not this one's.

              The shape is borrowed — 「可连接 3,200+ 款工具，并像你一样使用
              它们」 — because the second clause is the real claim there:
              connecting is table stakes, operating the tools the way a
              person would is not. Their count is theirs and does not
              transfer, so only the structure is borrowed. */}
          {/* No cap, like every other section heading. This one is the one
              that genuinely needs two lines — 1509px of text — so it carries
              a deliberate <br> between the claim and its predicate. The
              760px cap was making the first half wrap again on top of that,
              for three lines where two were designed. */}
          <h2 className="t-heading-lg">不只是连上工具，他真的会用</h2>

          <div className="mt-10 grid grid-cols-2 items-center gap-3 sm:grid-cols-3 sm:gap-4 md:mt-12 md:gap-5">
            <div className="order-2 sm:order-none">
              <TileGrid tiles={LEFT} />
            </div>

            {/* On phones this tile spans both columns, so a square would make
                it a full-width block taller than the two tile grids under it.
                Below `sm` it reads as a banner instead; from `sm` up it is one
                cell of the three-column row again, and square. */}
            <div className="order-1 col-span-2 flex aspect-[5/2] items-center justify-center rounded-[16px] bg-panel shadow-[var(--shadow-sm)] sm:order-none sm:col-span-1 sm:aspect-square">
              <PanelMark />
            </div>

            <div className="order-3 sm:order-none">
              <TileGrid tiles={RIGHT} offset />
            </div>
          </div>

          {/* The wall shows more marks than are live today. Saying so here
              keeps the row honest without putting a badge on every tile —
              /integrations is where the per-tool status lives. */}
          <p className="mt-6 text-[14px] leading-[1.6] text-ink/50">
            部分应用正在接入中，
            <a
              href="/integrations"
              className="underline underline-offset-2 transition-colors hover:text-ink"
            >
              查看每个工具的状态
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
