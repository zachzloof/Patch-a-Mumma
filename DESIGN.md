---
name: Patch A Mumma
description: Food gardens across Essex, drawn as one continuous cut through a kitchen-garden bed.
colors:
  paper: "#FAF9F4"
  paper-deep: "#F1EFE6"
  ink: "#10291C"
  ink-soft: "#3E5546"
  ink-faint: "#6B7A6F"
  line-ink: "#173D1F"
  rust: "#B23C1C"
  rust-dark: "#92301A"
  rust-light: "#F3D9CF"
  humus: "#3A2518"
  humus-light: "#4B3223"
  humus-dark: "#2A1A10"
  bedrock: "#241710"
  clay: "#C08A3E"
  clay-dark: "#9C6A2A"
  chalk: "#ECE6D7"
  gley: "#8B989D"
  topsoil-cream: "#F3EAD6"
  bedrock-text: "#E9DFC9"
  bedrock-muted: "#CDBFA3"
  horizon-rule: "#C9BFA9"
  field-white: "#FFFFFF"
  leaf-700: "#2F6B2A"
  leaf-500: "#4E8E35"
  leaf-300: "#8DBF5A"
  leaf-100: "#DDEBC4"
  stem: "#3F7A2E"
  cane: "#B58A4E"
  board: "#C9A26B"
  seed: "#E9B160"
  tomato: "#D8432E"
  bean: "#D93A2B"
  squash: "#E8A33A"
  carrot: "#E87A24"
  beet: "#8E1F45"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "5.75rem"
    fontWeight: 850
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62.5"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 850
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62.5"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 750
    lineHeight: 1.02
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 72"
  price:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    fontFeature: "'tnum', 'lnum'"
    fontVariation: "'wdth' 75"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  button:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.06em"
    fontFeature: "'tnum'"
rounded:
  none: "0px"
  hairline: "2px"
  chip: "3px"
spacing:
  gutter: "20px"
  gutter-sm: "32px"
  page-max: "78rem"
  nav-height: "64px"
  section: "64px"
  section-md: "96px"
  inner-section: "56px"
  inner-section-md: "80px"
  row: "24px"
components:
  button-primary:
    backgroundColor: "{colors.rust}"
    textColor: "{colors.field-white}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.rust-dark}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "16px 40px"
    height: "52px"
  button-ink-hover:
    backgroundColor: "{colors.line-ink}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  input-field:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
  nav-link:
    textColor: "{colors.ink-soft}"
    padding: "8px 0"
  nav-link-active:
    textColor: "{colors.ink}"
  index-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "8px 14px"
  index-chip-hover:
    backgroundColor: "{colors.leaf-100}"
  name-plate:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  crop-tag:
    backgroundColor: "{colors.humus-dark}"
    textColor: "{colors.bedrock-text}"
    rounded: "{rounded.none}"
    padding: "1px 6px"
  stratum-label:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  stratum-label-light:
    backgroundColor: "{colors.humus-dark}"
    textColor: "{colors.bedrock-text}"
  calendar-bar:
    backgroundColor: "{colors.tomato}"
    rounded: "{rounded.hairline}"
    height: "20px"
---

# Design System: Patch A Mumma

## Overview

**Creative North Star: "The Soil Section"**

Every page is one continuous cut through an Essex kitchen-garden bed, read straight down. A dense hand-drawn patch of runner beans, tomatoes, courgettes, carrots, beetroot and garlic stands on a wavy ground line at the top of every route; the offer is set into the topsoil beneath it; further sections sit on survey paper (divided by faint drawn horizons) or on deeper strata (clay, chalk), and every page bottoms out in bedrock at the footer. The site reads like a hand-coloured soil-survey plate: white survey paper, deep ink-green linework, flat fills, stippled soil, a centimetre depth gauge, and plain name plates set along the line they describe.

This world replaced the earlier cream, Playfair and forest-green look, which is a confirmed anti-reference. It came from an impeccable direction roll (The Soil Section), was fused by the owner with the category standard played straight, and the owner chose composition "A · The ground line". All artwork is hand-built, procedural SVG in code; no generated raster ships. Density is high in the drawings and calm in the reading: heavy condensed caps for display, normal-width Archivo for everything you read, square rust-red actions, thin rules and plain price rows instead of cards.

Motion is growth and nothing else: stems draw, leaves unfurl from their base, roots reach downward as the visitor scrolls, jars fill with brine. Every GSAP animation runs inside a reduced-motion gate and reverts to the finished drawing, so the still state is always the complete picture.

**Key Characteristics:**
- One continuous drawing: strata with wavy hand-drawn horizons, never floating card boxes.
- Survey paper ground (paper) with ink-green type and linework; soil colours carry depth.
- Archivo variable: 62.5%-width, weight-850 uppercase display; normal-width body.
- Square everything that acts: rust buttons, ink-bordered fields, 2px ink frames on photos.
- Procedural SVG plants with seeded variation; every drawing is decorative and `aria-hidden`.
- Growth-only motion through GSAP, gated by `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`.

## Colors

A survey-plate palette: white paper and deep ink green on top, umber, ochre and chalk strata underneath, saturated crop colours only inside the drawings, and one rust for every action.

Keys follow the Tailwind config names where they exist (paper, ink, humus, clay, chalk, gley, leaf-*, rust, the crop colours). line-ink is `leaf-900` in the config and `INK` in `src/art/plants.js`. bedrock, topsoil-cream, bedrock-text, bedrock-muted, horizon-rule, stem, cane, board, seed and field-white are literal hex values in components and art, not config tokens.

### Primary
- **Survey Rust** (rust): the single action colour. Every "Book a free chat" button, form-field focus, the current-month column header in the sowing calendar, the "Plan your first season" link, and the calendar icon's header band. Hover deepens to **Kiln Rust** (rust-dark). **Rust Wash** (rust-light) tints the current-month calendar column and backs the form error message, which takes a 2px rust border and Kiln Rust text.
- **Focus ring:** two-tone and global: a 2px ink ring (`box-shadow`) hugging the control plus a 3px paper outline at 2px offset. The ink ring carries contrast on paper and chalk, the paper ring on topsoil, clay and bedrock, so focus clears 3:1 on every stratum. Form fields override it with a 3px rust outline (5.6:1 on paper).

### Secondary
- **Leaf Ink** (leaf-700): prices in the services list, service taglines, the active mobile-menu item, gallery "Fig." numbers, plate tips, the highlighted half of the mission headline.
- **Growth Greens** (leaf-500, leaf-300, leaf-100): leaf fills in every drawing and bullet sprout; leaf-500 is the desktop nav's active underline and the sow bars (stippled with leaf-100); leaf-100 backs the booking panel (at 60%), the success panel, and hovered index chips; leaf-300 is also the text-selection colour.

### Tertiary
The strata grounds, each a full-bleed band with its own stipple.
- **Topsoil Umber** (humus): the hero and inner-page title band, the About quote band, the ground under every garden band. Stippled with **Loam** (humus-light) and **Deep Humus** (humus-dark) dots and pebble outlines. humus-dark also draws strata edges and testimonial type on clay.
- **Clay Ochre** (clay): the trust strip under the hero and the testimonials stratum; **Burnt Clay** (clay-dark) is its horizon line and hatch.
- **Chalk** (chalk): the larder (preserve shelf) and closing call to action, and the Services page close.
- **Bedrock** (bedrock): the footer, with **Bedrock Parchment** (bedrock-text) for its text and **Bedrock Dust** (bedrock-muted) for its small print.
- **Gley Grey** (gley): dashed ghost outlines, jar lids, notebook rules, glyph details.

### Neutral
- **Survey Paper** (paper): the page ground, nav bar, plates, stratum-label chips, `theme-color`. **Paper Deep** (paper-deep) backs the About values band and photo frames, and is the scrollbar track.
- **Field Ink** (ink): all type on paper, 2px rules over lists, borders of buttons, fields and frames. **Soft Ink** (ink-soft) is body copy and secondary text; **Faint Ink** (ink-faint) is placeholder text only.
- **Line Ink** (line-ink): the stroke of every drawing, the ground line, plate leaders and the sprout mark. It is a separate, slightly greener ink from Field Ink.
- **Topsoil Cream** (topsoil-cream): sublines and the depth gauge set on topsoil.
- **Horizon Rule** (horizon-rule): the faint wavy horizon drawn between sections that share the paper ground.
- **Field White** (field-white): input backgrounds and text on rust only.

### Illustration-only colours
stem, cane, board, seed, tomato, bean, squash, carrot and beet are drawing fills (plus further crop shades kept in `src/art/plants.js`). tomato also marks harvest months in the calendar and the "questionable tomato" phrase on About. None of them is used for UI chrome.

### Named Rules
**The One Rust Rule.** Rust means "act here". Every booking and primary action is a rust fill; the only other filled button is the ink form submit. Outside actions rust appears only as form-field focus, the form error block, the calendar's "this month" marker and small details inside drawings.

**The Soil Carries Depth Rule.** Topsoil always sits directly under a garden band's ground line, bedrock is always the footer, and where clay and chalk both appear on a page, clay sits above chalk. Stratum colours fill full-bleed bands, never small decorative panels.

## Typography

**Display Font:** Archivo (variable, `wdth` 62–125, `wght` 300–900, loaded from Google Fonts) with system-ui, sans-serif
**Body Font:** Archivo at normal width
**Label Font:** Archivo, uppercase tracked with tabular figures

**Character:** One family doing two jobs. Pushed to its narrowest width and near-black weight it becomes a dense, poster-like survey heading; at normal width it is a plain, friendly reading face.

Width is set with `font-stretch` in the `.display` (62.5%) and `.condensed` (72%) classes; the frontmatter records it as the equivalent `wdth` axis value. Sizes are fixed rem steps per breakpoint, not fluid clamps.

### Hierarchy
- **Display** (850, 62.5% width, uppercase, 0.9 line-height, -0.01em, `text-wrap: balance`): the home hero (3.25rem phone, 5rem sm, 5.75rem lg) and inner-page titles (3.4rem, 4.5rem, 5.5rem), set in paper on topsoil.
- **Headline** (same recipe): section headings at 2.75–3.25rem on phones and 3.5–4.75rem from md; also the About pull-quote, the mobile menu items (2.5rem) and the wordmark (1.75rem nav, 2rem footer).
- **Title** (750, 72% width, mixed case, 1.02 line-height): service names in the list (1.625rem / 2rem), step and value names (1.75–2rem), small subheads (1.375rem), panel lines (1.5rem).
- **Price** (800, 75% width, tabular lining figures, 1.75rem): the price line on each Services article. In list rows prices are 700 weight at 1.0625–1.125rem in Leaf Ink, still tabular.
- **Body** (400, 1.125rem, 1.625 line-height): lead paragraphs in Soft Ink, held to 40–62ch. Running copy defaults to 1rem; testimonial quotes are 1.1875rem.
- **Button** (700, 1.0625rem, line-height 1): every `.btn` label; nav buttons drop to 0.9375rem.
- **Label** (600, 0.8125rem, 0.06em, uppercase, tabular): stratum names set on horizon lines ("Clay subsoil", "Chalk · the larder", "Bedrock"), at 0.75rem there. Plate and crop tag text is 0.6875–0.8125rem, mixed case.

### Named Rules
**The Two Widths Rule.** Condensed is for things you glance at (headings, names, prices); normal width is for things you read. Body copy is never condensed.

**The Survey Figures Rule.** Prices, depth-gauge numbers and figure numbers use tabular lining figures.

## Layout

The page is a single vertical section. Each route opens with a full-bleed garden band on its ground line (home layout: 296px phone / 344px-high viewBox desktop; compact layout on inner pages), then a topsoil band carrying the title and the rust booking button, then a wavy strata edge down to paper. Content sits in a centred column (`page-x`: max 78rem, 20px gutters, 32px from 640px). Full-bleed strata run edge to edge behind it.

Vertical rhythm: home sections 64px top and bottom, 96px from md; inner-page bodies 56px / 80px. List rows are 24–28px tall in padding (services rows 24px, 28px at md; values 32px). Grids are 12-column at md/lg with 5/7, 6/6 or 4/8 splits; on phones everything stacks in reading order. Headings sit beside or above their lead paragraph, aligned to the baseline at md.

Responsive behaviour: the garden band swaps between hand-composed phone and desktop layouts (not scaled). Name plates appear from lg; the root rail (left) and vine rail (right) only appear from 1400px, in the margins outside the column. Below md the nav collapses to an outlined Menu button and a full-height paper menu; after 520px of scroll a sticky rust "Book a free chat" bar rises from the bottom on phones (not on Contact).

### Named Rules
**The One Step Away Rule.** A rust booking action sits in the desktop nav and the footer on every route, and in the hero band, at the end of the page and in the phone bottom bar on every route except Contact, which is the booking page itself.

## Elevation & Depth

Flat. Depth is told by the strata, not by shadows: colour gets darker as you go down, horizons are drawn as hand-wavy lines with a 1.5px darker stroke, and soil carries a seeded stipple of dots, pebble outlines and (on clay) diagonal hatch. Overlap is the other depth cue: crop tags and roots sit below the ground line, plates hang over the planting on dashed leader lines.

### Shadow Vocabulary
- **Plate lift** (`box-shadow: 0 6px 14px -10px rgba(16,41,28,0.6)`): only on the hero's name plates, so they read as cards pinned over the planting. It is the one shadow in the build.
- The phone booking bar uses paper at 95% with a 2px backdrop blur; that is a legibility veil, not elevation.

### Named Rules
**The Strata Not Shadows Rule.** Separate sections with a drawn horizon, a flat change of ground or a plain ink rule, never with a raised card or drop shadow.

## Shapes

Square by default. Buttons, fields, photo frames, plates, crop tags, stratum chips, the booking and success panels, and the preserve shelf all have square corners, framed with 2px Field Ink borders (1px on plates and chips). Thin rules do the structural work: a 2px ink rule opens each list, 1px rules at 10–20% ink separate rows.

Small exceptions as built: 2px corners on calendar bars, 3px on the Services index chips, and a fully round underline under the active desktop nav link and a round paper disc behind the footer sprout mark.

Organic shape lives in the drawings: wavy ground lines and horizons (seeded quadratic curves), pointed leaves, palmate squash leaves, branching roots, swing-top jars. The drawing stroke is round-capped and round-joined at 0.7–2px in Line Ink, mostly non-scaling.

## Components

### Buttons
Plain, square and heavy. One shared base: 52px minimum height, 16px by 24px padding, 12px gap for a trailing arrow, 700-weight 1.0625rem label, colour transition 200ms.
- **Shape:** square corners (0px).
- **Primary (rust):** Survey Rust with white text; hover goes to Kiln Rust. Used for every booking action, full width on phones. A trailing 20px drawn arrow appears in the hero; an external-link arrow plus a screen-reader "(opens Calendly in a new tab)" on the Calendly button.
- **Ink:** Field Ink with paper text, hover to Line Ink. Used once, for form submission (40px side padding from sm; 70% opacity and a wait cursor while sending).
- **Line:** transparent with a 2px Field Ink border; hover fills ink with paper text. The secondary "Browse services" action and the phone Menu toggle (compact padding).
- **Focus:** the global 3px rust outline at 3px offset (see the contrast caveat under Colors).
- **Text links:** 600 weight, 2px underline at 0.22em offset; on topsoil the underline is clay and turns paper on hover.

### Stratum edges (signature)
A full-width SVG horizon between two grounds: a seeded wavy path (60px steps, amplitude 9 by default, 5 between paper sections) fills the lower colour under the upper one, with an optional 1.5px darker stroke on the line. Height 24px, 32px from sm. An optional label chip in the Label style sits on the line at the right: paper chip with Soft Ink text, or Deep Humus chip with Bedrock Parchment text on dark strata. Decorative and `aria-hidden`.

### Soil fills
Absolute-positioned SVG patterns behind each stratum: a 180px tile of seeded dots in three near-base tones, 3–6 outlined pebbles, and diagonal hatch on clay only. Kinds in use: topsoil, clay, chalk, bedrock (a gley fill is defined but unused).

### Garden band
The drawn patch on the ground line, composed by hand per layout (home and compact, phone and desktop) from procedural plants in `src/art/plants.js`: runner beans on canes with scarlet flowers, tomatoes with ripening trusses, squash and courgette, carrots and beetroot showing their roots below ground, garlic, lettuce, marigolds and grass tufts. Topsoil stipple fills under a 1.6px Line Ink ground line. Seeds vary every instance.

### Name plates and crop tags
- **Name plates** (desktop home band, from lg): paper with a 1px Field Ink border at 80%, centred text: crop name 700 at 0.8125rem, sow window in Soft Ink at 0.75rem, and an italic Leaf Ink tip under a faint rule. Connected to their plant by a 1px dashed Line Ink leader. Carries the Plate lift shadow.
- **Crop tags** (set in the topsoil just under the ground line): Deep Humus with a 1px pebble-brown border, Bedrock Parchment 600 text at 0.6875–0.75rem, optional note in Bedrock Dust.

### Depth gauge and root rail
- **Root column** (hero): a 70px-wide SVG with a centimetre gauge (21 ticks, every fifth long, 0 / 10 / 20 cm labels in 600 tabular Archivo at 11px, Topsoil Cream at 85%), a seed in Seed Ochre with a two-leaf shoot, and its root system drawing downward.
- **Root rail** (home, from 1400px): the gauge continued down the left margin from 30cm, ticks every 40px (major every 200px) in a muted brown, with a long taproot in a paper-friendly root colour that draws on scroll.
- Large desktop hero adds root systems hanging from the right-hand crops into the topsoil.

### Vine rail
From 1400px, a runner-bean vine trails down the right margin of long pages (Home, Services), drawing stem first then leaves and flowers as the visitor scrolls.

### Service glyphs
Small drawn vignettes in a 64px viewBox, in the same ink-line and flat-fill hand: planting plan with pencil, raised bed with spade, watering can mid-pour, swing-top jar of kraut, seed tray with labels. 48–64px in list rows, 80–112px on Services articles. Bullet points use a matching two-leaf sprout; the About values use 56px vignettes (community, compost, book, basket).

### Service rows (price list)
A list opened by a 2px ink rule with 1px rules between rows. Each row is a whole link: glyph, condensed title, short description in Soft Ink, and a Leaf Ink tabular price with an arrow. Hover underlines the title, lifts the glyph 2px and nudges the arrow 4px right.

### Raised bed sequence
Three panels of one bed: stage 0 is a dashed ghost of the planting over a dashed bed outline with a tape measure and notebook (the static dormant state), stage 1 is scaffold boards with seedlings, stage 2 is full harvest. All three stages, the ghost included, grow in once seen.

### Preserve jars and shelf
Five swing-top jars drawn in section (kraut, pickles, beet, carrot, kefir) with brine colours, contents, a glass highlight and paper labels, standing on a 2px-ink shelf in board ochre with brackets. The brine rises from the jar base once the shelf scrolls into view.

### Sowing calendar
A real table: 12 month columns, crop row headers in 700, a 1px rule per row. Sow months are leaf-500 bars stippled with leaf-100 dots; harvest months are tomato bars; both 2px-cornered, 16px tall (20px from sm). The current month gets a rust column header and a Rust Wash column. Month heads abbreviate to one letter on phones inside `<abbr>`. Each filled cell carries screen-reader text ("Jun: Sow"); a legend and a plain disclaimer sit underneath.

### Inputs / Fields
- **Style:** Field White, 2px border at 40% ink, square, 14px by 16px padding, 1.0625rem text, Faint Ink placeholders. Labels sit above in 700 with "(required)" / "(optional)" in Soft Ink normal weight.
- **Hover / Focus:** border to 70% ink on hover; full ink border plus a 3px rust outline at 2px offset on keyboard focus.
- **Select:** native select with appearance removed and a drawn 16px chevron.
- **Error:** a 2px rust-bordered Rust Wash block with Kiln Rust 600 text and `role="alert"`. **Success:** a 2px ink-bordered leaf-100 panel with the seed-tray glyph, announced through a polite live region that takes focus.

### Navigation
- **Desktop:** a 64px paper bar with a 1px rule at 15% ink, sticky. Sprout mark plus display wordmark at left (the mark tilts 6 degrees on hover). Links in 600 at 0.9375rem, Soft Ink to Field Ink on hover; the current page is Field Ink with a 3px leaf-500 underline and `aria-current="page"`. A compact rust "Book a free chat" closes the row.
- **Accessibility:** a "Skip to content" link (ink chip revealed on focus) targets `main#main` (`tabindex="-1"`). The menu button carries `aria-expanded` and `aria-controls`; opening it locks page scroll and focuses the first link; Escape closes it and returns focus to the button; it closes on route change.
- **Phone:** the outlined Menu/Close button opens a full-height paper sheet: display-size links (2.5rem) between 10% ink rules, the current one in Leaf Ink with a sprout icon, a full-width rust booking button, the email, and a compact garden band at the foot.
- **Index chips (Services):** wrap of in-page links, paper with a 1px 30% ink border, 3px corners, 600 at 0.9375rem; hover to full ink border on leaf-100.

### Footer
Bedrock stratum under a labelled "Bedrock" horizon: wordmark on a paper disc, a short mission line, Explore and Get in touch columns with condensed 1.375rem paper headings, a rust booking button, and a bottom rule with copyright and "Grown with love, harvested with purpose." in Bedrock Dust (extra bottom padding on phones to clear the booking bar).

### Photographs and figures
Stock photos only, always as placeholders: framed by a 2px Field Ink border on Paper Deep, lazy-loaded with explicit width and height (and `srcset` in the gallery). Captions describe exactly what the photo shows, never claim it as Patch A Mumma's work, and credit "Unsplash" at the right in Soft Ink. Gallery captions carry a Leaf Ink "Fig. n" number; an intro paragraph states that own-project photos are on their way.

### Motion
Growth only, slow and decelerating.
- **Grow in** (garden bands, on load): stems draw via stroke-dashoffset over 1.6s with `power3.out`, stagger spread 0.7s; roots draw over 1.28s from 0.2s; leaves scale from 0 out of their base (`transform-origin: 0% 50%`) over 1.12s, stagger 1.1s, from 0.25s; fruit swells from its centre over 0.96s from 0.9s on `power3.out`; nothing overshoots.
- **Grow when seen** (raised beds): the same timeline, paused until the element reaches 80% of the viewport, once.
- **Roots and vines on scroll:** scrubbed ScrollTrigger tweens with linear ease (scrub 0.6 in the hero, 0.8 on the rails).
- **Jar fill:** brine scales up from the base, 1.4s `power3.out`, 0.12s stagger, once at 80%.
- **Chrome:** page cross-fade 220ms; mobile menu drop 250ms and phone booking bar rise 300ms on `cubic-bezier(0.22, 1, 0.36, 1)`; button colour 200ms; gallery photos zoom to 1.03 over 700ms on hover.
- **Reduced motion:** every GSAP animation is registered through `gsap.matchMedia` under `(prefers-reduced-motion: no-preference)` and reverted on unmount, so drawings rest finished. Page, menu and bar transitions, gallery zoom, smooth scrolling and router scroll behaviour are all switched off under reduced motion. A global reduced-motion rule collapses CSS transition and animation durations and cancels the small hover nudges (glyph lift, arrow nudge, sprout-mark tilt).

## Do's and Don'ts

### Do:
- **Do** start every route with the garden band on its ground line and the title set in topsoil beneath it, and end every route on the bedrock footer; where clay and chalk both appear, keep clay above chalk.
- **Do** join sections with a drawn stratum edge (24px / 32px wavy horizon) and, where useful, a Label chip naming the stratum plainly.
- **Do** set headings in Archivo at 62.5% width, 850 weight, uppercase, 0.9 line-height; set subheads at 72% width, 750, mixed case; keep reading copy at normal width.
- **Do** use rust (#B23C1C, hover #92301A) for every primary action and keep a booking action one step away on every page.
- **Do** keep actions, fields, frames and plates square with 2px Field Ink borders, and use thin ink rules plus plain price rows for lists.
- **Do** draw new artwork as SVG in the Line Ink stroke and flat-fill hand, extending `src/art/plants.js` or the glyph set, and mark it `aria-hidden="true" focusable="false"`.
- **Do** register every animation through `useMotion` / `gsap.matchMedia` so reduced motion shows the finished drawing.
- **Do** label stock photos as stock ("Unsplash"), caption what is actually shown, and keep illustrative testimonials labelled as illustrative.
- **Do** set prices, gauge numbers and figure numbers in tabular lining figures.

### Don't:
- **Don't** bring back the old cream, Playfair and forest-green look; it is the anti-reference this world replaced.
- **Don't** ship generated raster artwork; the artwork is hand-built SVG.
- **Don't** build page structure from floating or raised cards and drop shadows; the only shadow is the name plate's lift, and framed panels (booking, success) stay flat and square.
- **Don't** add a third filled-button colour: rust is for booking and primary actions, ink is for form submit only, and rust stays off anything but actions, focus, errors and the current-month marker.
- **Don't** condense body copy or set paragraphs in uppercase.
- **Don't** add decorative motion that is not growth (no parallax drifts, bounces or attention loops); interface chrome keeps to short functional transitions (200–300ms), and every new animation goes through the reduced-motion gate.
- **Don't** present a stock photo, placeholder figure or illustrative quote as Patch A Mumma's own work.
