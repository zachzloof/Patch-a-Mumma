<script setup>
import { RouterLink } from 'vue-router'
import ServiceGlyph from '../art/ServiceGlyph.vue'
import { services } from '../../data/services.js'
</script>

<template>
  <section id="what-we-do" class="scroll-mt-20 py-16 md:py-24" aria-labelledby="wwd-title">
    <div class="page-x">
      <div class="grid gap-6 md:grid-cols-12 md:items-end">
        <h2 id="wwd-title" class="display text-[3.25rem] md:col-span-6 md:text-[4.75rem]">What we do</h2>
        <p class="max-w-[46ch] text-[1.125rem] leading-relaxed text-ink-soft md:col-span-6 md:pb-2">
          The whole loop, from bare ground to a full pantry. Pick one part or all of it; the first chat is always free.
        </p>
      </div>

      <ul class="mt-10 border-t-2 border-ink md:mt-14">
        <li v-for="s in services" :key="s.id" class="border-b border-ink/20">
          <RouterLink
            :to="`/services#${s.id}`"
            class="group grid grid-cols-[3.25rem_1fr] items-start gap-x-4 gap-y-1 py-6 md:grid-cols-[4.5rem_minmax(0,1.1fr)_minmax(0,1.4fr)_auto] md:items-center md:gap-x-8 md:py-7"
          >
            <ServiceGlyph :name="s.glyph" class="row-span-2 h-12 w-12 transition-transform duration-300 group-hover:-translate-y-0.5 md:row-span-1 md:h-16 md:w-16" />
            <h3 class="condensed text-[1.625rem] text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4 md:text-[2rem]">
              {{ s.title }}
            </h3>
            <p class="col-start-2 text-[1rem] leading-snug text-ink-soft md:col-start-auto md:text-[1.0625rem]">{{ s.short }}</p>
            <p class="figures col-start-2 mt-2 flex items-center gap-3 text-[1.0625rem] font-bold text-leaf-700 md:col-start-auto md:mt-0 md:justify-end md:whitespace-nowrap md:text-[1.125rem]">
              {{ s.price }}
              <svg class="h-5 w-5 text-ink transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </p>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>
