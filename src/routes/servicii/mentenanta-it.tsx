import { createFileRoute } from '@tanstack/react-router'
import { ServiceLandingPage } from '~/components/ServiceLandingPage'
import { mentenantaItPage } from '~/content/service-pages'
import { buildPageHead } from '~/lib/seo'

export const Route = createFileRoute('/servicii/mentenanta-it')({
  head: () => buildPageHead('ro', mentenantaItPage.meta, mentenantaItPage.pathname),
  component: () => <ServiceLandingPage content={mentenantaItPage} />,
})
