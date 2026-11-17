// Screenshot del sito in locale per verificare la resa grafica.
// Uso: node tools/screenshot.mjs <url> <out-dir>
import puppeteer from 'puppeteer-core'

const URL = process.argv[2] || 'http://localhost:4173/'
const OUT = process.argv[3] || 'shots'
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'

const viste = [
  { nome: 'desktop', width: 1440, height: 900, full: false },
  { nome: 'intera', width: 1440, height: 900, full: true },
  { nome: 'mobile', width: 390, height: 844, full: true },
]

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-device-scale-factor=1'],
})

for (const v of viste) {
  const page = await browser.newPage()
  await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 1 })
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 45000 })
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    await new Promise((r) => setTimeout(r, 400))
    // scroll per far scattare le animazioni reveal
    const passo = window.innerHeight * 0.8
    for (let y = 0; y < document.body.scrollHeight; y += passo) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 220))
    }
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((r) => setTimeout(r, 600))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 700))
  })
  await page.screenshot({ path: `${OUT}/${v.nome}.png`, fullPage: v.full })
  const box = await page.evaluate(() => ({
    h: document.querySelector('main').scrollHeight,
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
  }))
  console.log(v.nome, 'ok', box)
  await page.close()
}

await browser.close()
