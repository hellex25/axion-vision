// Generează pliantul pentru tipar: node print/pliant/build.mjs
// Necesită Playwright (Chromium). Ieșire: pliant-project-axion-tipar.pdf + previzualizări PNG.
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const dir = dirname(fileURLToPath(import.meta.url))

const qr = readFileSync(join(dir, 'qr.svg'), 'utf8')
const html = readFileSync(join(dir, 'pliant.html'), 'utf8').replace('{{QR}}', qr)
const tmp = join(dir, '.render.html')
writeFileSync(tmp, html)

const browser = await chromium.launch()
const page = await browser.newPage({ deviceScaleFactor: 2 })
await page.goto('file://' + tmp, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

await page.pdf({
  path: join(dir, 'pliant-project-axion-tipar.pdf'),
  preferCSSPageSize: true,
  printBackground: true,
})

// Previzualizări (tăiate la format final, cu linii de pliere) — doar pentru verificare, nu pentru tipar
const mm = 96 / 25.4
await page.setViewportSize({ width: Math.ceil(303 * mm), height: Math.ceil(216 * 2 * mm) })
const sheets = await page.$$('.sheet')
const names = ['exterior', 'interior']
const folds = [[100, 200], [103, 203]]
for (let i = 0; i < sheets.length; i++) {
  await page.evaluate(([i, f]) => {
    document.querySelectorAll('.fold-guide').forEach((e) => e.remove())
    const s = document.querySelectorAll('.sheet')[i]
    for (const x of f) {
      const d = document.createElement('div')
      d.className = 'fold-guide'
      d.style.cssText = `position:absolute;top:0;bottom:0;left:${x}mm;border-left:0.3mm dashed rgba(255,0,128,.7);z-index:99`
      s.appendChild(d)
    }
  }, [i, folds[i]])
  const box = await sheets[i].boundingBox()
  const b = 3 * mm
  await page.screenshot({
    path: join(dir, `previzualizare-${names[i]}.png`),
    clip: { x: box.x + b, y: box.y + b, width: box.width - 2 * b, height: box.height - 2 * b },
  })
}

// Imagini la 300 dpi, cu bleed, fără linii de pliere (pentru tipografii care cer JPG)
const hi = await browser.newPage({ deviceScaleFactor: 300 / 96 })
await hi.goto('file://' + tmp, { waitUntil: 'networkidle' })
await hi.evaluate(() => document.fonts.ready)
const hiSheets = await hi.$$('.sheet')
for (let i = 0; i < hiSheets.length; i++) {
  await hiSheets[i].screenshot({ path: join(dir, `pliant-${names[i]}-300dpi.jpg`), type: 'jpeg', quality: 95 })
}

await browser.close()
unlinkSync(tmp)
console.log('OK')
