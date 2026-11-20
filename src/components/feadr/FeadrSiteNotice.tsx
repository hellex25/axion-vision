import {
  feadrFundingConfig as cfg,
  formatEurPlain,
} from '~/config/feadrFunding'

const EU_BLUE = '#003399'
const EU_BLUE_LIGHT = '#a9bce6'

type Cell = [number, number]

function cellsFrom(w: number, h: number, on: (x: number, y: number) => boolean) {
  const out: Cell[] = []
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (on(x, y)) out.push([x, y])
  return out
}

function PixelPath({ cells, fill, dx = 0 }: { cells: Cell[]; fill: string; dx?: number }) {
  const d = cells.map(([x, y]) => `M${x + dx} ${y}h1v1h-1z`).join('')
  return <path d={d} fill={fill} />
}

function cellsFromMap(rows: string[]) {
  return cellsFrom(rows[0].length, rows.length, (x, y) => rows[y][x] === '#')
}

/*
 * Motivul de sus: chenar în trepte cu romb în trepte în interior, legat de
 * următorul printr-o mică „cruce” — ca pe placa AFIR.
 */
const TOP_MAP = [
  '.....#########......',
  '....###########.....',
  '...###.......###....',
  '..###...###...###...',
  '.###...#####...###.#',
  '###...##...##...###.',
  '##...##..#..##...##.',
  '###...##...##...###.',
  '.###...#####...###.#',
  '..###...###...###...',
  '...###.......###....',
  '....###########.....',
  '.....#########......',
]
const TOP_W = TOP_MAP[0].length
const TOP_H = TOP_MAP.length
const TOP_CELLS = cellsFromMap(TOP_MAP)

function MotifBand() {
  const tiles = 40
  return (
    <div aria-hidden className="overflow-hidden px-3 pt-3 sm:px-5">
      <svg
        viewBox={`0 0 ${TOP_W * tiles} ${TOP_H}`}
        preserveAspectRatio="xMinYMid slice"
        shapeRendering="crispEdges"
        className="my-1.5 block h-[24px] w-full sm:h-[30px]"
      >
        {Array.from({ length: tiles }).map((_, i) => (
          <PixelPath key={i} cells={TOP_CELLS} fill={EU_BLUE_LIGHT} dx={i * TOP_W} />
        ))}
      </svg>
    </div>
  )
}

/* Motivele din subsol: acolade în trepte „{” și „}”, colorate, ca pe placa AFIR. */
const BRACE_MAP = [
  '..####',
  '.###..',
  '.###..',
  '###...',
  '##....',
  '###...',
  '.###..',
  '.###..',
  '..####',
]
const BR_W = BRACE_MAP[0].length
const BR_H = BRACE_MAP.length
const LEFT_BRACE = cellsFromMap(BRACE_MAP)
const RIGHT_BRACE: Cell[] = LEFT_BRACE.map(([x, y]) => [BR_W - 1 - x, y])

const AFIR_COLORS = {
  blue: '#2d4f9e',
  green: '#3f6b45',
  lime: '#a3b52a',
  red: '#c0282d',
  brown: '#6b4128',
  yellow: '#e2a713',
  orange: '#d9742a',
}

function Braces({ items }: { items: Array<['{' | '}', keyof typeof AFIR_COLORS]> }) {
  const step = BR_W + 1
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${items.length * step - 1} ${BR_H}`}
      shapeRendering="crispEdges"
      className="block h-6 w-auto shrink-0 sm:h-9"
    >
      {items.map(([kind, color], i) => (
        <PixelPath
          key={i}
          cells={kind === '{' ? LEFT_BRACE : RIGHT_BRACE}
          fill={AFIR_COLORS[color]}
          dx={i * step}
        />
      ))}
    </svg>
  )
}

/** Sigla oficială a Guvernului României. */
function GovSeal() {
  return (
    <img
      src="/feadr/guvernul-romaniei.png"
      alt="Guvernul României"
      className="h-[80px] w-[80px] shrink-0 object-contain sm:h-[96px] sm:w-[96px]"
    />
  )
}

function Field({
  label,
  value,
  bold = true,
}: {
  label: string
  value?: string
  bold?: boolean
}) {
  return (
    <div className="flex items-end gap-2">
      <span className="shrink-0 text-xs font-bold sm:text-sm" style={{ color: EU_BLUE }}>
        {label}
      </span>
      <span
        className={`min-w-0 flex-1 border-b-2 border-dotted pb-0.5 text-xs uppercase sm:text-sm ${
          bold ? 'font-bold' : ''
        }`}
        style={{ borderColor: EU_BLUE_LIGHT, color: '#1a1a1a' }}
      >
        {value || ' '}
      </span>
    </div>
  )
}

function DatePill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[76px] shrink-0 text-xs font-bold sm:text-sm" style={{ color: EU_BLUE }}>
        {label}
      </span>
      <span
        className="flex-1 rounded-md px-3 py-1 text-center text-sm font-semibold tracking-wider text-white sm:text-base"
        style={{ backgroundColor: EU_BLUE }}
      >
        {value}
      </span>
    </div>
  )
}

/** Panou finanțare PS 2023–2027 — replică a plăcii AFIR, cu datele proiectului. */
export function FeadrSiteNotice() {
  return (
    <div className="space-y-6">
      <article
        className="overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30"
        style={{ fontFamily: 'Calibri, "Segoe UI", Arial, sans-serif' }}
        aria-label="Placă informativă proiect finanțat PS 2023–2027"
      >
        <MotifBand />

        {/* Antet */}
        <header className="grid grid-cols-2 items-center gap-x-3 gap-y-3 px-4 pb-4 pt-3 sm:grid-cols-[auto_1fr_auto] sm:gap-5 sm:px-7 sm:pb-3 sm:pt-5">
          <GovSeal />
          <img
            src="/feadr/ue-cofinantat.png"
            alt="Cofinanțat de Uniunea Europeană"
            className="h-auto w-[140px] justify-self-end object-contain sm:order-3 sm:w-[150px]"
          />
          <div className="col-span-2 min-w-0 text-center sm:order-2 sm:col-span-1">
            <h2
              className="text-xl font-extrabold uppercase leading-tight sm:text-2xl"
              style={{ color: EU_BLUE }}
            >
              Planul Strategic <br className="sm:hidden" />
              PAC 2023 - 2027
            </h2>
            <div className="mx-auto my-1.5 h-px w-4/5" style={{ backgroundColor: EU_BLUE_LIGHT }} />
            <p className="text-xs font-semibold leading-snug sm:text-sm" style={{ color: EU_BLUE }}>
              Program cofinanțat de Uniunea Europeană prin Fondul European Agricol
              pentru Dezvoltare Rurală și de Guvernul României.
            </p>
          </div>
        </header>

        {/* Corp */}
        <div className="grid gap-5 px-4 pb-5 sm:grid-cols-[1.15fr_1fr] sm:gap-6 sm:px-7">
          {/* Stânga */}
          <div className="flex flex-col gap-4">
            <div className="space-y-3 rounded-xl border-2 p-3 sm:p-4" style={{ borderColor: EU_BLUE }}>
              <p className="text-xs font-bold leading-snug sm:text-sm" style={{ color: EU_BLUE }}>
                Proiect finanțat cu fonduri nerambursabile prin Planul Strategic
                PAC 2023 - 2027 (PS 2023 - 2027)
              </p>
              <p
                className="border-b-2 border-dotted pb-1 text-xs font-bold uppercase leading-relaxed sm:text-sm"
                style={{ borderColor: EU_BLUE_LIGHT, color: '#1a1a1a' }}
              >
                {cfg.projectName}
              </p>
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-xs font-bold sm:text-sm" style={{ color: EU_BLUE }}>
                  Cod proiect:
                </span>
                <span
                  className="flex-1 break-all rounded-md px-3 py-1 font-mono text-xs tracking-wide text-white sm:text-sm"
                  style={{ backgroundColor: EU_BLUE }}
                >
                  {cfg.projectCode}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[0.8fr_1.2fr]">
                <Field label="Județ:" value={cfg.county} />
                <Field label="Localitate:" value={cfg.locality} />
              </div>
            </div>

            <Field label="Beneficiar:" value={cfg.beneficiary} />

            <div
              className="mt-auto space-y-2 rounded-xl p-4 text-white"
              style={{ backgroundColor: EU_BLUE }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="text-xs font-semibold sm:text-sm">
                  Valoarea totală eligibilă a proiectului:
                </span>
                <span className="text-sm font-bold sm:text-base">
                  {formatEurPlain(cfg.totalEligibleEur)}
                </span>
              </div>
              <p className="text-[11px] opacity-80 sm:text-xs">din care,</p>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="text-xs font-semibold sm:text-sm">
                  finanțare nerambursabilă{' '}
                  <span className="text-[#ffd400]">PS 2023-2027</span>:
                </span>
                <span className="text-sm font-bold sm:text-base">
                  {formatEurPlain(cfg.feadrFundingEur)}
                </span>
              </div>
            </div>
          </div>

          {/* Dreapta */}
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold sm:text-sm" style={{ color: EU_BLUE }}>
                Autoritatea Contractantă:
              </p>
              <img
                src="/feadr/afir_logotip.png"
                alt="AFIR — Agenția pentru Finanțarea Investițiilor Rurale, din cadrul Ministerului Agriculturii și Dezvoltării Rurale"
                className="h-auto w-full max-w-[300px] object-contain"
              />
            </div>

            {cfg.isLeader && (
              <div className="rounded-lg px-4 py-3 text-white" style={{ backgroundColor: EU_BLUE }}>
                <p className="text-2xl font-extrabold leading-none tracking-wide">LEADER</p>
                <p className="mt-1 text-[10px] leading-snug opacity-90 sm:text-xs">
                  Dezvoltarea locală plasată sub responsabilitatea comunității
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Field label="Proiectant:" value={cfg.designer} />
              <Field label="Executant:" value={cfg.executor} />
            </div>

            <div className="mt-auto space-y-2">
              <DatePill label="Demarare:" value={cfg.startDate} />
              <DatePill label="Finalizare:" value={cfg.endDate} />
            </div>
          </div>
        </div>

        {/* Subsol */}
        <footer className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 pb-4 pt-2 sm:flex-nowrap sm:justify-between sm:px-7">
          <span className="flex items-center gap-2">
            <Braces items={[['{', 'blue'], ['}', 'green'], ['{', 'lime']]} />
            <span className="whitespace-nowrap text-sm font-bold sm:text-base" style={{ color: EU_BLUE }}>
              Împreună creștem satul românesc
            </span>
          </span>
          <span className="hidden min-w-0 overflow-hidden md:block">
            <Braces
              items={[
                ['}', 'red'],
                ['{', 'brown'],
                ['}', 'yellow'],
                ['{', 'orange'],
                ['}', 'blue'],
                ['{', 'green'],
                ['}', 'red'],
                ['{', 'brown'],
                ['}', 'yellow'],
              ]}
            />
          </span>
          <a
            href="https://www.afir.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold hover:underline sm:text-base"
            style={{ color: EU_BLUE }}
          >
            <Braces items={[['{', 'green']]} />
            www.afir.ro
            <Braces items={[['}', 'red'], ['{', 'blue']]} />
          </a>
        </footer>
      </article>

      {/* Anexa II B-(1) — descriere și scopuri (obligatorii pe site) */}
      <section className="space-y-3 rounded-xl bg-white p-4 text-sm leading-relaxed text-[#1a1a1a] shadow-xl shadow-black/20 sm:p-6">
        <p>{cfg.shortDescription}</p>
        <p>
          <span className="font-bold" style={{ color: EU_BLUE }}>
            Scopuri și rezultate:
          </span>{' '}
          {cfg.goalsAndResults}
        </p>
        <a
          href={cfg.feadrCommissionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold underline-offset-2 hover:underline"
          style={{ color: EU_BLUE }}
        >
          Informații FEADR — Comisia Europeană ↗
        </a>
      </section>
    </div>
  )
}
