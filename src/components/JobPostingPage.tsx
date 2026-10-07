import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { LanguageProvider } from '~/i18n/LanguageContext'
import { JsonLd } from '~/components/JsonLd'
import { JobApplicationForm } from '~/components/JobApplicationForm'
import { Navbar } from '~/components/sections/Navbar'
import { Footer } from '~/components/sections/Footer'
import type { JobPageContent } from '~/content/job-pages'
import { buildJobPostingJsonLd } from '~/lib/seo'
import { CAREERS_PATH } from '~/lib/site'

/** Fundal + Navbar/Footer comune paginilor de cariere. */
export function CareersShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-void">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-[#0a1424] to-void"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(56,189,248,0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(99,102,241,0.08), transparent)',
        }}
      />
      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export const JOB_TAGS = [
  'CIM permanent',
  'Normă întreagă (40h/săpt.)',
  'Vârvoru de Jos, Dolj',
]

interface JobPostingPageProps {
  content: JobPageContent
}

export function JobPostingPage({ content }: JobPostingPageProps) {
  const jsonLd = buildJobPostingJsonLd({
    pathname: content.pathname,
    title: content.jobTitle,
    description: content.meta.description,
    datePosted: content.datePosted,
    corCode: content.corCode,
    employmentType: content.employmentType,
  })

  return (
    <LanguageProvider>
      <JsonLd data={jsonLd} />
      <CareersShell>
        <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-dim">
          <Link to="/" className="transition-colors hover:text-cyan">
            Acasă
          </Link>
          <span className="mx-2 text-hairline">/</span>
          <Link to={CAREERS_PATH} className="transition-colors hover:text-cyan">
            Cariere
          </Link>
          <span className="mx-2 text-hairline">/</span>
          <span className="text-muted">{content.jobTitle}</span>
        </nav>

        <p className="font-mono text-xs uppercase tracking-wider text-cyan">
          Angajare · COR {content.corCode}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {content.h1}
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
          {content.intro}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {JOB_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-hairline bg-panel/40 px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

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
            {content.responsibilitiesTitle}
          </h2>
          <ul className="mt-4 grid gap-2">
            {content.responsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan/70" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">{content.requirementsTitle}</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {content.requirements.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-purple/70" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-2xl border border-hairline bg-panel/40 p-7 sm:p-9">
          <h2 className="text-xl font-semibold text-ink">{content.offersTitle}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {content.offers.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal/70" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-xl border border-cyan/20 bg-cyan/5 px-5 py-4">
          <p className="text-sm leading-relaxed text-muted">{content.priorityNote}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-ink">{content.processTitle}</h2>
          <ol className="mt-4 flex flex-col gap-3">
            {content.processSteps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm text-muted">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-hairline font-mono text-xs text-cyan">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 text-sm text-muted">
          <p>
            Contact alternativ:{' '}
            <a href={`tel:${content.contactPhone}`} className="text-cyan hover:underline">
              {content.contactPhone}
            </a>
            {' · '}
            <a href={`mailto:${content.contactEmail}`} className="text-cyan hover:underline">
              {content.contactEmail}
            </a>
          </p>
        </section>

        <section id="aplica" className="mt-16 scroll-mt-28">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Aplică pentru acest post
          </h2>
          <p className="mt-3 text-muted">
            Completează formularul de mai jos. Vei fi contactat(ă) dacă profilul tău
            corespunde cerințelor postului.
          </p>
          <div className="mt-8">
            <JobApplicationForm jobTitle={content.jobTitle} />
          </div>
        </section>
      </CareersShell>
    </LanguageProvider>
  )
}
