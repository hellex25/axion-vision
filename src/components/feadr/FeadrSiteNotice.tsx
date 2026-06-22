import {
  feadrFundingConfig as cfg,
  formatEurPlain,
} from '~/config/feadrFunding'

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-3">
      <dt className="shrink-0 text-xs font-bold text-[#1a3d8f] sm:text-sm">
        {label}
      </dt>
      <dd className="text-xs leading-relaxed text-[#1a1a1a] sm:text-sm">
        {value}
      </dd>
    </div>
  )
}

/** Panou finanțare PS 2027 — Anexa II B-(1), date complete + prezentare site. */
export function FeadrSiteNotice() {
  return (
    <article
      className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/20"
      style={{ fontFamily: 'Calibri, Arial, sans-serif' }}
      aria-label="Informații finanțare europeană"
    >
      {/* Header oficial — elemente placă Anexa II */}
      <header className="border-b border-[#d9e2ef] bg-gradient-to-r from-[#eef4fb] via-white to-[#eef4fb] px-4 py-5 sm:px-6">
        <div className="grid grid-cols-3 items-center gap-3 sm:gap-4">
          <div className="flex justify-start">
            <img
              src="/feadr/stema-romaniei.png"
              alt="Stema României"
              className="h-[64px] w-auto object-contain sm:h-[70px]"
            />
          </div>

          <div className="px-1 text-center">
            <img
              src="/feadr/ue-cofinantat.png"
              alt="Cofinanțat de Uniunea Europeană"
              className="mx-auto mb-2 h-auto max-h-[32px] w-auto max-w-[220px] object-contain sm:max-h-[36px]"
            />
            <p className="text-sm font-bold uppercase tracking-wide text-[#1a3d8f] sm:text-base">
              Planul Strategic PAC 2023 – 2027
            </p>
            <p className="mt-1.5 text-[10px] leading-snug text-[#333] sm:text-xs">
              Program cofinanțat de Uniunea Europeană prin Fondul European
              Agricol pentru Dezvoltare Rurală și de Guvernul României.
            </p>
          </div>

          <div className="flex justify-end">
            <img
              src="/feadr/madr.svg"
              alt="Ministerul Agriculturii și Dezvoltării Rurale"
              className="h-auto max-h-[48px] w-full max-w-[130px] object-contain sm:max-h-[52px] sm:max-w-[140px]"
            />
          </div>
        </div>
      </header>

      <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-7">
        {/* Intro C.1 + text obligatoriu placă */}
        <div className="space-y-3">
          <p className="text-base font-bold text-[#1a3d8f] sm:text-lg">
            Proiect realizat cu sprijinul fondurilor europene!
          </p>
          <p className="text-sm leading-relaxed text-[#1a1a1a]">
            <span className="font-bold">
              Proiect finanțat cu fonduri nerambursabile prin Planul Strategic
              PAC 2023 – 2027 (PS 2023 – 2027):
            </span>{' '}
            {cfg.projectName}
          </p>
        </div>

        {/* Date proiect */}
        <dl className="space-y-3 rounded-xl border border-[#d9e2ef] bg-[#f8fafc] p-4 sm:p-5">
          <Row label="Cod proiect:" value={cfg.projectCode} />
          <Row label="Județ:" value={cfg.county} />
          <Row label="Localitate:" value={cfg.locality} />
          <Row label="Beneficiar:" value={cfg.beneficiary} />
        </dl>

        {/* Valori financiare */}
        <div
          className="space-y-2 rounded-xl p-4 text-white sm:p-5"
          style={{ backgroundColor: '#1a3d8f' }}
        >
          <p className="text-sm sm:text-base">
            <span className="font-bold">Valoarea totală eligibilă:</span>{' '}
            {formatEurPlain(cfg.totalEligibleEur)}
          </p>
          <p className="text-sm sm:text-base">
            din care{' '}
            <span className="font-bold">Finanțare nerambursabilă PS 2023 – 2027:</span>{' '}
            {formatEurPlain(cfg.feadrFundingEur)}
          </p>
        </div>

        {/* Autoritate contractantă + LEADER */}
        <div className="space-y-4 rounded-xl border border-[#d9e2ef] p-4 sm:p-5">
          <p className="text-center text-sm font-bold text-[#1a3d8f]">
            Autoritatea contractantă:
          </p>
          <p className="text-center text-xs leading-relaxed text-[#333] sm:text-sm">
            {cfg.contractingAuthority}.
          </p>
          <img
            src="/feadr/afir_logotip.png"
            alt="AFIR"
            className="mx-auto h-auto max-h-[64px] w-full max-w-[320px] object-contain"
          />
          {cfg.isLeader && (
            <img
              src="/feadr/leader.webp"
              alt="LEADER — Dezvoltarea locală plasată sub responsabilitatea comunității"
              className="mx-auto h-auto max-h-[52px] w-full max-w-[280px] object-contain"
            />
          )}
        </div>

        {/* Proiectant / executant / perioadă */}
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-[#d9e2ef] bg-[#f8fafc] p-4">
            <Row label="Proiectant:" value={cfg.designer} />
            <Row label="Executant:" value={cfg.executor} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-lg p-3 text-center text-white"
              style={{ backgroundColor: '#1a3d8f' }}
            >
              <p className="text-[10px] font-bold uppercase sm:text-xs">
                Demarare
              </p>
              <p className="mt-1 text-sm font-semibold">{cfg.startDate}</p>
            </div>
            <div
              className="rounded-lg p-3 text-center text-white"
              style={{ backgroundColor: '#1a3d8f' }}
            >
              <p className="text-[10px] font-bold uppercase sm:text-xs">
                Finalizare
              </p>
              <p className="mt-1 text-sm font-semibold">{cfg.endDate}</p>
            </div>
          </div>
        </dl>

        {/* B-(1) — descriere și scopuri */}
        <div className="space-y-3 border-t border-[#d9e2ef] pt-5">
          <p className="text-sm leading-relaxed text-[#1a1a1a]">
            {cfg.shortDescription}
          </p>
          <p className="text-sm leading-relaxed text-[#1a1a1a]">
            <span className="font-bold text-[#1a3d8f]">
              Scopuri și rezultate:
            </span>{' '}
            {cfg.goalsAndResults}
          </p>
        </div>

        <a
          href={cfg.feadrCommissionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-bold text-[#1a3d8f] underline-offset-2 hover:underline"
        >
          Informații FEADR — Comisia Europeană ↗
        </a>
      </div>
    </article>
  )
}
