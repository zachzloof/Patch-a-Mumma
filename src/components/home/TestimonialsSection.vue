<script setup>
import SoilFill from '../art/SoilFill.vue'
import StrataEdge from '../art/StrataEdge.vue'
// Illustrative examples until real reviews exist; the label below must stay.
const testimonials = [
  {
    quote:
      'Patch A Mumma completely transformed our back garden. We went from a patchy lawn to a proper kitchen garden in a few weeks. The kids love harvesting tomatoes straight off the vine.',
    name: 'Sarah M.',
    location: 'Chelmsford',
  },
  {
    quote:
      'I had no idea where to start with growing my own food. The team made it so easy. They planned everything, did all the hard work, and taught me how to keep it going.',
    name: 'James R.',
    location: 'Braintree',
  },
  {
    quote:
      'The fermentation workshop was a game changer. I now make my own sauerkraut, pickles, and even kombucha. Nothing goes to waste from the garden anymore.',
    name: 'Lily T.',
    location: 'Colchester',
  },
]
</script>

<template>
  <section aria-labelledby="say-title">
    <StrataEdge top="#FAF9F4" bottom="#C08A3E" :seed="51" line="#9C6A2A" label="Clay" />
    <div class="relative overflow-hidden">
      <SoilFill kind="clay" :seed="23" />
      <div class="page-x relative py-16 md:py-24">
        <h2 id="say-title" class="display text-[3rem] text-humus-dark md:text-[4rem]">What a patch can give you</h2>
        <p class="mt-4 max-w-[60ch] text-[1rem] font-semibold text-humus-dark">
          These are illustrative examples while our first clients' reviews come in. We'd love yours to be next.
        </p>
        <div class="mt-10 grid gap-10 md:mt-12 md:grid-cols-3">
          <figure v-for="t in testimonials" :key="t.name" class="border-t-2 border-humus-dark pt-6">
            <svg class="h-7 w-9 text-humus-dark" viewBox="0 0 36 28" aria-hidden="true"><path d="M2 26V16C2 8 6 3 14 1l1.6 3.4C11 6 9 9 9 13h6v13zm19 0V16c0-8 4-13 12-15l1.6 3.4C30 6 28 9 28 13h6v13z" fill="currentColor" /></svg>
            <blockquote class="mt-4 text-[1.1875rem] leading-relaxed text-humus-dark">{{ t.quote }}</blockquote>
            <figcaption class="mt-5 text-[0.9375rem] text-humus-dark">
              <span class="font-bold">{{ t.name }}</span>, {{ t.location }}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
