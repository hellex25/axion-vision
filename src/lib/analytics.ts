declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** Google tag (GA4 / Google Ads). Public ID; override with VITE_GA_MEASUREMENT_ID. */
export const GA_MEASUREMENT_ID: string =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || 'G-4MHKFNQ7P9'

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return
  window.gtag('event', name, params)
}
