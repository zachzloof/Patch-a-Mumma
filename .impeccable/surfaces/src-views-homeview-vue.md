---
version: 1
slug: "src-views-homeview-vue"
primary_target: "src/views/HomeView.vue"
related_targets: ["src/views/ServicesView.vue","src/views/AboutView.vue","src/views/GalleryView.vue","src/views/ContactView.vue","src/App.vue"]
---

# Surface brief: Patch A Mumma marketing site (all routes)

Scope: Home, Services, About, Gallery, Contact, plus shared nav/footer. Mode: Persuade.
Audience: Essex households, non-gardeners, mostly on phones. Action: book a free consultation (Calendly) or send an enquiry (Formspree). Proof: real prices, organic practice, Chelmsford base; testimonials stay labelled illustrative; stock photos are placeholders.
Constraints: Vue 3 + Vite + Tailwind v3 + Vue Router, GSAP allowed. All artwork hand-built SVG; no generated rasters ship. WCAG 2.2 AA, reduced motion honoured.

Chosen direction: user-steered fusion of the rolled direction (The Soil Section) and the category standard played straight, composition "A · The ground line" (reference: .impeccable/mocks/decision/hybrid-A.png, approved by the user as the composition; artwork medium changed by the user to hand-built SVG, so the build is code-led).

## Direction contract

THESIS: Every page is one continuous cut through an Essex kitchen-garden bed, read straight: a dense drawn patch standing on a ground line, the offer set into the topsoil, and each further section a deeper stratum. It refuses the photo hero over three service cards.

OWN-WORLD: White survey-paper ground; deep ink green for type and linework; flat vector planting (bean canes with scarlet flowers, tomatoes, squash vine, carrots, beetroot) in fine ink-green line with flat fills; topsoil umber, clay ochre, chalk strata with wavy hand-drawn edges and stipple; a centimetre depth gauge; Archivo, heavy condensed caps for display, normal width for reading; square rust-red actions; thin rules and plain price rows.

STORY: The visitor sees a real food patch, learns we plan, build, look after and preserve it, sees honest prices, believes a non-gardener can do this, and books a free chat.

FIRST VIEWPORT: Phone: white bar (wordmark left, outlined Menu right); garden band about 300px tall across the width on a wavy ground line; topsoil band below holding a depth gauge (0/10/20 cm) and a seed with roots at left, the headline in white condensed caps, the subline, a wide rust "Book a free chat", and "See what we do"; clay edge peeking at the bottom carrying "100% organic and chemical-free". Desktop: same stack at full width with a wider, denser garden and the copy in the left two thirds.

FORM: Hybrid A of the user-steered fusion (rolled candidate 7, The Soil Section, with the canon); seed:31b98512abe4b5e3. Signature interaction: the garden grows in on load (stems draw, leaves unfurl from their stems) and roots draw downward as the visitor scrolls through the strata (GSAP ScrollTrigger, scrubbed); unplanted beds sit as dashed ghost outlines that fill in. Motion grammar: growth only, slow ease-out, nothing bounces; reduced motion shows every final state at once.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Raises carried from the roll
- One continuous drawing: sections are strata of one section, never floating cards.
- Dormant states drawn: ghost beds and unsprouted seeds.
- A named cast: each drawn crop gets a name plate with sow month and a one-line note.
- Labels set along the line they describe.
- Wayfinding is reading: strata named plainly for what they hold.

## Build path record
- `.impeccable/config.json` keeps the user's recorded standing default (`buildPath: comp`). This build ran code-led for this session only: after the comp round, the user chose hand-built SVG artwork because generated images "look obvious", which rules out raster plates. Per new-work, a mid-round flip binds the session and is not written back without asking; there is therefore no `.impeccable/build/state.json`. The approved composition reference is `.impeccable/mocks/decision/hybrid-A.png` (user-picked).

## Unresolved
- Real project photography, real testimonials, social handles.
