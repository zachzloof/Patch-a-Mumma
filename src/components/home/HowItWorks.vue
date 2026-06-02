<template>
  <section class="py-20 bg-forest-900 text-cream">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Heading -->
      <div class="text-center mb-16">
        <p class="font-body text-sm font-bold text-forest-600 uppercase tracking-widest mb-3">The Process</p>
        <h2 class="font-heading text-4xl md:text-5xl font-bold text-cream leading-tight">
          Simple as seeds in soil.
        </h2>
      </div>

      <!-- Steps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Connecting line (desktop) -->
        <div class="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-forest-700" />

        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="text-center relative"
        >
          <!-- Number circle -->
          <div class="w-20 h-20 rounded-full bg-forest-800 border-2 border-forest-600 flex items-center justify-center mx-auto mb-6 relative z-10">
            <span class="font-heading text-2xl font-bold text-forest-600">{{ index + 1 }}</span>
          </div>
          <h3 class="font-heading text-2xl font-bold text-cream mb-3">{{ step.title }}</h3>
          <p class="font-body text-forest-200/80 leading-relaxed max-w-xs mx-auto">{{ step.description }}</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-14">
        <RouterLink
          to="/contact"
          class="btn-earth py-4 px-10 rounded-full text-base"
        >
          Start Your Garden Journey
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const steps = [
  {
    title: 'We Visit',
    description:
      'We come to your space, listen to what you want, and assess the soil, sunlight, and layout to understand what\'s possible.',
  },
  {
    title: 'We Plant',
    description:
      'We design a custom food garden for your space and get our hands dirty — building beds, preparing soil, and planting your first crops.',
  },
  {
    title: 'You Grow',
    description:
      'Your garden is yours. We\'re here to support you every step of the way — through maintenance visits, workshops, and harvesting together.',
  },
]
</script>
