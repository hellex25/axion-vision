import { useEffect } from 'react'
import { GA_MEASUREMENT_ID } from '~/lib/analytics'

/** Loads GA4 only when VITE_GA_MEASUREMENT_ID is set at build time. */
export function Analytics() {
  useEffect(() => {
    const id = GA_MEASUREMENT_ID
    if (!id) return

    window.dataLayer = window.dataLayer ?? []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', id, { anonymize_ip: true })

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(script)
  }, [])

  return null
}
