import { createFileRoute } from '@tanstack/react-router'
import { JobPostingPage } from '~/components/JobPostingPage'
import { asistentOperationalPage } from '~/content/job-pages'
import { buildPageHead } from '~/lib/seo'

export const Route = createFileRoute('/cariere/asistent-operational')({
  head: () =>
    buildPageHead('ro', asistentOperationalPage.meta, asistentOperationalPage.pathname),
  component: () => <JobPostingPage content={asistentOperationalPage} />,
})
