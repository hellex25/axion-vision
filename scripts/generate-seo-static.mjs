import { join } from 'node:path'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import sharp from 'sharp'

const siteUrl = (process.env.VITE_SITE_URL ?? 'https://projectaxion.ro').replace(
  /\/$/,
  '',
)
const publicDir = join(process.cwd(), 'public')
mkdirSync(publicDir, { recursive: true })

const routes = JSON.parse(
  readFileSync(join(process.cwd(), 'src/config/seo-routes.json'), 'utf8'),
)

const lastmod = new Date().toISOString().slice(0, 10)

writeFileSync(
  join(publicDir, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
)

const urlEntries = routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')

writeFileSync(
  join(publicDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`,
)

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="100%" stop-color="#8a2be2"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#050506" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#050506"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <path d="M8 23.5 16 8.5 24 23.5" fill="none" stroke="url(#g)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(80, 200) scale(4)"/>
  <path d="M10.5 18.5h11" fill="none" stroke="#00f0ff" stroke-width="2.2" stroke-linecap="round" transform="translate(80, 200) scale(4)"/>
  <text x="80" y="340" fill="#ffffff" font-family="system-ui, sans-serif" font-size="56" font-weight="700">Project Axion</text>
  <text x="80" y="400" fill="#a0a0a8" font-family="system-ui, sans-serif" font-size="28">Consultanță IT &amp; dezvoltare web pentru firme</text>
  <text x="80" y="560" fill="#00f0ff" font-family="monospace" font-size="20">projectaxion.ro · Axion Vision SRL</text>
</svg>`

await sharp(Buffer.from(ogSvg))
  .png({ compressionLevel: 9 })
  .toFile(join(publicDir, 'og-image.png'))

console.log(`SEO static files generated for ${siteUrl} (${routes.length} URLs, og-image.png)`)
