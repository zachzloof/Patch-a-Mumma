# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Everyday households across Essex (Chelmsford, Braintree, Colchester and around) who want to grow some of their own food but are not gardeners. Typical situation: a lawn, patio or tired back garden; little time; no idea where to start; some unease about what is in supermarket food. Most arrive on a phone, often from social or word of mouth, and decide in one sitting whether to book a free chat.

Secondary: people who already grow and have a glut to deal with (fermentation & preservation, workshops).

## Product Purpose

Patch A Mumma turns ordinary gardens into productive food patches and teaches the household to keep them going. The site exists to get a visitor from "I couldn't do that" to booking a free consultation. Success is a booked Calendly slot or a sent enquiry.

The message is food independence: grow something real, know what is in your food.

## Positioning

A hands-on, local, Penny-led service that covers the whole loop from bare ground to a full pantry: design, build, maintain, then ferment and preserve the harvest. Most garden services stop at planting or at lawn care; this one carries on into the kitchen and the jar.

## Operating Context

- First contact is a free consultation, booked via Calendly (`https://calendly.com/penny-patch-a-mumma/30min`) or an enquiry via the Formspree form (`https://formspree.io/f/xqejrjvn`, fields: name, email, phone, service, message).
- Direct email: penny@patch-a-mumma.co.uk. Base: Chelmsford, Essex, UK.
- Seasonal work: visits, planting, rotation, harvest, preserving sessions, small group workshops.
- Deployed as a static SPA (Vite build, nginx in Docker).

## Capabilities and Constraints

- Stack is fixed: Vue 3 + Vite + Tailwind CSS v3 + Vue Router. GSAP permitted for animation. Any other stack change, including a Tailwind upgrade, needs the owner's approval.
- Routes: Home, Services, About, Gallery, Contact.
- Services and prices (UK market, keep verbatim):
  - Garden Design & Planning: From £95
  - Installation & Planting: Quote on request
  - Ongoing Maintenance: From £55/visit
  - Fermentation & Preservation: From £80/session
  - Workshops: From £40/person
- Booking a free consultation must be one step away on every page.
- Enquiry replies promised "within one business day".

## Brand Commitments

- Name: Patch A Mumma. Penny-led; the voice stays "we", warm and plain-spoken, never preachy or anxious ("We're not here to preach or make anyone anxious").
- Recurring lines worth keeping: "Grow something real", "Simple as seeds in soil", "Grown with love, harvested with purpose", "It started with a questionable tomato", "a quiet act of independence".
- Owner's brief for the redesign: earthy, plants everywhere: seeds, growth, fruit, veg, vines; intricate and detailed, portfolio-grade; must not read as generic AI output.

## Evidence on Hand

- True: organic and chemical-free practice ("100% organic & chemical free"); based in Chelmsford, serving Essex.
- Not confirmed: "50+ gardens planted" (do not present as fact; placeholder only, clearly marked, or remove).
- Testimonials (Sarah M., James R., Lily T.) are illustrative and must stay labelled as such until real ones exist.
- Imagery: all current photos are Unsplash stock. No real project photos confirmed. Design must not depend on real photography; any stock used is placeholder.
- Social links (Instagram, Facebook) currently point to `#`; no real handles on file.

## Product Principles

1. Warmth before spectacle: every flourish must still feel friendly and achievable to a non-gardener on a phone.
2. The free consultation is always one step away.
3. Show the whole loop (soil to jar) because that is what nobody else offers.
4. Honest proof only: real facts stated plainly, placeholders labelled as placeholders.
5. Keep all real content and wiring: services, prices, contact details, Formspree, Calendly.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Phone-first. Fully honour `prefers-reduced-motion`; no flashing or strobing.
