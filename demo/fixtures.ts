// Demo "seed" data for the walkthrough.
//
// The site has no database and no login, so there is nothing to insert. What a
// viewer sees is the site's own real content (services, prices, copy) plus the
// one thing a visitor types: an enquiry. That enquiry lives here.
//
// Contact details use reserved ranges so they can never reach a real person:
// example.com is reserved for documentation (RFC 2606) and 07700 900xxx is
// Ofcom's range for drama and fiction.

export interface Enquiry {
  name: string
  email: string
  phone?: string
  /** Visible label of the <select> option */
  service: string
  message: string
}

/** Desktop journey: a household with last summer's glut, planning ahead. */
export const desktopEnquiry: Enquiry = {
  name: 'Hannah Whitlock',
  email: 'hannah.whitlock@example.com',
  phone: '07700 900418',
  service: 'Fermentation & Preservation',
  message:
    'Hi Penny, our two raised beds in Great Baddow gave us far more courgettes and cabbage than we could eat last summer. ' +
    "This year we'd love to learn to ferment and preserve it properly. Weekends suit us best.",
}

/** Phone journey: same person, the shorter thumb-typed version. */
export const mobileEnquiry: Enquiry = {
  name: 'Hannah Whitlock',
  email: 'hannah.whitlock@example.com',
  service: 'Fermentation & Preservation',
  message: 'Hi Penny, our courgettes and cabbage took over last summer. Could you teach us to ferment and preserve them this year?',
}

/**
 * The home page's sowing calendar highlights the current month. Pinning the
 * page's calendar date makes every recording identical; mid-May shows a full
 * sowing row ("runner beans, courgettes, carrots, beetroot, kale, lettuce").
 * Time still flows from this point, so GSAP animations run normally.
 */
export const pinnedDate = '2026-05-14T10:00:00+01:00'
export const timezoneId = 'Europe/London'
export const locale = 'en-GB'
