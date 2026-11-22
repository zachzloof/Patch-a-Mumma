<script setup>
import { RouterLink } from 'vue-router'
import SoilFill from '../art/SoilFill.vue'
import SproutMark from '../art/SproutMark.vue'
import StrataEdge from '../art/StrataEdge.vue'
import { CONTACT } from '../../data/services.js'

const year = new Date().getFullYear()
const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]
</script>

<template>
  <footer class="relative text-[#E9DFC9]">
    <StrataEdge top="transparent" bottom="#241710" :seed="77" line="#120A05" label="Bedrock" label-tone="light" class="absolute inset-x-0 -top-6 sm:-top-8" />
    <div class="absolute inset-0 overflow-hidden"><SoilFill kind="bedrock" :seed="31" /></div>
    <div class="page-x relative grid gap-10 pb-12 pt-14 md:grid-cols-12 md:pb-14">
      <div class="md:col-span-5">
        <RouterLink to="/" class="inline-flex min-h-11 items-center gap-2 text-paper" aria-label="Patch A Mumma, home">
          <span class="grid h-10 w-10 place-items-center rounded-full bg-paper"><SproutMark class="h-8 w-8 text-leaf-700" /></span>
          <span class="display text-[2rem]">Patch A Mumma</span>
        </RouterLink>
        <p class="mt-5 max-w-[38ch] leading-relaxed">
          Helping everyday people across Essex reclaim their food through vegetable gardens, fruit trees, herbs, and
          the old art of fermentation.
        </p>
      </div>

      <nav class="md:col-span-3" aria-label="Footer">
        <h2 class="condensed text-[1.375rem] text-paper">Explore</h2>
        <ul class="mt-2">
          <li v-for="l in links" :key="l.to">
            <RouterLink :to="l.to" class="inline-flex min-h-11 items-center hover:text-paper hover:underline">{{ l.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="md:col-span-4">
        <h2 class="condensed text-[1.375rem] text-paper">Get in touch</h2>
        <ul class="mt-2">
          <li><a :href="`mailto:${CONTACT.email}`" class="inline-flex min-h-11 items-center break-all hover:text-paper hover:underline">{{ CONTACT.email }}</a></li>
          <li class="py-2.5">{{ CONTACT.place }}</li>
        </ul>
        <RouterLink to="/contact#book" data-book-cta class="btn-rust mt-6">Book a free chat</RouterLink>
      </div>
    </div>
    <div class="relative border-t border-[#4A3426] text-[0.875rem] text-[#CDBFA3]">
      <div class="page-x flex flex-col justify-between gap-2 pt-5 sm:flex-row">
        <p>© {{ year }} Patch A Mumma. All rights reserved.</p>
        <p>Grown with love, harvested with purpose.</p>
      </div>
      <!-- pb-28 clears the fixed mobile booking bar (NavBar.vue) -->
      <div class="page-x pb-28 md:pb-3">
        <zloof-credit client="patch-a-mumma"></zloof-credit>
      </div>
    </div>
  </footer>
</template>
