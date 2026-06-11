/** Canonical site URL — override with VITE_SITE_URL at build time. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'https://axion-vision.workers.dev'
).replace(/\/$/, '')

export const SITE_NAME = 'Project Axion'
export const COMPANY_NAME = 'Axion Vision SRL'
export const CONTACT_EMAIL = 'daviddricu@gmail.com'
export const DEFAULT_LOCALE = 'ro_RO'
export const LOCALE_EN = 'en_US'
