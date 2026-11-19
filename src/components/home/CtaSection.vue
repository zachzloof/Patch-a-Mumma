<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import SoilFill from '../art/SoilFill.vue'
import StrataEdge from '../art/StrataEdge.vue'
import PreserveJar from '../art/PreserveJar.vue'
import { useMotion, gsap } from '../../composables/useGrowth.js'

const jars = [
  { contents: 'kraut', label: 'Kraut', seed: 1 },
  { contents: 'pickles', label: '', seed: 2 },
  { contents: 'beet', label: 'Beet', seed: 3 },
  { contents: 'carrot', label: '', seed: 4 },
  { contents: 'kefir', label: 'Kefir', seed: 5 },
]

const shelf = ref(null)
useMotion(shelf, (el) => {
  gsap.from(el.querySelectorAll('.jar-fill'), {
    scaleY: 0,
    transformOrigin: '50% 100%',
    duration: 1.4,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: el, start: 'top 80%', once: true },
  })
})
</script>

<template>
  <section aria-labelledby="larder-title">
    <StrataEdge top="#C08A3E" bottom="#ECE6D7" :seed="21" line="#9C6A2A" label="Chalk · the larder" />
    <div class="relative overflow-hidden">
      <SoilFill kind="chalk" :seed="13" />
      <div class="page-x relative grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div class="lg:col-span-5">
          <h2 id="larder-title" class="display text-[3rem] md:text-[4.25rem]">From soil to jar.</h2>
          <p class="mt-5 max-w-[44ch] text-[1.125rem] leading-relaxed text-ink-soft">
            A good harvest can be overwhelming. We'll show you how to ferment, pickle and preserve the glut, so
            nothing from your garden goes to waste and the pantry stays full all winter.
          </p>
          <RouterLink to="/services#fermentation" class="link mt-6 inline-block text-[1.0625rem] text-ink">
            Fermentation &amp; preservation, from £80 a session
          </RouterLink>
        </div>

        <!-- the cellar shelf -->
        <div ref="shelf" class="lg:col-span-7">
          <div class="grid grid-cols-5 items-end gap-2 px-2 sm:gap-4 sm:px-6">
            <PreserveJar v-for="j in jars" :key="j.seed" v-bind="j" />
          </div>
          <div class="h-4 border-2 border-ink bg-[#C9A26B]" aria-hidden="true" />
          <div class="mx-6 flex justify-between" aria-hidden="true">
            <span class="h-8 w-3 border-2 border-t-0 border-ink bg-[#B58A4E]" />
            <span class="h-8 w-3 border-2 border-t-0 border-ink bg-[#B58A4E]" />
          </div>
        </div>
      </div>
    </div>

    <!-- the close, still in the chalk -->
    <div class="relative -mt-px overflow-hidden">
      <SoilFill kind="chalk" :seed="14" />
      <div class="page-x relative">
        <div class="flex flex-col gap-8 border-t-2 border-ink py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <h2 class="display text-[3rem] md:text-[4.5rem]">Ready to grow something real?</h2>
            <p class="mt-4 max-w-[48ch] text-[1.125rem] leading-relaxed text-ink-soft">
              Book a free consultation and let's talk about what's possible in your space. No pressure, just a
              conversation about your garden and your goals.
            </p>
          </div>
          <div class="flex shrink-0 flex-col gap-4 sm:flex-row md:flex-col lg:flex-row">
            <RouterLink to="/contact#book" class="btn-rust">Book a free chat</RouterLink>
            <RouterLink to="/services" class="btn-line">Browse services</RouterLink>
          </div>
        </div>
      </div>
      <div class="h-10 md:h-14" aria-hidden="true" />
    </div>
  </section>
</template>
