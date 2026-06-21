import { Link } from '@tanstack/react-router'
import {
  feadrFundingConfig as cfg,
  formatEur,
} from '~/config/feadrFunding'

/** Casetă informativă PS 2027 — Anexa II AFIR, secțiunea B-(1). */
export function EuFundingNotice() {
  if (!cfg.showNotice) return null

  return (
    <aside
      aria-label="Informații finanțare europeană"
      className="border-b border-hairline bg-panel/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div
          className="overflow-hidden rounded-lg border border-[#d9e2ef] bg-white text-[#1a1a1a] shadow-sm"
          style={{ fontFamily: 'Calibri, "Segoe UI", sans-serif' }}
        >
          {/* Header oficial */}
          <div className="grid gap-3 border-b border-[#d9e2ef] bg-[#f8fafc] p-3 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-4 sm:p-4">
            <div className="flex items-center gap-2">
              <img
                src="/feadr/eu-flag.svg"
                alt=""
                width={48}
                height={32}
                className="h-8 w-auto rounded-sm border border-[#d9e2ef]"
              />
              <span className="text-[11px] font-semibold leading-tight text-[#003399] sm:text-xs">
                Cofinanțat de Uniunea Europeană
              </span>
            </div>

            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#003399] sm:text-xs">
                Planul Strategic PAC 2023 – 2027
              </p>
              <p className="mt-1 text-[10px] leading-snug text-[#1a1a1a] sm:text-[11px]">
                Program cofinanțat de Uniunea Europeană prin Fondul European
                Agricol pentru Dezvoltare Rurală și de Guvernul României.
              </p>
            </div>

            <p className="text-right text-[10px] leading-snug text-[#555] sm:text-[11px]">
              Autoritatea contractantă:
              <br />
              <span className="font-semibold text-[#1a1a1a]">AFIR</span>
              <span className="block">MADR</span>
              {cfg.isLeader && (
                <span className="mt-1 block font-semibold text-[#1a1a1a]">
                  LEADER
                </span>
              )}
            </p>
          </div>

          {/* Conținut proiect — compact */}
          <div className="grid gap-3 p-3 text-[11px] leading-snug sm:grid-cols-2 sm:gap-4 sm:p-4 sm:text-xs">
            <div className="space-y-1.5">
              <p>
                <span className="font-bold">
                  Proiect finanțat cu fonduri nerambursabile prin Planul
                  Strategic PAC 2023 – 2027 (PS 2023 – 2027):
                </span>{' '}
                {cfg.projectName}
              </p>
              <p>
                <span className="font-bold">Cod proiect:</span> {cfg.projectCode}
              </p>
              <p>
                <span className="font-bold">Județ:</span> {cfg.county}
                {' · '}
                <span className="font-bold">Localitate:</span> {cfg.locality}
              </p>
              <p>
                <span className="font-bold">Beneficiar:</span> {cfg.beneficiary}
              </p>
              {cfg.isLeader && (
                <p>
                  <span className="font-bold">GAL (LEADER):</span> {cfg.galName}
                </p>
              )}
            </div>

            <div className="space-y-1.5 rounded-md bg-[#eef4fb] p-3 text-[#003399]">
              <p className="text-[#1a1a1a]">
                <span className="font-bold">Valoarea totală eligibilă:</span>{' '}
                {formatEur(cfg.totalEligibleEur)}
              </p>
              <p className="text-[#1a1a1a]">
                din care{' '}
                <span className="font-bold">
                  Finanțare nerambursabilă PS 2023 – 2027:
                </span>{' '}
                {formatEur(cfg.feadrFundingEur)}
              </p>
              <p className="text-[10px] text-[#1a1a1a] sm:text-[11px]">
                {cfg.shortDescription}
              </p>
              <p className="text-[10px] text-[#555] sm:text-[11px]">
                Contract {cfg.contractNumber}
              </p>
            </div>
          </div>

          {/* Footer linkuri */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#d9e2ef] bg-[#f8fafc] px-3 py-2 sm:px-4">
            <a
              href={cfg.feadrCommissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold text-[#003399] underline-offset-2 hover:underline sm:text-[11px]"
            >
              Informații FEADR — Comisia Europeană ↗
            </a>
            <Link
              to="/finantare-europeana"
              className="text-[10px] font-semibold text-[#003399] underline-offset-2 hover:underline sm:text-[11px]"
            >
              Detalii finanțare →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
