import { createFileRoute } from '@tanstack/react-router'
import { ServiceLandingPage } from '~/components/ServiceLandingPage'
import { portaluriWebPage } from '~/content/service-pages'
import { buildPageHead } from '~/lib/seo'

export const Route = createFileRoute('/servicii/portaluri-web')({
  head: () => buildPageHead('ro', portaluriWebPage.meta, portaluriWebPage.pathname),
  component: () => <ServiceLandingPage content={portaluriWebPage} />,
})
