// Diagnostica: controlla lo stato reale degli elementi "reveal" e il colore del testo.
import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const URL = process.argv[2] || 'http://localhost:4173/'

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(URL, { waitUntil: 'networkidle0' })
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = 'auto'
  const passo = window.innerHeight * 0.8
  for (let y = 0; y < document.body.scrollHeight; y += passo) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 220))
  }
  window.scrollTo(0, document.body.scrollHeight)
  await new Promise((r) => setTimeout(r, 1200))
  window.scrollTo(0, 0)
  await new Promise((r) => setTimeout(r, 900))
})

const dati = await page.evaluate(() => {
  const q = document.querySelector('.bento-quote')
  const t = document.querySelector('.bento-quote-text')
  const senzaIn = [...document.querySelectorAll('.reveal:not(.is-in)')].map(
    (el) => el.className,
  )
  return {
    quoteClass: q?.className,
    quoteOpacity: q ? getComputedStyle(q).opacity : null,
    quoteBg: q ? getComputedStyle(q).backgroundColor : null,
    textColor: t ? getComputedStyle(t).color : null,
    senzaIn,
  }
})
console.log(JSON.stringify(dati, null, 2))
await browser.close()
