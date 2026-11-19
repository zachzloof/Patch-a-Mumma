<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/shared/PageHero.vue'
import ServiceGlyph from '../components/art/ServiceGlyph.vue'
import VineRail from '../components/art/VineRail.vue'
import { services } from '../data/services.js'
import SoilFill from '../components/art/SoilFill.vue'
import StrataEdge from '../components/art/StrataEdge.vue'
</script>

<template>
  <div>
    <PageHero
      title="Services & prices"
      subtitle="Everything you need to grow, harvest, and preserve your own food."
      :seed="3"
    />

    <!-- quick index -->
    <nav class="page-x pt-10" aria-label="Services on this page">
      <ul class="flex flex-wrap gap-2.5">
        <li v-for="s in services" :key="s.id">
          <a :href="`#${s.id}`" class="inline-flex items-center gap-2 rounded-[3px] border border-ink/30 bg-paper min-h-11 px-3.5 py-2 text-[0.9375rem] font-semibold hover:border-ink hover:bg-leaf-100">
            {{ s.title }}
          </a>
        </li>
      </ul>
    </nav>

    <div class="relative">
      <article
        v-for="(s, i) in services"
        :id="s.id"
        :key="s.id"
        class="scroll-mt-20"
        :aria-labelledby="`${s.id}-title`"
      >
        <div class="page-x grid gap-8 border-b border-ink/15 py-14 md:grid-cols-12 md:gap-10 md:py-20" :class="i === 0 ? 'pt-12' : ''">
          <div class="md:col-span-5">
            <ServiceGlyph :name="s.glyph" class="h-20 w-20 md:h-28 md:w-28" />
            <h2 :id="`${s.id}-title`" class="display mt-5 text-[2.75rem] md:text-[3.75rem]">{{ s.title }}</h2>
            <p class="mt-3 text-[1.1875rem] font-semibold text-leaf-700">{{ s.tagline }}</p>
            <p class="figures mt-6 text-[1.75rem] font-extrabold text-ink" style="font-stretch: 75%">{{ s.price }}</p>
            <RouterLink to="/contact#book" class="btn-rust mt-5 w-full sm:w-auto">Book this service</RouterLink>
          </div>
          <div class="md:col-span-7 md:pt-2">
            <p class="max-w-[60ch] text-[1.125rem] leading-relaxed text-ink-soft">{{ s.description }}</p>
            <h3 class="condensed mt-8 text-[1.375rem]">What's included</h3>
            <ul class="mt-3 border-t border-ink/20">
              <li v-for="item in s.includes" :key="item" class="flex items-start gap-3 border-b border-ink/10 py-3 text-[1.0625rem]">
                <svg class="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 18v-7" stroke="#173D1F" stroke-width="1.6" stroke-linecap="round" />
                  <path d="M10 12.5C6.8 12.5 5 10.4 5 7.6c3 0 5 2 5 4.9z" fill="#8DBF5A" stroke="#173D1F" stroke-width="1.2" />
                  <path d="M10 11.2c0-3.3 2.2-5.3 5.4-5.3 0 3.1-2.2 5.3-5.4 5.3z" fill="#4E8E35" stroke="#173D1F" stroke-width="1.2" />
                </svg>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </article>
      <VineRail :seed="13" />
    </div>

    <section aria-labelledby="unsure-title">
      <StrataEdge top="#FAF9F4" bottom="#ECE6D7" :seed="26" line="#CFC6AF" label="Chalk" />
      <div class="relative overflow-hidden">
      <SoilFill kind="chalk" :seed="27" />
      <div class="page-x relative flex flex-col gap-6 pb-24 pt-14 md:flex-row md:items-end md:justify-between md:pb-28 md:pt-16">
        <div>
          <h2 id="unsure-title" class="display text-[2.75rem] md:text-[4rem]">Not sure where to start?</h2>
          <p class="mt-3 max-w-[50ch] text-[1.125rem] text-ink-soft">
            Book a free consultation and we'll figure out together what makes sense for your space and goals.
          </p>
        </div>
        <RouterLink to="/contact#book" class="btn-rust shrink-0">Book a free chat</RouterLink>
      </div>
      </div>
    </section>
  </div>
</template>
