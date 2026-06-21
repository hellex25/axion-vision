import { Link, createFileRoute } from '@tanstack/react-router'
import { LanguageProvider } from '~/i18n/LanguageContext'
import { Navbar } from '~/components/sections/Navbar'
import { Footer } from '~/components/sections/Footer'
import {
  feadrFundingConfig as cfg,
  formatEur,
  formatRon,
} from '~/config/feadrFunding'

export const Route = createFileRoute('/finantare-europeana')({
  head: () => ({
    meta: [
      {
        title: 'Finanțare europeană — Axion Vision SRL | Project Axion',
      },
      {
        name: 'description',
        content:
          'Informații privind finanțarea nerambursabilă prin Planul Strategic PAC 2023–2027 (PS 2023–2027), Contract C 36010806109241703226.',
      },
      { name: 'robots', content: 'index, follow' },
    ],
  }),
  component: FeadrFundingPage,
})

function FeadrFundingPage() {
  if (!cfg.showNotice) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-void">
          <Navbar />
          <main className="mx-auto max-w-3xl px-6 py-24 text-center">
            <p className="text-muted">Pagina nu este disponibilă.</p>
            <Link to="/" className="mt-4 inline-block text-cyan hover:underline">
              ← Înapoi acasă
            </Link>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    )
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-void">
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <Link
            to="/"
            className="mb-8 inline-block text-sm text-muted transition-colors hover:text-cyan"
          >
            ← Project Axion
          </Link>

          <article
            className="overflow-hidden rounded-2xl border border-[#d9e2ef] bg-white text-[#1a1a1a] shadow-lg"
            style={{ fontFamily: 'Calibri, "Segoe UI", sans-serif' }}
          >
            <header className="border-b border-[#d9e2ef] bg-[#eef4fb] p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <img
                  src="/feadr/eu-flag.svg"
                  alt=""
                  width={72}
                  height={48}
                  className="rounded border border-[#d9e2ef]"
                />
                <div className="flex-1 text-center">
                  <p className="text-sm font-bold uppercase text-[#003399]">
                    Planul Strategic PAC 2023 – 2027
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">
                    Program cofinanțat de Uniunea Europeană prin Fondul
                    European Agricol pentru Dezvoltare Rurală și de Guvernul
                    României.
                  </p>
                </div>
                <p className="text-right text-xs leading-relaxed text-[#555]">
                  Cofinanțat de Uniunea Europeană
                </p>
              </div>
            </header>

            <div className="space-y-6 p-6 sm:p-8">
              <section className="space-y-3 text-sm leading-relaxed">
                <h1 className="text-xl font-bold text-[#003399]">
                  Transparență finanțare europeană
                </h1>
                <p className="text-[#555]">
                  Contract de finanțare nr. {cfg.contractNumber} · Cerere{' '}
                  {cfg.fundingRequestNumber}
                </p>
                <p>
                  <strong>
                    Proiect finanțat cu fonduri nerambursabile prin Planul
                    Strategic PAC 2023 – 2027 (PS 2023 – 2027):
                  </strong>{' '}
                  {cfg.projectName}
                </p>
                <p>
                  <strong>Cod proiect:</strong> {cfg.projectCode} · Nr. proiect{' '}
                  {cfg.projectNumber}
                </p>
                <p>
                  <strong>Intervenție:</strong> {cfg.intervention}
                </p>
                <p>
                  <strong>Județ:</strong> {cfg.county} ·{' '}
                  <strong>Localitate:</strong> {cfg.locality}
                </p>
                <p>
                  <strong>Loc implementare:</strong> {cfg.implementationAddress}
                </p>
              </section>

              <section className="space-y-2 text-sm leading-relaxed">
                <h2 className="font-bold text-[#003399]">Beneficiar</h2>
                <p>
                  <strong>{cfg.beneficiaryFullName}</strong> (CUI {cfg.cui})
                </p>
                <p>
                  <strong>Reprezentant legal:</strong>{' '}
                  {cfg.legalRepresentative}
                </p>
                <p>
                  <strong>CAEN:</strong> {cfg.caenCodes.join(', ')}
                </p>
                {cfg.contactEmail && (
                  <p>
                    <strong>Contact proiect:</strong>{' '}
                    <a
                      href={`mailto:${cfg.contactEmail}`}
                      className="text-[#003399] underline-offset-2 hover:underline"
                    >
                      {cfg.contactEmail}
                    </a>
                    {cfg.contactPhone ? ` · ${cfg.contactPhone}` : ''}
                  </p>
                )}
              </section>

              {cfg.isLeader && (
                <section className="space-y-2 text-sm leading-relaxed">
                  <h2 className="font-bold text-[#003399]">LEADER / GAL</h2>
                  <p>
                    <strong>GAL:</strong> {cfg.galName}
                  </p>
                  <p>
                    <strong>SDL:</strong> {cfg.galSdlCode}
                  </p>
                  <p>
                    <strong>Apel:</strong> {cfg.callTitle}
                  </p>
                </section>
              )}

              <section className="rounded-lg bg-[#eef4fb] p-5 text-sm leading-relaxed">
                <p>
                  <strong>Valoarea totală eligibilă a proiectului:</strong>{' '}
                  {formatEur(cfg.totalEligibleEur)} (
                  {formatRon(cfg.totalEligibleRon)})
                </p>
                <p className="mt-2">
                  din care{' '}
                  <strong>Finanțare nerambursabilă PS 2023 – 2027:</strong>{' '}
                  {formatEur(cfg.feadrFundingEur)} (
                  {formatRon(cfg.feadrFundingRon)}) — intensitate{' '}
                  {cfg.fundingPercent}%
                </p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-[#555]">
                  {cfg.tranches.map((t) => (
                    <li key={t.label}>
                      {t.label}: {formatEur(t.eur)} ({formatRon(t.ron)})
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p>
                    <strong>Proiectant:</strong> {cfg.designer}
                  </p>
                  <p className="mt-1">
                    <strong>Executant:</strong> {cfg.executor}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Demarare (estimativ):</strong> {cfg.startDate}
                  </p>
                  <p className="mt-1">
                    <strong>Finalizare (max. 36 luni):</strong> {cfg.endDate}
                  </p>
                </div>
              </section>

              <section className="space-y-3 text-sm leading-relaxed">
                <h2 className="font-bold text-[#003399]">
                  Descrierea operațiunii
                </h2>
                <p>{cfg.shortDescription}</p>
                <h2 className="font-bold text-[#003399]">
                  Scopuri și rezultate
                </h2>
                <p>{cfg.goalsAndResults}</p>
              </section>

              <section className="space-y-2 border-t border-[#d9e2ef] pt-6 text-sm">
                <p>
                  <strong>Autoritatea contractantă:</strong>{' '}
                  {cfg.contractingAuthority}.
                </p>
                <p className="text-[#555]">{cfg.crfir}.</p>
                <p className="text-[#555]">
                  PS 2023 – 2027 este finanțat de Uniunea Europeană și
                  Guvernul României prin Fondul european agricol pentru
                  dezvoltare rurală (FEADR).
                </p>
                <a
                  href={cfg.feadrCommissionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block pt-2 font-semibold text-[#003399] underline-offset-2 hover:underline"
                >
                  Site-ul Comisiei Europene — Dezvoltare rurală (FEADR) ↗
                </a>
                {' · '}
                <a
                  href="https://www.afir.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block pt-2 font-semibold text-[#003399] underline-offset-2 hover:underline"
                >
                  AFIR ↗
                </a>
              </section>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
