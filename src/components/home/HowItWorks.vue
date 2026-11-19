<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import RaisedBed from '../art/RaisedBed.vue'
import { useMotion, growWhenSeen } from '../../composables/useGrowth.js'

const steps = [
  {
    title: 'We visit',
    description:
      "We come to your space, listen to what you want, and assess the soil, sunlight, and layout to understand what's possible.",
  },
  {
    title: 'We plant',
    description:
      'We design a custom food garden for your space and get our hands dirty: building beds, preparing soil, and planting your first crops.',
  },
  {
    title: 'You grow',
    description:
      "Your garden is yours. We're here to support you every step of the way, through maintenance visits, workshops, and harvesting together.",
  },
]

const beds = ref([])
const root = ref(null)
useMotion(root, () => beds.value.forEach((el) => growWhenSeen(el)))
</script>

<template>
  <section ref="root" class="py-16 md:py-24" aria-labelledby="how-title">
    <div class="page-x">
      <h2 id="how-title" class="display text-[3.25rem] md:text-[4.75rem]">Simple as seeds in soil.</h2>
      <p class="mt-4 max-w-[52ch] text-[1.125rem] leading-relaxed text-ink-soft">
        One bed, three moments. You don't need to know a thing about gardening to start.
      </p>

      <ol class="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-0">
        <li v-for="(step, i) in steps" :key="step.title" class="md:px-6 md:first:pl-0 md:last:pr-0">
          <div :ref="(el) => el && (beds[i] = el)">
            <RaisedBed :stage="i" />
          </div>
          <h3 class="condensed mt-5 text-[2rem]">{{ step.title }}</h3>
          <p class="mt-2 max-w-[38ch] leading-relaxed text-ink-soft">{{ step.description }}</p>
        </li>
      </ol>

      <RouterLink to="/contact#book" class="btn-rust mt-12 w-full sm:w-auto">Start with a free chat</RouterLink>
    </div>
  </section>
</template>
