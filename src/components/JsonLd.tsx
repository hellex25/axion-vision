/** Injects JSON-LD during SSR and client render. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      id="axion-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
