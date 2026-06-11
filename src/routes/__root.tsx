/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { translations } from '~/i18n/translations'
import { buildRootHeadLinks, buildRootHeadMeta, buildJsonLd } from '~/lib/seo'
import appCss from '../styles/app.css?url'

const defaultMeta = translations.ro.meta

export const Route = createRootRoute({
  head: () => ({
    meta: buildRootHeadMeta('ro', defaultMeta),
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap',
      },
      ...buildRootHeadLinks(),
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  const jsonLd = buildJsonLd('ro', defaultMeta)

  return (
    <html lang="ro" className="grain">
      <head>
        <HeadContent />
        <script
          id="axion-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-void text-ink antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
