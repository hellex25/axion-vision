import { createFileRoute } from '@tanstack/react-router'
import { ServiceLandingPage } from '~/components/ServiceLandingPage'
import { consultantaItPage } from '~/content/service-pages'
import { buildPageHead } from '~/lib/seo'

export const Route = createFileRoute('/servicii/consultanta-it')({
  head: () => buildPageHead('ro', consultantaItPage.meta, consultantaItPage.pathname),
  component: () => <ServiceLandingPage content={consultantaItPage} />,
})
