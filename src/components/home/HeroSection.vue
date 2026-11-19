<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import GardenBand from '../art/GardenBand.vue'
import SoilFill from '../art/SoilFill.vue'
import StrataEdge from '../art/StrataEdge.vue'
import RootColumn from '../art/RootColumn.vue'
import Plant from '../art/Plant.vue'

// Roots hanging from the right-hand crops of the desktop garden band (x in its 1440 grid).
const spread = [
  { x: 940, d: 210, s: 81 },
  { x: 982, d: 170, s: 82 },
  { x: 1022, d: 240, s: 83 },
  { x: 1110, d: 110, s: 84 },
  { x: 1236, d: 330, s: 85 },
  { x: 1362, d: 400, s: 86 },
]
import { useMotion, rootsOnScroll } from '../../composables/useGrowth.js'

const soil = ref(null)
useMotion(soil, (el) => rootsOnScroll(el, { start: 'top 95%', end: 'bottom 20%' }))
</script>

<template>
  <section aria-labelledby="hero-title">
    <GardenBand layout="home" />

    <div ref="soil" class="relative -mt-px overflow-hidden text-paper">
      <SoilFill kind="topsoil" :seed="7" />
      <svg
        class="pointer-events-none absolute left-0 hidden w-full lg:block"
        style="top: 0"
        viewBox="0 0 1440 560"
        aria-hidden="true"
        focusable="false"
      >
        <Plant v-for="r in spread" :key="r.x" kind="rootSystem" :x="r.x" :y="0" :seed="r.s" :size="r.d" />
      </svg>
      <div class="page-x relative flex gap-3 pb-7 pt-3 sm:gap-8 md:pb-9 md:pt-5">
        <RootColumn :depth="300" :seed="12" class="-ml-1 mt-1 shrink-0 md:ml-0" />
        <div class="min-w-0 max-w-[50rem] pt-3 md:pt-4">
          <h1 id="hero-title" class="display text-[3.25rem] text-paper sm:text-[5rem] lg:text-[5.75rem]">
            Grow something real.
          </h1>
          <p class="mt-4 max-w-[33ch] text-[1.125rem] leading-[1.45] text-[#F3EAD6] sm:max-w-[50ch] sm:text-[1.3125rem]">
            We turn ordinary Essex gardens into food patches, then help you keep them going, from soil to jar.
          </p>
          <div class="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <RouterLink to="/contact#book" data-book-cta class="btn-rust w-full sm:w-auto sm:px-9">
              Book a free chat
              <svg class="h-5 w-5" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </RouterLink>
            <a href="#what-we-do" class="link text-[1.0625rem] text-paper decoration-[#C08A3E] hover:decoration-paper">
              See what we do
            </a>
          </div>
        </div>
      </div>
    </div>

    <StrataEdge top="#3A2518" bottom="#C08A3E" :seed="4" line="#2A1A10" label="Clay subsoil" />
    <div class="relative overflow-hidden">
      <SoilFill kind="clay" :seed="9" />
      <ul class="page-x relative flex flex-col gap-x-10 gap-y-2 py-4 text-[1rem] font-bold text-humus-dark sm:flex-row sm:flex-wrap sm:items-center sm:py-5">
        <li class="flex items-center gap-2.5">
          <svg class="h-5 w-5 shrink-0" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 18V9m0 3C6.5 12 5 9.5 5 7c2.6 0 5 1.8 5 5zm0-2c0-3.4 2.4-5 5.4-5 0 3.2-2.4 5-5.4 5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /></svg>
          100% organic and chemical-free
        </li>
        <li class="flex items-center gap-2.5">
          <svg class="h-5 w-5 shrink-0" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 18s-5.5-5.2-5.5-9.3a5.5 5.5 0 0 1 11 0C15.5 12.8 10 18 10 18z" fill="none" stroke="currentColor" stroke-width="1.8" /><circle cx="10" cy="8.6" r="1.9" fill="currentColor" /></svg>
          Based in Chelmsford, working across Essex
        </li>
        <li class="flex items-center gap-2.5">
          <svg class="h-5 w-5 shrink-0" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3h8M7 3v3.5L4.5 9v7.5h11V9L13 6.5V3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /><path d="M4.5 12h11" stroke="currentColor" stroke-width="1.8" /></svg>
          From bare ground to a full pantry
        </li>
      </ul>
    </div>
    <StrataEdge top="#C08A3E" bottom="#FAF9F4" :seed="8" line="#9C6A2A" />
  </section>
</template>
