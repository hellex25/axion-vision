import { useEffect } from 'react'
import { useI18n } from '~/i18n/LanguageContext'
import { syncDocumentMeta } from '~/lib/seo'

/** Keeps document meta + JSON-LD in sync with the active language. */
export function SeoHead() {
  const { lang, t } = useI18n()

  useEffect(() => {
    syncDocumentMeta(lang, t.meta)
  }, [lang, t.meta])

  return null
}
