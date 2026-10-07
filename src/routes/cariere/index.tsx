import { Link, createFileRoute } from '@tanstack/react-router'
import { LanguageProvider } from '~/i18n/LanguageContext'
import { JsonLd } from '~/components/JsonLd'
import { CareersShell, JOB_TAGS } from '~/components/JobPostingPage'
import { JOB_PAGES } from '~/content/job-pages'
import type { SeoMeta } from '~/lib/seo'
import { buildPageHead, buildWebPageJsonLd } from '~/lib/seo'
import { CAREERS_PATH } from '~/lib/site'

const careersMeta: SeoMeta = {
  title: 'Cariere — Locuri de muncă la Axion Vision SRL | Project Axion',
  description:
    'Posturi deschise la Axion Vision SRL, Vârvoru de Jos, Dolj: CIM permanent, normă întreagă, instruire la locul de muncă. Aplică online.',
  keywords:
    'locuri de muncă Vârvoru de Jos, angajare Dolj, cariere IT, Axion Vision, GAL',
  ogTitle: 'Cariere — Axion Vision SRL',
  ogDescription:
    'Posturi permanente cu normă întreagă într-o firmă IT locală din Vârvoru de Jos, Dolj.',
  twitterTitle: 'Cariere | Axion Vision',
  twitterDescription: 'Posturi deschise în Vârvoru de Jos, Dolj. Aplică online.',
}

export const Route = createFileRoute('/cariere/')({
  head: () => buildPageHead('ro', careersMeta, CAREERS_PATH),
  component: CareersPage,
})

function CareersPage() {
  return (
    <LanguageProvider>
      <JsonLd data={buildWebPageJsonLd(CAREERS_PATH, 'Cariere', careersMeta.description)} />
      <CareersShell>
        <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-dim">
          <Link to="/" className="transition-colors hover:text-cyan">
            Acasă
          </Link>
          <span className="mx-2 text-hairline">/</span>
          <span className="text-muted">Cariere</span>
        </nav>

        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Cariere la Axion Vision
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
          Angajăm în Vârvoru de Jos, județul Dolj. Toate posturile sunt permanente, cu
          normă întreagă și instruire la locul de muncă.
        </p>

        <ul className="mt-12 flex flex-col gap-5">
          {JOB_PAGES.map((job) => (
            <li key={job.pathname}>
              <Link
                to={job.pathname}
                className="group block rounded-2xl border border-hairline bg-panel/40 p-7 transition-colors hover:border-cyan/40"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-cyan">
                  COR {job.corCode}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-ink">{job.jobTitle}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {JOB_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-hairline px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-block text-sm text-cyan transition-colors group-hover:text-ink">
                  Vezi anunțul și aplică →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CareersShell>
    </LanguageProvider>
  )
}
