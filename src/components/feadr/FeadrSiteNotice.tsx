import {
  feadrFundingConfig as cfg,
  formatEurPlain,
} from '~/config/feadrFunding'

const EU_BLUE = '#003399'
const EU_BLUE_LIGHT = '#a9bce6'

/** Bandă cu motiv tradițional (romb) — sus pe placă. */
function MotifBand() {
  return (
    <svg aria-hidden className="block h-5 w-full sm:h-6" preserveAspectRatio="none">
      <defs>
        <pattern id="feadr-motif" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M12 2 L22 12 L12 22 L2 12 Z M12 7 L17 12 L12 17 L7 12 Z"
            fill="none"
            stroke={EU_BLUE_LIGHT}
            strokeWidth="1.6"
          />
          <rect x="10.5" y="10.5" width="3" height="3" fill={EU_BLUE_LIGHT} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#feadr-motif)" />
    </svg>
  )
}

/** Motive colorate din subsolul plăcii AFIR. */
function ColorMotifs({ count = 5 }: { count?: number }) {
  const colors = ['#e2342b', '#f4a71d', '#003399', '#2b9f48', '#1e6fb8', '#8a4b2a']
  return (
    <span aria-hidden className="inline-flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 sm:h-5 sm:w-5">
          <path
            d="M10 1 L13 4 L16 4 L16 7 L19 10 L16 13 L16 16 L13 16 L10 19 L7 16 L4 16 L4 13 L1 10 L4 7 L4 4 L7 4 Z M10 6 L6 10 L10 14 L14 10 Z"
            fill={colors[i % colors.length]}
            fillRule="evenodd"
          />
        </svg>
      ))}
    </span>
  )
}

/** Sigla oficială a Guvernului României. */
function GovSeal() {
  return (
    <img
      src="/feadr/guvernul-romaniei.png"
      alt="Guvernul României"
      className="h-[76px] w-[76px] shrink-0 object-contain sm:h-[96px] sm:w-[96px]"
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
        <header className="flex items-center gap-3 px-4 pb-3 pt-4 sm:gap-5 sm:px-7 sm:pt-5">
          <GovSeal />
          <div className="min-w-0 flex-1 text-center">
            <h2
              className="text-base font-extrabold uppercase leading-tight sm:text-2xl"
              style={{ color: EU_BLUE }}
            >
              Planul Strategic PAC 2023 - 2027
            </h2>
            <div className="mx-auto my-1.5 h-px w-4/5" style={{ backgroundColor: EU_BLUE_LIGHT }} />
            <p className="text-[10px] font-semibold leading-snug sm:text-sm" style={{ color: EU_BLUE }}>
              Program cofinanțat de Uniunea Europeană prin Fondul European Agricol
              pentru Dezvoltare Rurală și de Guvernul României.
            </p>
          </div>
          <img
            src="/feadr/ue-cofinantat.png"
            alt="Cofinanțat de Uniunea Europeană"
            className="hidden h-auto w-[130px] shrink-0 object-contain sm:block sm:w-[150px]"
          />
        </header>
        <img
          src="/feadr/ue-cofinantat.png"
          alt="Cofinanțat de Uniunea Europeană"
          className="mx-auto mb-2 h-auto w-[150px] object-contain sm:hidden"
        />

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
              <div className="grid grid-cols-[auto_1fr] gap-3 sm:grid-cols-[0.8fr_1.2fr]">
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
        <footer
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t px-4 py-3 sm:justify-between sm:px-7"
          style={{ borderColor: EU_BLUE_LIGHT }}
        >
          <span className="flex items-center gap-2">
            <ColorMotifs count={2} />
            <span className="text-xs font-bold sm:text-sm" style={{ color: EU_BLUE }}>
              Împreună creștem satul românesc
            </span>
          </span>
          <span className="hidden sm:inline">
            <ColorMotifs count={6} />
          </span>
          <a
            href="https://www.afir.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold hover:underline sm:text-sm"
            style={{ color: EU_BLUE }}
          >
            www.afir.ro
            <ColorMotifs count={2} />
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
