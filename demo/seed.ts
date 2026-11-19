// Seeds a browser context for recording: pins the page's calendar date and
// replaces the live third-party endpoints with local stand-ins, so a recording
// never emails the business owner or opens a real booking.
import type { BrowserContext } from 'playwright'
import { pinnedDate } from './fixtures.ts'

export interface SeedLog {
  submissions: Record<string, string>[]
}

export async function seedContext(context: BrowserContext): Promise<SeedLog> {
  const log: SeedLog = { submissions: [] }

  // Shift Date (not performance.now) to the pinned day. The offset is constant,
  // so time keeps moving and anything that measures elapsed time still works.
  await context.addInitScript(
    ({ iso }) => {
      const Real = Date
      const offset = new Real(iso).getTime() - Real.now()
      function PinnedDate(this: unknown, ...args: unknown[]) {
        if (!new.target) return new Real(Real.now() + offset).toString()
        // @ts-expect-error spread into the real constructor
        return args.length ? new Real(...args) : new Real(Real.now() + offset)
      }
      PinnedDate.prototype = Real.prototype
      PinnedDate.now = () => Real.now() + offset
      PinnedDate.parse = Real.parse
      PinnedDate.UTC = Real.UTC
      // @ts-expect-error replacing the global constructor
      window.Date = PinnedDate
    },
    { iso: pinnedDate },
  )

  // Formspree is live: a real POST would email Penny. Answer it locally with
  // the same JSON Formspree returns, after a short, realistic delay.
  await context.route('https://formspree.io/**', async (route) => {
    const body = route.request().postData()
    if (body) log.submissions.push(JSON.parse(body))
    await new Promise((r) => setTimeout(r, 900))
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify({ ok: true, next: 'https://formspree.io/thanks' }),
    })
  })

  // Guard rail: the walkthrough hovers the Calendly button but never books.
  await context.route('https://calendly.com/**', (route) => route.abort())

  return log
}
