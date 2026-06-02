<script setup>
import { RouterLink } from 'vue-router'

const services = [
  {
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    title: 'Design & Installation',
    description:
      'We assess your space, plan a custom food garden, and build everything from the ground up — raised beds, soil prep, companion planting, and more.',
    link: '/services',
  },
  {
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    title: 'Ongoing Maintenance',
    description:
      'Regular visits to keep your garden thriving through every season — pruning, feeding, pest management, and seasonal replanting.',
    link: '/services',
  },
  {
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    title: 'Fermentation & Preservation',
    description:
      'Don\'t let a bumper harvest go to waste. We\'ll help you preserve it through fermentation, pickling, and traditional food preservation techniques.',
    link: '/services',
  },
]
</script>

<template>
  <section class="py-20 bg-cream">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Heading -->
      <div class="text-center mb-14">
        <p class="font-body text-sm font-bold text-forest-700 uppercase tracking-widest mb-3">What We Do</p>
        <h2 class="font-heading text-4xl md:text-5xl font-bold text-bark leading-tight">
          From soil to table,<br />we've got you covered.
        </h2>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="service in services"
          :key="service.title"
          class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-cream-dark group"
        >
          <div class="w-14 h-14 bg-forest-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-forest-800 transition-colors">
            <svg
              class="w-7 h-7 text-forest-800 group-hover:text-cream transition-colors"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" :d="service.icon" />
            </svg>
          </div>
          <h3 class="font-heading text-2xl font-bold text-bark mb-3">{{ service.title }}</h3>
          <p class="font-body text-bark/70 leading-relaxed mb-6">{{ service.description }}</p>
          <RouterLink
            :to="service.link"
            class="font-body text-sm font-bold text-forest-800 hover:text-forest-600 transition-colors flex items-center gap-1 group/link"
          >
            Learn more
            <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </RouterLink>
        </div>
      </div>

      <!-- View all -->
      <div class="text-center mt-10">
        <RouterLink
          to="/services"
          class="btn-outline-dark py-3 px-8 rounded-full text-sm"
        >
          View All Services
        </RouterLink>
      </div>
    </div>
  </section>
</template>
