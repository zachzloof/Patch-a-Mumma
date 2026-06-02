<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background image -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1920&q=80')"
    />
    <!-- Dark earthy overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-forest-900/75 via-forest-900/55 to-forest-900/85" />

    <!-- Content -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto py-24">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-forest-800/60 backdrop-blur-sm text-forest-200 text-sm font-body px-4 py-2 rounded-full mb-7 border border-forest-600/30">
        <svg class="w-4 h-4 text-forest-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 3-11 5.5 3-4.5 10-4 10-4S17 8 17 8z"/>
        </svg>
        Reclaim your garden. Reclaim your food.
      </div>

      <!-- Headline -->
      <h1 class="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-cream leading-tight mb-6">
        Your Garden,<br />
        <span class="text-forest-600">Your Food,</span><br />
        Your Future.
      </h1>

      <!-- Subheadline -->
      <p class="font-body text-lg sm:text-xl text-forest-100/90 max-w-2xl mx-auto mb-10 leading-relaxed">
        We help everyday Australians transform their backyards into thriving food gardens —
        vegetables, fruits, herbs, and the know-how to make the most of every harvest.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink
          to="/contact"
          class="btn-earth py-4 px-8 rounded-full text-base shadow-lg hover:shadow-xl transition-shadow"
        >
          Book a Free Consultation
        </RouterLink>
        <RouterLink
          to="/services"
          class="btn-outline-light py-4 px-8 rounded-full text-base"
        >
          Explore Our Services
        </RouterLink>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce text-forest-200/50">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </section>
</template>
