<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/shared/PageHero.vue'

const services = [
  {
    id: 'design',
    title: 'Garden Design & Planning',
    tagline: 'Your vision, our blueprint.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    description:
      'Every great food garden starts with a plan. We visit your property, assess the sunlight, soil quality, and available space, then design a planting layout tailored to your family\'s tastes and lifestyle.',
    includes: [
      'On-site consultation and space assessment',
      'Custom planting plan with seasonal rotation',
      'Soil testing and amendment recommendations',
      'Companion planting strategy',
      'Recommended plant varieties for your climate',
    ],
    price: 'From £95',
  },
  {
    id: 'install',
    title: 'Installation & Planting',
    tagline: 'We get our hands dirty so you can get growing.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80',
    description:
      'From raised beds to in-ground plots and vertical gardens, we design and build food-growing setups that suit your space, aesthetic, and ambition. We prepare the soil, lay out the beds, and get your first crops in the ground.',
    includes: [
      'Raised bed construction and installation',
      'Premium organic soil preparation and composting',
      'Initial planting of vegetables, herbs, and fruits',
      'Mulching and water retention setup',
      'Handover walk-through so you know every plant',
    ],
    price: 'Quote on request',
  },
  {
    id: 'maintenance',
    title: 'Ongoing Maintenance',
    tagline: 'A garden that keeps giving, season after season.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    description:
      'Life gets busy. We offer regular maintenance visits to keep your garden thriving year-round — whether that\'s weekly, fortnightly, or seasonally. We prune, feed, manage pests organically, and replant as the seasons change.',
    includes: [
      'Regular weeding, pruning, and tidying',
      'Organic pest and disease management',
      'Feeding and fertilising with natural inputs',
      'Seasonal crop rotation and replanting',
      'Progress updates and harvest reports',
    ],
    price: 'From £55/visit',
  },
  {
    id: 'fermentation',
    title: 'Fermentation & Preservation',
    tagline: 'Nothing from your garden should ever go to waste.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    description:
      'A good harvest is a blessing — but it can also be overwhelming. We help you preserve the excess through fermentation, pickling, drying, and traditional preservation methods, keeping your pantry stocked with real food all year long.',
    includes: [
      'Lacto-fermented vegetables (sauerkraut, kimchi, pickles)',
      'Fruit preserves, jams, and chutneys',
      'Fermented drinks (water kefir, kombucha, kvass)',
      'Drying and dehydrating seasonal crops',
      'Take-home starter kits and recipes',
    ],
    price: 'From £80/session',
  },
  {
    id: 'workshops',
    title: 'Workshops',
    tagline: 'Learn to grow, preserve, and live from the land.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    description:
      'We run small, hands-on workshops covering the full growing and harvesting cycle. Whether you want to learn to set up your first veggie patch, master fermentation, or understand seasonal food preservation, we\'ll teach it in a way that sticks.',
    includes: [
      'Vegetable gardening fundamentals',
      'Seasonal planting and crop rotation',
      'Fermentation and food preservation',
      'Composting and soil health',
      'Herb growing and culinary use',
    ],
    price: 'From £40/person',
  },
]
</script>

<template>
  <div>
    <PageHero
      title="Our Services"
      subtitle="Everything you need to grow, harvest, and preserve your own food."
      image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&q=80"
    />

    <!-- Services list -->
    <section class="py-16 bg-cream">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          :id="service.id"
          class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <!-- Image — alternates sides -->
          <div :class="index % 2 === 1 ? 'lg:order-2' : ''">
            <div class="rounded-2xl overflow-hidden shadow-lg aspect-video">
              <img
                :src="service.image"
                :alt="service.title"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Content -->
          <div :class="index % 2 === 1 ? 'lg:order-1' : ''">
            <p class="font-body text-sm font-bold text-forest-700 uppercase tracking-widest mb-2">{{ service.tagline }}</p>
            <h2 class="font-heading text-3xl md:text-4xl font-bold text-bark mb-4 leading-tight">{{ service.title }}</h2>
            <p class="font-body text-bark/80 leading-relaxed mb-6">{{ service.description }}</p>

            <!-- What's included -->
            <div class="bg-cream-dark rounded-xl p-5 mb-6">
              <p class="font-body text-sm font-bold text-forest-800 uppercase tracking-wide mb-3">What's Included</p>
              <ul class="space-y-2">
                <li
                  v-for="item in service.includes"
                  :key="item"
                  class="flex items-start gap-2 font-body text-sm text-bark/80"
                >
                  <svg class="w-4 h-4 text-forest-700 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="flex items-center justify-between">
              <span class="font-heading text-xl font-bold text-forest-800">{{ service.price }}</span>
              <RouterLink
                to="/contact"
                class="btn-earth py-2.5 px-6 rounded-full text-sm"
              >
                Book This Service
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="py-16 bg-forest-900 text-center">
      <div class="max-w-2xl mx-auto px-4">
        <h2 class="font-heading text-3xl md:text-4xl font-bold text-cream mb-4">Not sure where to start?</h2>
        <p class="font-body text-forest-200/80 mb-8">
          Book a free consultation and we'll figure out together what makes sense for your space and goals.
        </p>
        <RouterLink to="/contact" class="btn-earth py-4 px-10 rounded-full text-base">
          Book a Free Chat
        </RouterLink>
      </div>
    </section>
  </div>
</template>
