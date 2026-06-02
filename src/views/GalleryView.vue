<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/shared/PageHero.vue'

const images = [
  {
    url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&h=750&q=80',
    alt: 'Established raised vegetable beds with a mix of seasonal crops',
  },
  {
    url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=600&h=500&q=80',
    alt: 'Early morning light through a kitchen herb garden',
  },
  {
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&h=700&q=80',
    alt: 'Fresh harvest from the patch — tomatoes, zucchini, and basil',
  },
  {
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&h=600&q=80',
    alt: 'Lush herb garden with rosemary, thyme, and sage',
  },
  {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=800&q=80',
    alt: 'Fermentation jars lined up after a harvest — sauerkraut and pickles',
  },
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=500&q=80',
    alt: 'Workshop day — learning to plant and propagate',
  },
  {
    url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=600&h=700&q=80',
    alt: 'Pumpkins and squash from the autumn harvest',
  },
  {
    url: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&w=600&h=600&q=80',
    alt: 'Freshly picked berries from the garden',
  },
  {
    url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&h=750&q=80',
    alt: 'Vibrant kale and leafy greens growing in beds',
  },
  {
    url: 'https://images.unsplash.com/photo-1526318896950-4b69264c7337?auto=format&fit=crop&w=600&h=500&q=80',
    alt: 'A thriving backyard food garden in full swing',
  },
  {
    url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&h=650&q=80',
    alt: 'Garden bed freshly planted with seedlings and herbs',
  },
  {
    url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=600&h=700&q=80',
    alt: 'Communal garden space with multiple growing beds',
  },
]
</script>

<template>
  <div>
    <PageHero
      title="Our Work"
      subtitle="A growing collection of backyards turned food gardens."
      image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80"
    />

    <section class="py-16 bg-cream">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">

        <p class="text-center font-body text-bark/60 mb-10">
          Every garden is different. Every harvest is personal.<br />
          Here's a glimpse at what we've been growing.
        </p>

        <!-- Masonry grid via CSS columns -->
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-4">
          <div
            v-for="img in images"
            :key="img.url"
            class="break-inside-avoid mb-4 group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <img
              :src="img.url"
              :alt="img.alt"
              class="w-full object-cover block group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <!-- Caption overlay -->
            <div class="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/50 transition-colors duration-300 flex items-end">
              <p class="text-cream font-body text-sm px-4 py-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {{ img.alt }}
              </p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-14">
          <p class="font-body text-bark/70 mb-5">Want your backyard to be next?</p>
          <RouterLink
            to="/contact"
            class="btn-earth py-4 px-10 rounded-full text-base"
          >
            Book a Consultation
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

