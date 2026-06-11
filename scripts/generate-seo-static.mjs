import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const siteUrl = (process.env.VITE_SITE_URL ?? 'https://axion-vision.workers.dev').replace(
  /\/$/,
  '',
)

const publicDir = join(process.cwd(), 'public')
mkdirSync(publicDir, { recursive: true })

writeFileSync(
  join(publicDir, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
)

writeFileSync(
  join(publicDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
)

console.log(`SEO static files generated for ${siteUrl}`)
