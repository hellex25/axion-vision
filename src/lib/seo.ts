import type { Lang } from '~/i18n/translations'
import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  DEFAULT_LOCALE,
  LOCALE_EN,
  SITE_NAME,
  SITE_URL,
} from '~/lib/site'

export interface SeoMeta {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  twitterTitle: string
  twitterDescription: string
}

export function getSeoMeta(lang: Lang, meta: SeoMeta) {
  const locale = lang === 'ro' ? DEFAULT_LOCALE : LOCALE_EN
  const ogImage = `${SITE_URL}/og-image.png`

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    canonical: SITE_URL,
    ogImage,
    locale,
    ogTitle: meta.ogTitle,
    ogDescription: meta.ogDescription,
    twitterTitle: meta.twitterTitle,
    twitterDescription: meta.twitterDescription,
  }
}

export function buildRootHeadMeta(lang: Lang, meta: SeoMeta) {
  const seo = getSeoMeta(lang, meta)

  return [
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { title: seo.title },
    { name: 'description', content: seo.description },
    { name: 'keywords', content: seo.keywords },
    { name: 'author', content: COMPANY_NAME },
    { name: 'creator', content: COMPANY_NAME },
    { name: 'publisher', content: COMPANY_NAME },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'theme-color', content: '#050506' },
    { name: 'color-scheme', content: 'dark' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:url', content: seo.canonical },
    { property: 'og:locale', content: seo.locale },
    {
      property: 'og:locale:alternate',
      content: lang === 'ro' ? LOCALE_EN : DEFAULT_LOCALE,
    },
    { property: 'og:title', content: seo.ogTitle },
    { property: 'og:description', content: seo.ogDescription },
    { property: 'og:image', content: seo.ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: seo.ogTitle },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seo.twitterTitle },
    { name: 'twitter:description', content: seo.twitterDescription },
    { name: 'twitter:image', content: seo.ogImage },
    { name: 'twitter:image:alt', content: seo.ogTitle },
  ]
}

export function buildRootHeadLinks() {
  return [
    { rel: 'canonical', href: SITE_URL },
    { rel: 'alternate', href: SITE_URL, hrefLang: 'ro' },
    { rel: 'alternate', href: SITE_URL, hrefLang: 'en' },
    { rel: 'alternate', href: SITE_URL, hrefLang: 'x-default' },
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'icon', href: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ]
}

export function buildJsonLd(lang: Lang, meta: SeoMeta) {
  const description = meta.description

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: COMPANY_NAME,
      alternateName: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon-512.png`,
      image: `${SITE_URL}/og-image.png`,
      email: CONTACT_EMAIL,
      description,
      inLanguage: lang === 'ro' ? 'ro' : 'en',
      knowsAbout: [
        'IT consultancy',
        'cloud infrastructure',
        'web development',
        'cybersecurity',
        'Supabase',
        'Cloudflare Workers',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: ['ro', 'en'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: `${COMPANY_NAME} — ${SITE_NAME}`,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      email: CONTACT_EMAIL,
      description,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: {
        '@type': 'Country',
        name: 'Romania',
      },
      serviceType: [
        lang === 'ro'
          ? 'Consultanță în tehnologia informației'
          : 'Information technology consulting',
        lang === 'ro' ? 'Dezvoltare web' : 'Web development',
        lang === 'ro'
          ? 'Management infrastructură cloud'
          : 'Cloud infrastructure management',
        lang === 'ro'
          ? 'Securitate cibernetică'
          : 'Cybersecurity consulting',
      ],
    },
  ]
}

/** Client-side meta sync when language toggles after hydration. */
export function syncDocumentMeta(lang: Lang, meta: SeoMeta) {
  const seo = getSeoMeta(lang, meta)
  document.documentElement.lang = lang
  document.title = seo.title

  const setMeta = (
    selector: string,
    attr: 'name' | 'property',
    key: string,
    content: string,
  ) => {
    let el = document.querySelector<HTMLMetaElement>(
      `meta[${attr}="${key}"]`,
    )
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, key)
      document.head.appendChild(el)
    }
    el.content = content
  }

  setMeta('', 'name', 'description', seo.description)
  setMeta('', 'name', 'keywords', seo.keywords)
  setMeta('', 'property', 'og:title', seo.ogTitle)
  setMeta('', 'property', 'og:description', seo.ogDescription)
  setMeta('', 'property', 'og:locale', seo.locale)
  setMeta(
    '',
    'property',
    'og:locale:alternate',
    lang === 'ro' ? LOCALE_EN : DEFAULT_LOCALE,
  )
  setMeta('', 'property', 'og:image', seo.ogImage)
  setMeta('', 'name', 'twitter:title', seo.twitterTitle)
  setMeta('', 'name', 'twitter:description', seo.twitterDescription)
  setMeta('', 'name', 'twitter:image', seo.ogImage)

  let jsonLd = document.getElementById('axion-jsonld')
  if (jsonLd) {
    jsonLd.textContent = JSON.stringify(buildJsonLd(lang, meta))
  }
}
