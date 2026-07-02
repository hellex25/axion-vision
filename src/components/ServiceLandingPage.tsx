import { Link } from '@tanstack/react-router'
import { LanguageProvider } from '~/i18n/LanguageContext'
import { JsonLd } from '~/components/JsonLd'
import { Navbar } from '~/components/sections/Navbar'
import { Footer } from '~/components/sections/Footer'
import { GlowButton } from '~/components/ui/GlowButton'
import type { ServicePageContent } from '~/content/service-pages'
import { getRelatedServices } from '~/content/service-pages'
import { buildServiceJsonLd } from '~/lib/seo'
import { homeSectionHash } from '~/lib/site'

interface ServiceLandingPageProps {
  content: ServicePageContent
}

export function ServiceLandingPage({ content }: ServiceLandingPageProps) {
  const related = getRelatedServices(content.pathname)
  const jsonLd = buildServiceJsonLd({
    name: content.schemaName,
    description: content.meta.description,
    serviceType: content.schemaServiceType,
    pathname: content.pathname,
  })

  return (
    <LanguageProvider>
      <JsonLd data={jsonLd} />
      <div className="relative min-h-screen bg-void">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-[#0a1424] to-void"
        />
        <div className="relative z-10">
          <Navbar />
          <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
            <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-dim">
              <Link to="/" className="transition-colors hover:text-cyan">
                Acasă
              </Link>
              <span className="mx-2 text-hairline">/</span>
              <a
                href={homeSectionHash('services')}
                className="transition-colors hover:text-cyan"
              >
                Servicii
              </a>
              <span className="mx-2 text-hairline">/</span>
              <span className="text-muted">{content.schemaName}</span>
            </nav>

            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {content.h1}
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
              {content.intro}
            </p>

            {content.sections.map((section) => (
              <section key={section.title} className="mt-12">
                <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-pretty leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="mt-12 rounded-2xl border border-hairline bg-panel/40 p-7 sm:p-9">
              <h2 className="text-xl font-semibold text-ink">
                {content.deliverablesTitle}
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {content.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-semibold text-ink">
                {content.audienceTitle}
              </h2>
              <ul className="mt-4 flex flex-col gap-2">
                {content.audience.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-purple/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {related.length > 0 && (
              <section className="mt-12 border-t border-hairline pt-10">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-dim">
                  Alte servicii
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {related.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-cyan transition-colors hover:text-ink"
                      >
                        {item.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-16 rounded-2xl border border-cyan/20 bg-cyan/5 p-7 text-center sm:p-10">
              <h2 className="text-2xl font-semibold text-ink">
                {content.ctaTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-pretty text-muted">
                {content.ctaBody}
              </p>
              <div className="mt-6 flex justify-center">
                <GlowButton href={homeSectionHash('contact')}>
                  Solicită o ofertă gratuită
                </GlowButton>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  )
}
