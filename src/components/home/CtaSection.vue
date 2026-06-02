<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="relative py-24 overflow-hidden">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80')"
    />
    <div class="absolute inset-0 bg-forest-900/85" />

    <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <svg class="w-10 h-10 text-forest-600 mx-auto mb-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 3-11 5.5 3-4.5 10-4 10-4S17 8 17 8z"/>
      </svg>
      <h2 class="font-heading text-4xl md:text-5xl font-bold text-cream leading-tight mb-5">
        Ready to grow something real?
      </h2>
      <p class="font-body text-lg text-forest-200/90 leading-relaxed mb-10">
        Book a free consultation and let's talk about what's possible in your space.
        No pressure — just a conversation about your garden and your goals.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink
          to="/contact"
          class="btn-earth py-4 px-10 rounded-full text-base shadow-lg"
        >
          Book a Free Consultation
        </RouterLink>
        <RouterLink
          to="/services"
          class="btn-outline-light py-4 px-10 rounded-full text-base"
        >
          Browse Services
        </RouterLink>
      </div>
    </div>
  </section>
</template>
