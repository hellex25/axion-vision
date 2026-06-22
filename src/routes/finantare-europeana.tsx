import { Link, createFileRoute } from '@tanstack/react-router'
import { LanguageProvider } from '~/i18n/LanguageContext'
import { Navbar } from '~/components/sections/Navbar'
import { Footer } from '~/components/sections/Footer'
import { FeadrSiteNotice } from '~/components/feadr/FeadrSiteNotice'
import { feadrFundingConfig as cfg } from '~/config/feadrFunding'

export const Route = createFileRoute('/finantare-europeana')({
  head: () => ({
    meta: [
      {
        title: 'Finanțare europeană — Axion Vision SRL | Project Axion',
      },
      {
        name: 'description',
        content:
          'Informații privind finanțarea nerambursabilă prin Planul Strategic PAC 2023–2027 (PS 2023–2027).',
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
      <div className="relative min-h-screen bg-void">
        {/* Fundal estetic — aliniat cu site-ul */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-[#0a1424] to-void"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(56,189,248,0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(99,102,241,0.08), transparent), radial-gradient(ellipse 50% 30% at 0% 80%, rgba(56,189,248,0.06), transparent)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10">
          <Navbar />
          <main className="px-4 py-16 sm:px-6 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <Link
                to="/"
                className="mb-8 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-cyan"
              >
                ← Project Axion
              </Link>
              <FeadrSiteNotice />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  )
}
