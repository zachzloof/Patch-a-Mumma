<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const menuOpen = ref(false)
const scrolled = ref(false)
const route = useRoute()

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<template>
  <nav
    :class="[
      'fixed top-0 w-full z-50 transition-all duration-300',
      scrolled ? 'bg-forest-900 shadow-lg' : 'bg-forest-900/95 backdrop-blur-sm',
    ]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink to="/" @click="closeMenu" class="flex items-center gap-2 group">
          <svg class="w-7 h-7 text-forest-600 group-hover:text-forest-200 transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 3-11 5.5 3-4.5 10-4 10-4S17 8 17 8z"/>
          </svg>
          <span class="font-heading text-xl font-bold text-cream group-hover:text-forest-200 transition-colors leading-none">
            Patch A Mumma
          </span>
        </RouterLink>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-6">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="font-body text-sm text-forest-200 hover:text-cream transition-colors relative group"
            :class="{ 'text-cream': route.path === link.to }"
          >
            {{ link.label }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-forest-600 group-hover:w-full transition-all duration-300" />
          </RouterLink>
          <RouterLink
            to="/contact"
            class="btn-earth text-sm py-2 px-5 rounded-full ml-2"
          >
            Book Now
          </RouterLink>
        </div>

        <!-- Mobile hamburger -->
        <button
          @click="menuOpen = !menuOpen"
          class="md:hidden text-cream p-2 rounded-lg hover:bg-forest-800 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <Transition name="mobile-menu">
        <div v-if="menuOpen" class="md:hidden border-t border-forest-800 pb-4 mt-1">
          <div class="flex flex-col gap-1 pt-2">
            <RouterLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              @click="closeMenu"
              class="font-body text-forest-200 hover:text-cream hover:bg-forest-800 px-4 py-3 rounded-lg transition-colors"
              :class="{ 'text-cream bg-forest-800': route.path === link.to }"
            >
              {{ link.label }}
            </RouterLink>
            <RouterLink
              to="/contact"
              @click="closeMenu"
              class="btn-earth text-center mt-2 mx-0 py-3 rounded-lg"
            >
              Book a Consultation
            </RouterLink>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
