import seoRoutes from '~/config/seo-routes.json'

/** Canonical site URL — override with VITE_SITE_URL at build time. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'https://projectaxion.ro'
).replace(/\/$/, '')

export const SITE_NAME = 'Project Axion'
export const COMPANY_NAME = 'Axion Vision SRL'
export const CONTACT_EMAIL = 'daviddricu@gmail.com'
export const DEFAULT_LOCALE = 'ro_RO'
export const LOCALE_EN = 'en_US'

/** Public NAP — keep identical across footer, schema, and Google Business Profile. */
export const BUSINESS_ADDRESS = {
  locality: 'Vârvoru de Jos',
  region: 'Dolj',
  postalCode: '207510',
  country: 'RO',
} as const

export const SERVICE_ROUTES = {
  consultantaIt: '/servicii/consultanta-it',
  portaluriWeb: '/servicii/portaluri-web',
  mentenantaIt: '/servicii/mentenanta-it',
} as const

export type SeoRoute = {
  path: string
  changefreq: string
  priority: string
}

export const SEO_ROUTES = seoRoutes as SeoRoute[]

/** Anchor pe homepage — evită /ruta-curenta#sectiune pe pagini secundare. */
export function homeSectionHash(section: string) {
  return `/#${section}`
}

export function canonicalUrl(pathname: string) {
  if (pathname === '/') return SITE_URL
  return `${SITE_URL}${pathname}`
}
