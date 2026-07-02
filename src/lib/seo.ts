import type { Lang } from '~/i18n/translations'
import type { FaqItem } from '~/content/home-faq'
import { homeFaqRo } from '~/content/home-faq'
import {
  BUSINESS_ADDRESS,
  COMPANY_NAME,
  CONTACT_EMAIL,
  DEFAULT_LOCALE,
  LOCALE_EN,
  SITE_NAME,
  SITE_URL,
  canonicalUrl,
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

export interface ServiceSchemaInput {
  name: string
  description: string
  serviceType: string
  pathname: string
}

export function getSeoMeta(lang: Lang, meta: SeoMeta, pathname = '/') {
  const locale = lang === 'ro' ? DEFAULT_LOCALE : LOCALE_EN
  const ogImage = `${SITE_URL}/og-image.png`

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    canonical: canonicalUrl(pathname),
    ogImage,
    locale,
    ogTitle: meta.ogTitle,
    ogDescription: meta.ogDescription,
    twitterTitle: meta.twitterTitle,
    twitterDescription: meta.twitterDescription,
  }
}

export function buildRootHeadMeta(lang: Lang, meta: SeoMeta, pathname = '/') {
  const seo = getSeoMeta(lang, meta, pathname)

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

export function buildCommonHeadLinks() {
  return [
    { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
    { rel: 'icon', href: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    { rel: 'manifest', href: '/site.webmanifest' },
  ]
}

export function buildPageHeadLinks(pathname = '/') {
  const canonical = canonicalUrl(pathname)
  const links: Array<Record<string, string>> = [
    { rel: 'canonical', href: canonical },
  ]

  if (pathname === '/') {
    links.push(
      { rel: 'alternate', href: canonical, hrefLang: 'ro' },
      { rel: 'alternate', href: canonical, hrefLang: 'x-default' },
    )
  }

  return links
}

export function buildPageHead(lang: Lang, meta: SeoMeta, pathname: string) {
  return {
    meta: buildRootHeadMeta(lang, meta, pathname),
    links: [...buildCommonHeadLinks(), ...buildPageHeadLinks(pathname)],
  }
}

/** @deprecated Use buildPageHeadLinks — kept for SeoHead sync on homepage. */
export function buildRootHeadLinks(pathname = '/') {
  return [...buildCommonHeadLinks(), ...buildPageHeadLinks(pathname)]
}

function organizationBlock(lang: Lang, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-192.png`,
    image: `${SITE_URL}/og-image.png`,
    email: CONTACT_EMAIL,
    description,
    inLanguage: lang === 'ro' ? 'ro' : 'en',
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_ADDRESS.locality,
      addressRegion: BUSINESS_ADDRESS.region,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: CONTACT_EMAIL,
      availableLanguage: ['Romanian', 'English'],
      areaServed: 'RO',
    },
    knowsAbout: [
      'IT consultancy',
      'cloud infrastructure',
      'web development',
      'cybersecurity',
      'Supabase',
      'Cloudflare Workers',
    ],
  }
}

export function buildHomeJsonLd(lang: Lang, meta: SeoMeta, faq: FaqItem[] = homeFaqRo) {
  const description = meta.description

  return [
    organizationBlock(lang, description),
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
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  }
}

export function buildServiceJsonLd(input: ServiceSchemaInput) {
  const url = canonicalUrl(input.pathname)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: input.name,
      description: input.description,
      serviceType: input.serviceType,
      url,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: {
        '@type': 'Country',
        name: 'Romania',
      },
    },
    buildBreadcrumbJsonLd([
      { name: 'Acasă', path: '/' },
      { name: 'Servicii', path: '/#services' },
      { name: input.name, path: input.pathname },
    ]),
  ]
}

export function buildWebPageJsonLd(
  pathname: string,
  name: string,
  description: string,
) {
  const url = canonicalUrl(pathname)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'ro',
    },
    buildBreadcrumbJsonLd([
      { name: 'Acasă', path: '/' },
      { name, path: pathname },
    ]),
  ]
}

/** @deprecated Use buildHomeJsonLd — kept for syncDocumentMeta. */
export function buildJsonLd(lang: Lang, meta: SeoMeta) {
  return buildHomeJsonLd(lang, meta)
}

/** Client-side meta sync when language toggles after hydration (homepage only). */
export function syncDocumentMeta(lang: Lang, meta: SeoMeta, pathname = '/') {
  const seo = getSeoMeta(lang, meta, pathname)
  document.documentElement.lang = lang
  document.title = seo.title

  const setMeta = (
    attr: 'name' | 'property',
    key: string,
    content: string,
  ) => {
    let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, key)
      document.head.appendChild(el)
    }
    el.content = content
  }

  setMeta('name', 'description', seo.description)
  setMeta('name', 'keywords', seo.keywords)
  setMeta('property', 'og:title', seo.ogTitle)
  setMeta('property', 'og:description', seo.ogDescription)
  setMeta('property', 'og:url', seo.canonical)
  setMeta('property', 'og:locale', seo.locale)
  setMeta(
    'property',
    'og:locale:alternate',
    lang === 'ro' ? LOCALE_EN : DEFAULT_LOCALE,
  )
  setMeta('property', 'og:image', seo.ogImage)
  setMeta('name', 'twitter:title', seo.twitterTitle)
  setMeta('name', 'twitter:description', seo.twitterDescription)
  setMeta('name', 'twitter:image', seo.ogImage)

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = seo.canonical

  let jsonLd = document.getElementById('axion-jsonld')
  if (jsonLd) {
    jsonLd.textContent = JSON.stringify(buildHomeJsonLd(lang, meta))
  }
}
