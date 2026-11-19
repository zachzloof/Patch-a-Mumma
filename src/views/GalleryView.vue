<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/shared/PageHero.vue'

// Stock photos (Unsplash) standing in until Patch A Mumma's own project photos
// are ready. Captions describe the scene, never claim it as our work.
const images = [
  { id: '1416879595882-3373a0480b5b', h: 750, alt: 'A trowel resting in freshly turned soil' },
  { id: '1530836369250-ef72a3f5cda8', h: 500, alt: 'Pricking out seedlings by hand' },
  { id: '1464226184884-fa280b87c399', h: 700, alt: 'A fresh harvest: carrots, gourds, beans and chillies' },
  { id: '1594282486552-05b4d80fbb9f', h: 600, alt: 'Cabbages hearting up in a bed' },
  { id: '1466692476868-aef1dfb1e735', h: 500, alt: 'Seedlings coming up in a module tray' },
  { id: '1622383563227-04401ab4e5ea', h: 750, alt: 'A seedling lifted with its root ball' },
  { id: '1589927986089-35812388d1f4', h: 500, alt: 'Carrots, pulled and washed' },
  { id: '1523348837708-15d4a09cfac2', h: 700, alt: 'Seedlings potted on, ready to plant out' },
  { id: '1576045057995-568f588f82fb', h: 750, alt: 'Spinach, freshly cut and bunched' },
]
const src = (img, w = 600) => `https://images.unsplash.com/photo-${img.id}?auto=format&fit=crop&w=${w}&h=${Math.round((img.h * w) / 600)}&q=72`
</script>

<template>
  <div>
    <PageHero title="Gallery" subtitle="What a food patch can look like, from first seedling to full jar." :seed="11" />

    <section class="py-14 md:py-20" aria-label="Photos">
      <div class="page-x">
        <p class="max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          Photos of our own Essex gardens are on their way. Until then, these stock photos show the kind of patches,
          harvests and preserves we help people grow.
        </p>

        <div class="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          <figure v-for="(img, i) in images" :key="img.id" class="mb-8 break-inside-avoid">
            <div class="overflow-hidden border-2 border-ink bg-paper-deep">
              <img
                :src="src(img)"
                :srcset="`${src(img, 400)} 400w, ${src(img, 600)} 600w, ${src(img, 900)} 900w`"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                :alt="img.alt"
                width="600"
                :height="img.h"
                loading="lazy"
                decoding="async"
                class="block h-auto w-full transition-transform duration-700 ease-out hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100"
              />
            </div>
            <figcaption class="mt-2.5 flex items-baseline justify-between gap-4 text-[0.9375rem]">
              <span class="text-ink"><span class="figures mr-2 font-bold text-leaf-700">Fig. {{ i + 1 }}</span>{{ img.alt }}</span>
              <span class="shrink-0 text-[0.8125rem] text-ink-soft">Unsplash</span>
            </figcaption>
          </figure>
        </div>

        <div class="mt-8 flex flex-col items-start gap-4 border-t-2 border-ink pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p class="condensed text-[1.75rem]">Want your garden to be next?</p>
          <RouterLink to="/contact#book" class="btn-rust w-full sm:w-auto">Book a free chat</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
