import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'
import toIco from 'to-ico'

const publicDir = join(process.cwd(), 'public')
const svgPath = join(publicDir, 'favicon.svg')
const svg = readFileSync(svgPath)

async function png(size, name) {
  const out = join(publicDir, name)
  await sharp(svg)
    .resize(size, size, { fit: 'contain', background: { r: 5, g: 5, b: 6, alpha: 1 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile(out)
  console.log(`  ${name} (${size}x${size})`)
}

const icoSizes = [16, 32, 48]
const icoBuffers = await Promise.all(
  icoSizes.map((size) =>
    sharp(svg)
      .resize(size, size, { fit: 'contain', background: { r: 5, g: 5, b: 6, alpha: 1 } })
      .png()
      .toBuffer(),
  ),
)

writeFileSync(join(publicDir, 'favicon.ico'), await toIco(icoBuffers))
console.log('  favicon.ico (16/32/48)')

await png(48, 'favicon-48.png')
await png(192, 'favicon-192.png')
await png(512, 'favicon-512.png')
await png(180, 'apple-touch-icon.png')

console.log('Favicons generated from favicon.svg')
