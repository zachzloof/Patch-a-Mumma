<script setup>
import { RouterLink } from 'vue-router'
import GardenBand from '../art/GardenBand.vue'
import SoilFill from '../art/SoilFill.vue'
import StrataEdge from '../art/StrataEdge.vue'

// Inner-page opening: a shorter garden band, the page title set in the topsoil.
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  seed: { type: Number, default: 0 },
  cta: { type: Boolean, default: true },
})
</script>

<template>
  <section aria-labelledby="page-title">
    <GardenBand layout="compact" :seed="seed" :plates="false" />
    <div class="relative -mt-px overflow-hidden">
      <SoilFill kind="topsoil" :seed="17 + seed" />
      <div class="page-x relative flex flex-col gap-6 pb-12 pt-6 md:flex-row md:items-end md:justify-between md:pb-14 md:pt-8">
        <div>
          <h1 id="page-title" class="display text-[3.4rem] text-paper sm:text-[4.5rem] lg:text-[5.5rem]">{{ title }}</h1>
          <p v-if="subtitle" class="mt-4 max-w-[46ch] text-[1.1875rem] leading-relaxed text-[#F3EAD6]">{{ subtitle }}</p>
        </div>
        <RouterLink v-if="cta" to="/contact#book" class="btn-rust shrink-0 sm:self-start md:self-end">Book a free chat</RouterLink>
      </div>
    </div>
    <StrataEdge top="#3A2518" bottom="#FAF9F4" :seed="40 + seed" line="#2A1A10" />
  </section>
</template>
