// Records the Patch A Mumma walkthrough with Playwright, then post-processes it.
//
//   npm run demo:record            seed, build + serve, record both, encode
//   node demo/record.ts --only=desktop
//   node demo/record.ts --no-post  record only; run demo/postprocess.ts later
//   $env:DEMO_URL='http://localhost:5173'; node demo/record.ts   (PowerShell) use a running server
//
// Output lands in demo/output/ (gitignored). See demo/README.md.
import { mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { chromium, type Browser, type Page } from 'playwright'
import { desktopEnquiry, mobileEnquiry, locale, timezoneId, type Enquiry } from './fixtures.ts'
import { seedContext } from './seed.ts'
import { installCursor } from './lib/cursor.ts'
import { Human } from './lib/human.ts'
import { startApp } from './lib/server.ts'
import { postprocess } from './postprocess.ts'

const DEMO = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(DEMO, '..')
const OUT = join(DEMO, 'output')
const RAW = join(OUT, 'raw')
const SITE = join(OUT, '.site')

type Variant = 'desktop' | 'mobile'
type Marks = Record<string, number>

interface VariantSpec {
  name: Variant
  viewport: { width: number; height: number }
  scale: number
  mobile: boolean
  flow: (page: Page, h: Human, mark: (name: string) => void) => Promise<void>
}

const log = (...a: unknown[]) => console.log('[demo]', ...a)

// ---------------------------------------------------------------- journeys

async function fillEnquiry(page: Page, h: Human, e: Enquiry, pace: { field: number; message: number }) {
  await h.type(page.locator('#name'), e.name, pace.field)
  await h.hold(250)
  await h.type(page.locator('#email'), e.email, pace.field - 15)
  if (e.phone) {
    await h.hold(250)
    await h.type(page.locator('#phone'), e.phone, pace.field)
  }
  await h.hold(300)
  await h.select(page.locator('#service'), e.service)
  await h.hold(600)
  await h.type(page.locator('#message'), e.message, pace.message)
  await h.hold(700)
}

async function sendAndConfirm(page: Page, h: Human, mark: (n: string) => void) {
  await h.click(page.getByRole('button', { name: 'Send message' }))
  await page.getByRole('button', { name: 'Sending…' }).waitFor({ state: 'visible' })
  const done = page.getByText('Message sent. Thank you!')
  await done.waitFor({ state: 'visible' })
  mark('sent')
  await h.ensureInView(page.locator('[aria-live="polite"]'))
  await h.hold(2400)
}

/** Waits for the router's delayed jump to /contact#book to land. */
async function landedOnBook(page: Page, h: Human) {
  await h.routeSettled(page.locator('#book-title'))
  await page.waitForFunction(() => {
    const el = document.querySelector('#book')
    return !!el && Math.abs(el.getBoundingClientRect().top - 88) < 6
  })
  await h.scrollSettled()
}

const desktopFlow: VariantSpec['flow'] = async (page, h, mark) => {
  // 1. Home: the garden grows in.
  await h.hold(1400)
  const heroCta = page.locator('#hero-title ~ div [data-book-cta]')
  await h.hover(heroCta, 0.42, 0.55)
  await h.hold(1100)

  // 2–3. Down through the soil into what they do, how it works, what grows when.
  mark('scroll')
  await h.moveTo(1560, 560)
  await h.scrollToElement(page.locator('#what-we-do'), 64, 1.25)
  await h.hold(1400)
  await h.scrollToElement(page.locator('section:has(#how-title)'), 40, 1.1)
  await h.hold(2000)
  await h.scrollToElement(page.locator('section:has(#cal-title)'), 64, 0.75)
  await h.hold(500)
  await h.hover(page.locator('section:has(#cal-title) tbody tr', { hasText: 'Runner beans' }).locator('td').nth(4), 0.5, 0.5)
  await h.hold(1300)

  // 4. Back up to the nav, then Services. Scrolling up first means the
  // router's reset-to-top has nothing to move, so the old page doesn't snap.
  await h.scrollTo(0, 0.5, 900, 1800)
  mark('services')
  await h.click(page.locator('nav[aria-label="Main"]').getByRole('link', { name: 'Services', exact: true }))
  await h.routeSettled(page.locator('#page-title', { hasText: 'Services' }))
  await h.moveTo(1240, 620)
  await h.hold(1500)

  // 5. Jump to the part nobody else offers: fermentation & preservation.
  await h.click(page.locator('nav[aria-label="Services on this page"] a[href="#fermentation"]'))
  await page.waitForFunction(() => location.hash === '#fermentation')
  await h.scrollSettled()
  await h.hold(500)
  await h.hover(page.locator('#fermentation p.figures'), 0.85, 0.5)
  await h.hold(1300)

  // 6. Book this service → Contact. Hover the booking calendar, don't open it.
  mark('contact')
  await h.click(page.locator('#fermentation').getByRole('link', { name: 'Book this service' }))
  await landedOnBook(page, h)
  await h.hold(900)
  await h.hover(page.getByRole('link', { name: /Open the booking calendar/ }), 0.45, 0.5)
  await h.hold(1200)

  // 7. The enquiry, typed at a human pace.
  mark('form')
  await fillEnquiry(page, h, desktopEnquiry, { field: 70, message: 30 })

  // 8. Send → confirmation.
  await sendAndConfirm(page, h, mark)
}

const mobileFlow: VariantSpec['flow'] = async (page, h, mark) => {
  // 1. Home: the garden grows in.
  await h.hold(2400)

  // 2. Scroll down: the sticky booking bar rises once the hero button leaves.
  mark('scroll')
  await h.scrollToElement(page.locator('#what-we-do'), 64, 1.4)
  await page.locator('.fixed.bottom-0 a', { hasText: 'Book a free chat' }).waitFor({ state: 'visible' })
  await h.hold(1500)
  await h.scrollToElement(page.locator('section:has(#how-title)'), 48, 0.9)
  await h.hold(1800)

  // 3. Menu → Services.
  mark('services')
  await h.click(page.getByRole('button', { name: 'Menu' }))
  await page.locator('#mobile-menu').waitFor({ state: 'visible' })
  await h.hold(1300)
  await h.click(page.locator('#mobile-menu').getByRole('link', { name: 'Services', exact: true }))
  await h.routeSettled(page.locator('#page-title', { hasText: 'Services' }))
  await h.moveTo(300, 600) // off the hero's booking button
  await h.hold(1200)

  // 4. Fermentation & preservation, then book it.
  await h.click(page.locator('nav[aria-label="Services on this page"] a[href="#fermentation"]'))
  await page.waitForFunction(() => location.hash === '#fermentation')
  await h.scrollSettled()
  await h.hold(700)
  await h.scrollBy(150)
  await h.hold(900)
  mark('contact')
  await h.click(page.locator('#fermentation').getByRole('link', { name: 'Book this service' }))
  await landedOnBook(page, h)
  await h.hold(1200)

  // 5. Down to the form and the enquiry.
  mark('form')
  await h.scrollToElement(page.locator('#msg-title'), 80, 1.0)
  await h.hold(400)
  await fillEnquiry(page, h, mobileEnquiry, { field: 75, message: 34 })

  // 6. Send → confirmation.
  await sendAndConfirm(page, h, mark)
}

const VARIANTS: VariantSpec[] = [
  { name: 'desktop', viewport: { width: 1920, height: 1080 }, scale: 1, mobile: false, flow: desktopFlow },
  { name: 'mobile', viewport: { width: 390, height: 844 }, scale: 3, mobile: true, flow: mobileFlow },
]

// ---------------------------------------------------------------- recorder

async function record(browser: Browser, url: string, v: VariantSpec) {
  const tmp = join(RAW, `.tmp-${v.name}`)
  rmSync(tmp, { recursive: true, force: true })
  const context = await browser.newContext({
    viewport: v.viewport,
    deviceScaleFactor: v.scale,
    isMobile: v.mobile,
    hasTouch: v.mobile,
    locale,
    timezoneId,
    colorScheme: 'light',
    reducedMotion: 'no-preference',
    // Chrome's screencast sends frames at CSS-pixel size, so the video is the
    // viewport size. A phone-like deviceScaleFactor still renders text at 3x
    // and downsamples it, which keeps small type smooth.
    recordVideo: { dir: tmp, size: v.viewport, fps: 30 },
  })
  const seeded = await seedContext(context)
  await context.addInitScript(installCursor, { kind: v.mobile ? 'touch' : 'arrow' })

  const t0 = Date.now() // the recorder's clock starts with the page
  const page = await context.newPage()
  const marks: Marks = {}
  const mark = (name: string) => {
    marks[name] = (Date.now() - t0) / 1000
  }
  page.on('pageerror', (e) => log(`${v.name} page error:`, e.message))

  // Warm-up (trimmed away): fetch every route, font and image once so the
  // recorded pass paints from cache with no font swap or loading flash.
  for (const path of ['/', '/services', '/contact', '/']) {
    await page.goto(url + path, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 2) {
        window.scrollTo({ top: y, behavior: 'instant' })
        await new Promise((r) => setTimeout(r, 30))
      }
      await Promise.all(
        [...document.images].map((img) => (img.complete ? null : new Promise((r) => ((img.onload = r), (img.onerror = r))))),
      )
    })
  }

  // Sync flash (trimmed away). The video's timeline doesn't start exactly when
  // the page is created, so post-processing finds this black frame with
  // ffmpeg's blackdetect and lines every mark up against it.
  await page.evaluate(() => {
    const d = document.createElement('div')
    d.style.cssText = 'position:fixed;inset:0;background:#000;z-index:2147483647'
    document.documentElement.appendChild(d)
    return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
  })
  mark('sync')
  await page.waitForTimeout(600)

  // The recorded pass: a fresh load that is fully painted before the cut.
  await page.goto(url + '/', { waitUntil: 'domcontentloaded' })
  await page.locator('#hero-title').waitFor({ state: 'visible' })
  await page.evaluate(() => document.fonts.ready)
  const h = new Human(page, { top: 84, bottom: v.mobile ? 110 : 40 })
  if (v.mobile) await h.place(300, 700)
  else await h.place(1400, 700)
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
  mark('start')

  await v.flow(page, h, mark)
  mark('end')

  const video = page.video()
  await context.close()
  const target = join(RAW, `${v.name}.webm`)
  renameSync(await video!.path(), target)
  rmSync(tmp, { recursive: true, force: true })

  if (seeded.submissions.length !== 1) throw new Error(`${v.name}: expected 1 mocked enquiry, saw ${seeded.submissions.length}`)
  const sent = seeded.submissions[0]
  const expected = v.mobile ? mobileEnquiry : desktopEnquiry
  if (sent.name !== expected.name || sent.message !== expected.message || sent.service !== expected.service)
    throw new Error(`${v.name}: the form posted something other than the fixture: ${JSON.stringify(sent)}`)

  writeFileSync(join(RAW, `${v.name}.json`), JSON.stringify({ marks, size: v.viewport, scale: v.scale }, null, 2))
  log(`${v.name}: recorded ${(marks.end - marks.start).toFixed(1)}s of flow ->`, target)
}

/** Launches headless Chromium, installing Playwright's build first if it's missing. */
async function launchBrowser() {
  const opts = { args: ['--hide-scrollbars', '--force-color-profile=srgb'] }
  try {
    return await chromium.launch(opts)
  } catch (e) {
    if (!/Executable doesn't exist|playwright install/i.test(String(e))) throw e
    log('installing Playwright Chromium…')
    const r = spawnSync('npx playwright install chromium', { cwd: DEMO, stdio: 'inherit', shell: true })
    if (r.status !== 0) throw new Error('playwright install chromium failed')
    return chromium.launch(opts)
  }
}

async function main() {
  const only = process.argv.find((a) => a.startsWith('--only='))?.split('=')[1] as Variant | undefined
  const variants = VARIANTS.filter((v) => !only || v.name === only)
  mkdirSync(RAW, { recursive: true })

  log('1/4 seed: enquiry fixtures loaded; Formspree mocked, Calendly blocked, calendar pinned to mid-May')
  log(process.env.DEMO_URL ? '2/4 app: using DEMO_URL' : '2/4 app: building and serving…')
  const app = await startApp(ROOT, SITE)
  log('    serving', app.url)

  let browser: Browser | undefined
  try {
    browser = await launchBrowser()
    log('3/4 record')
    for (const v of variants) await record(browser, app.url, v)
  } finally {
    await browser?.close()
    await app.close()
  }

  if (process.argv.includes('--no-post')) return
  log('4/4 post-process')
  await postprocess(variants.map((v) => v.name))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
