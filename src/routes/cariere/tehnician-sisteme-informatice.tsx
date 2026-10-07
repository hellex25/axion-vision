import { createFileRoute } from '@tanstack/react-router'
import { JobPostingPage } from '~/components/JobPostingPage'
import { tehnicianSistemeInformaticePage } from '~/content/job-pages'
import { buildPageHead } from '~/lib/seo'

export const Route = createFileRoute('/cariere/tehnician-sisteme-informatice')({
  head: () =>
    buildPageHead(
      'ro',
      tehnicianSistemeInformaticePage.meta,
      tehnicianSistemeInformaticePage.pathname,
    ),
  component: () => <JobPostingPage content={tehnicianSistemeInformaticePage} />,
})
