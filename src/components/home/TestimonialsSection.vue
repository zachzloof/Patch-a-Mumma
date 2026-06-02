<script setup>
const testimonials = [
  {
    quote:
      'Patch A Mumma completely transformed our backyard. We went from a patchy lawn to a proper kitchen garden in a few weeks. The kids love harvesting tomatoes straight off the vine.',
    name: 'Sarah M.',
    location: 'Chelmsford, Essex',
    initials: 'SM',
  },
  {
    quote:
      'I had no idea where to start with growing my own food. The team made it so easy — they planned everything, did all the hard work, and taught me how to keep it going.',
    name: 'James R.',
    location: 'Braintree, Essex',
    initials: 'JR',
  },
  {
    quote:
      'The fermentation workshop was a game changer. I now make my own sauerkraut, pickles, and even kombucha. Nothing goes to waste from the garden anymore.',
    name: 'Lily T.',
    location: 'Colchester, Essex',
    initials: 'LT',
  },
]
</script>

<template>
  <section class="py-20 bg-cream-dark">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Heading -->
      <div class="text-center mb-14">
        <p class="font-body text-sm font-bold text-forest-700 uppercase tracking-widest mb-3">What People Say</p>
        <h2 class="font-heading text-4xl md:text-5xl font-bold text-bark leading-tight">
          Real gardens.<br />Real harvests.
        </h2>
      </div>

      <!-- Testimonial cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="t in testimonials"
          :key="t.name"
          class="bg-white rounded-2xl p-8 shadow-sm border border-cream-dark"
        >
          <!-- Quote marks -->
          <svg class="w-8 h-8 text-forest-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <p class="font-body text-bark/80 leading-relaxed mb-6 italic">{{ t.quote }}</p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center flex-shrink-0">
              <span class="font-heading text-sm font-bold text-cream">{{ t.initials }}</span>
            </div>
            <div>
              <p class="font-body font-bold text-bark text-sm">{{ t.name }}</p>
              <p class="font-body text-bark/60 text-xs">{{ t.location }}</p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-xs text-bark/40 font-body mt-6">* Testimonials are illustrative examples — we'd love yours to be next.</p>
    </div>
  </section>
</template>
