# Direction: Patch A Mumma facelift (November 2026)

Stardust's `direct` record for this redesign. The site is a Vue SPA run locally, not a crawlable live URL, so stardust's `extract` crawl and its static-HTML `prototype`/`migrate` outputs were not used: the redesign was built directly in the existing Vue 3 + Vite + Tailwind v3 + Vue Router codebase (GSAP added for motion). Design craft followed impeccable (`init` → new-work world → build → finish review → document).

## Intent

"An absolute facelift": earthy, plants everywhere, seeds, growth, fruit and veg, vines; intricate and portfolio-grade; not generic AI output. Warmth before spectacle, booking one step away on every page, honest proof, and every real piece of content and wiring kept (services, prices, contact details, Formspree, Calendly). Phone-first, WCAG 2.2 AA, full reduced-motion support.

## Current state (evidence, now replaced)

Template look: cream ground, Playfair Display serif, forest green, rounded white icon cards, full-bleed stock photo heroes, eyebrow labels above every heading. Content was solid; several honesty problems: an unconfirmed "50+ gardens" stat, stock photos captioned as "our work", Calendly developer instructions shown to visitors, an "Australians" meta description.

## Directions shown

1. **The Soil Section** (assigned by impeccable's roll): the site as one hand-drawn cut through an Essex kitchen-garden bed.
2. **Great Bardfield Linocut** (impeccable's pick): Essex printmaker linocut world.
3. **The Seasonal Almanac** (competitive catalogue challenger): each season an issue, one spot colour.
4. The category standard, played straight (standing exit).

The user asked for less AI-looking renders, then chose a **fusion of 1 and 4**, then picked composition **"A · The ground line"** from three hybrid variants, and chose **hand-built SVG** artwork over generated illustration.

## Resolved direction

- World: white survey paper and deep ink green; a dense flat-vector kitchen garden on a hand-drawn ground line; topsoil, clay, chalk and bedrock strata as section grounds with wavy horizons; a centimetre depth gauge and roots; Archivo heavy condensed caps for display, normal width for reading; square rust-red actions.
- Structure ("straight"): plain left-aligned headlines, full-width booking buttons on phones, plain price rows, photo plates credited to Unsplash.
- Motion: growth only. Garden grows in on load, roots and a margin vine draw with scroll, beds grow when seen, jars fill. All inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`.
- All artwork is SVG generated in code (`src/art/plants.js`); no generated raster ships.

Full contract: `.impeccable/surfaces/src-views-homeview-vue.md`. Product truth: `PRODUCT.md`.
