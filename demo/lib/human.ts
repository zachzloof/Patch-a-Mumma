// Human-paced input: eased mouse travel, visible presses, eased scrolling and
// waits that key off the page's real state instead of fixed sleeps.
import type { Locator, Page } from 'playwright'

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export interface ViewMargins {
  /** Keep targets below this many px from the top (sticky header). */
  top: number
  /** Keep targets above this many px from the bottom (sticky booking bar). */
  bottom: number
}

export class Human {
  page: Page
  margins: ViewMargins
  x = 0
  y = 0

  constructor(page: Page, margins: ViewMargins) {
    this.page = page
    this.margins = margins
  }

  /** Deliberate pause so a viewer can take in a moment. Pacing, not syncing. */
  hold(ms: number) {
    return this.page.waitForTimeout(ms)
  }

  async place(x: number, y: number) {
    this.x = x
    this.y = y
    await this.page.mouse.move(x, y)
  }

  /** Glide to (x, y) on a slight arc with ease-in-out, like a hand would. */
  async moveTo(x: number, y: number, ms?: number) {
    const dx = x - this.x
    const dy = y - this.y
    const dist = Math.hypot(dx, dy)
    if (dist < 1) return
    const duration = ms ?? Math.min(1050, 340 + dist * 0.5)
    const steps = Math.max(10, Math.round(duration / 16))
    const nx = -dy / dist
    const ny = dx / dist
    const bow = Math.min(48, dist * 0.07)
    const fromX = this.x
    const fromY = this.y
    const started = Date.now()
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const e = easeInOut(t)
      const arc = Math.sin(Math.PI * e) * bow
      await this.page.mouse.move(fromX + dx * e + nx * arc, fromY + dy * e + ny * arc)
      const wait = started + duration * t - Date.now()
      if (wait > 0) await sleep(wait)
    }
    this.x = x
    this.y = y
  }

  /** Point inside a locator's box (fractions of its width/height). */
  async pointIn(loc: Locator, fx = 0.5, fy = 0.5) {
    const box = await loc.boundingBox()
    if (!box) throw new Error(`No bounding box for ${loc}`)
    return { x: box.x + box.width * fx, y: box.y + box.height * fy }
  }

  async hover(loc: Locator, fx = 0.5, fy = 0.5) {
    await loc.waitFor({ state: 'visible' })
    await this.ensureInView(loc)
    const p = await this.pointIn(loc, fx, fy)
    await this.moveTo(p.x, p.y)
  }

  /** Scroll the target into the comfortable part of the screen if needed, glide to it, press. */
  async click(loc: Locator, fx = 0.5, fy = 0.5) {
    await this.hover(loc, fx, fy)
    await this.hold(140)
    await this.page.mouse.down()
    await this.hold(80)
    await this.page.mouse.up()
  }

  /** The visual half of a click (cursor press + ripple) without sending one. Used for native <select>. */
  async pressOnly() {
    await this.page.evaluate(({ x, y }) => (window as any).__demoRipple?.(x, y), { x: this.x, y: this.y })
    await this.hold(160)
  }

  async type(loc: Locator, text: string, delay: number) {
    await this.click(loc, 0.3, 0.5)
    await this.hold(150)
    await loc.pressSequentially(text, { delay })
  }

  async select(loc: Locator, label: string) {
    await this.hover(loc, 0.35, 0.5)
    await this.hold(120)
    await this.pressOnly()
    await loc.selectOption({ label })
  }

  /** Eased scroll to an absolute Y, driven per animation frame so ScrollTrigger scrubs smoothly. */
  async scrollTo(targetY: number, msPerPx = 1.05, minMs = 650, maxMs = 2600) {
    await this.page.evaluate(
      ({ targetY, msPerPx, minMs, maxMs }) =>
        new Promise<void>((resolve) => {
          const max = document.documentElement.scrollHeight - innerHeight
          const to = Math.max(0, Math.min(max, targetY))
          const from = scrollY
          const dist = Math.abs(to - from)
          if (dist < 2) return resolve()
          const dur = Math.max(minMs, Math.min(maxMs, dist * msPerPx))
          const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
          const t0 = performance.now()
          const step = (now: number) => {
            const p = Math.min(1, (now - t0) / dur)
            window.scrollTo({ top: from + (to - from) * ease(p), behavior: 'instant' })
            if (p < 1) requestAnimationFrame(step)
            else resolve()
          }
          requestAnimationFrame(step)
        }),
      { targetY, msPerPx, minMs, maxMs },
    )
    await this.scrollSettled()
  }

  async scrollBy(dy: number, msPerPx?: number) {
    const y = await this.page.evaluate(() => scrollY)
    await this.scrollTo(y + dy, msPerPx)
  }

  /** Scroll so the element's top sits `offset` px below the top of the viewport. */
  async scrollToElement(loc: Locator, offset = this.margins.top, msPerPx?: number) {
    await loc.waitFor({ state: 'attached' })
    const y = await loc.evaluate((el, offset) => el.getBoundingClientRect().top + scrollY - offset, offset)
    await this.scrollTo(y, msPerPx)
  }

  async ensureInView(loc: Locator) {
    const r = await loc.evaluate((el) => {
      const b = el.getBoundingClientRect()
      return { top: b.top, bottom: b.bottom, vh: innerHeight }
    })
    const { top, bottom } = this.margins
    if (r.top >= top && r.bottom <= r.vh - bottom) return
    const room = r.vh - top - bottom
    const height = r.bottom - r.top
    // Centre it in the usable band, or pin its top if it's taller than the band.
    const want = height < room ? top + (room - height) / 2 : top + 16
    await this.scrollBy(r.top - want)
  }

  /** Resolves once the page has stopped scrolling (native smooth scroll, router jumps). */
  async scrollSettled() {
    await this.page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          let last = scrollY
          let still = 0
          const tick = () => {
            if (Math.abs(scrollY - last) < 0.5) still++
            else {
              still = 0
              last = scrollY
            }
            if (still >= 8) resolve()
            else requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }),
    )
  }

  /** After a client-side route change: heading visible, page fade finished, any hash scroll done. */
  async routeSettled(heading: Locator) {
    await heading.waitFor({ state: 'visible' })
    await this.page.waitForFunction(() => !document.querySelector('.page-fade-enter-active, .page-fade-leave-active'))
    await this.scrollSettled()
  }
}
