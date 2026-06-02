<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/shared/PageHero.vue'

const values = [
  {
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Community',
    description: 'Food grows better when we grow it together. We love connecting growers, sharing knowledge, and building neighbourhoods where people help each other eat well.',
  },
  {
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    title: 'Sustainability',
    description: 'Every seed we plant is a vote for the kind of food system we want. We use organic practices, build soil health, and compost everything — because the land gives back what you put in.',
  },
  {
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    title: 'Education',
    description: 'We don\'t just build gardens — we teach you how to use them. Every visit is a chance to share a little more knowledge, so you feel more confident and connected to what you\'re growing.',
  },
  {
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    title: 'Abundance',
    description: 'There is always more than enough when you grow your own. We help people experience the incredible feeling of eating food they\'ve grown themselves — and sharing it with the people they love.',
  },
]
</script>

<template>
  <div>
    <PageHero
      title="About Us"
      subtitle="Why we started, and what drives us."
      image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&q=80"
    />

    <!-- Story section -->
    <section class="py-20 bg-cream">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Image -->
          <div class="relative">
            <div class="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80"
                alt="Tending a kitchen garden"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="absolute -top-4 -right-4 bg-earth-100 rounded-2xl p-5 shadow-lg max-w-[180px]">
              <p class="font-heading text-3xl font-bold text-earth-900">50+</p>
              <p class="font-body text-sm text-earth-700 mt-1">Gardens planted and thriving</p>
            </div>
          </div>

          <!-- Text -->
          <div>
            <p class="font-body text-sm font-bold text-forest-700 uppercase tracking-widest mb-3">Our Story</p>
            <h2 class="font-heading text-4xl md:text-5xl font-bold text-bark leading-tight mb-6">
              It started with a<br />
              <span class="italic text-forest-800">questionable tomato.</span>
            </h2>
            <div class="space-y-4 font-body text-bark/80 leading-relaxed text-lg">
              <p>
                Like most people, we grew up trusting that the food in supermarkets was safe, fresh, and honestly
                labelled. Then, gradually, we started asking questions we couldn't unask. About pesticides.
                About ultra-processing. About how far a vegetable travels before it reaches your plate.
              </p>
              <p>
                We decided to do something about it — in our own backyard, first. Then in our neighbours'.
                Then further. Patch A Mumma grew out of that simple impulse: help people grow real food,
                close to home, with their own hands.
              </p>
              <p>
                We're not here to preach or make anyone anxious. We're here to make growing your own food
                feel achievable, joyful, and genuinely delicious. One patch at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values section -->
    <section class="py-20 bg-cream-dark">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <p class="font-body text-sm font-bold text-forest-700 uppercase tracking-widest mb-3">What We Stand For</p>
          <h2 class="font-heading text-4xl md:text-5xl font-bold text-bark leading-tight">Our Values</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="value in values"
            :key="value.title"
            class="bg-white rounded-2xl p-7 text-center shadow-sm hover:shadow-md transition-shadow border border-cream-dark"
          >
            <div class="w-14 h-14 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg class="w-7 h-7 text-forest-800" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" :d="value.icon" />
              </svg>
            </div>
            <h3 class="font-heading text-xl font-bold text-bark mb-3">{{ value.title }}</h3>
            <p class="font-body text-sm text-bark/70 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission banner -->
    <section class="py-16 bg-forest-900 text-center">
      <div class="max-w-3xl mx-auto px-4">
        <p class="font-heading text-2xl md:text-3xl italic text-forest-200/90 leading-relaxed mb-8">
          "A vegetable patch in your backyard isn't just a garden — it's a quiet act of independence."
        </p>
        <RouterLink to="/contact" class="btn-earth py-4 px-10 rounded-full text-base">
          Start Growing With Us
        </RouterLink>
      </div>
    </section>
  </div>
</template>
