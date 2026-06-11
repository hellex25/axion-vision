/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '../styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Project Axion — Ecosisteme digitale de înaltă performanță',
      },
      {
        name: 'description',
        content:
          'Project Axion fuzionează inginerie web de elită, infrastructură cloud suverană și fluxuri de lucru autonome. Lansăm motoare software hiper-scalabile.',
      },
      { name: 'theme-color', content: '#050506' },
      {
        property: 'og:title',
        content: 'Project Axion — Ecosisteme digitale de înaltă performanță',
      },
      {
        property: 'og:description',
        content:
          'Inginerie web de elită, infrastructură cloud suverană și fluxuri de lucru autonome — Axion Vision SRL.',
      },
      { property: 'og:type', content: 'website' },
    ],
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
  return (
    <html lang="ro" className="grain">
      <head>
        <HeadContent />
      </head>
      <body className="bg-void text-ink antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
