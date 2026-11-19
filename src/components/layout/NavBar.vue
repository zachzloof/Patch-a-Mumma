<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import SproutMark from '../art/SproutMark.vue'
import GardenBand from '../art/GardenBand.vue'

const menuOpen = ref(false)
const showBar = ref(false)
const route = useRoute()
const menuButton = ref(null)
const firstLink = ref(null)

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

// The phone booking bar shows whenever no in-page booking button is on screen,
// so a free chat is always one tap away, whatever the screen height.
let io
let ctaTimer
const visibleCtas = new Set()
function watchCtas() {
  io?.disconnect()
  visibleCtas.clear()
  const els = document.querySelectorAll('[data-book-cta]')
  if (!els.length) {
    showBar.value = true
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (e.isIntersecting ? visibleCtas.add(e.target) : visibleCtas.delete(e.target)))
      showBar.value = visibleCtas.size === 0
    },
    { threshold: 0.99 },
  )
  els.forEach((el) => io.observe(el))
}
const rewatch = () => {
  clearTimeout(ctaTimer)
  ctaTimer = setTimeout(watchCtas, 500) // after the page transition settles
}
const onKey = (e) => {
  if (e.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
    menuButton.value?.focus()
  }
}
onMounted(() => {
  window.addEventListener('keydown', onKey)
  rewatch()
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  io?.disconnect()
  clearTimeout(ctaTimer)
})
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
    rewatch()
  },
)
watch(menuOpen, async (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
  // keep keyboard focus inside the open menu
  for (const el of [document.getElementById('main'), document.querySelector('body > #app footer')]) {
    if (el) el.inert = open
  }
  if (open) {
    await nextTick()
    firstLink.value?.[0]?.$el?.focus()
  }
})
const isActive = (to) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-ink/15 bg-paper">
    <a
      href="#main"
      class="absolute left-3 top-2 z-[60] -translate-y-20 bg-ink px-4 py-3 font-semibold text-paper focus:translate-y-0"
    >
      Skip to content
    </a>
    <nav class="page-x flex h-16 items-center justify-between gap-4" aria-label="Main">
      <RouterLink to="/" class="group flex min-h-11 items-center gap-2 text-ink" aria-label="Patch A Mumma, home">
        <SproutMark class="h-8 w-8 text-leaf-700 transition-transform duration-300 group-hover:-rotate-6" />
        <span class="display text-[1.75rem] leading-none tracking-[-0.005em]">Patch A Mumma</span>
      </RouterLink>

      <ul class="hidden items-center gap-7 md:flex">
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            class="relative py-2 text-[0.9375rem] font-semibold text-ink-soft transition-colors hover:text-ink"
            :class="{ '!text-ink': isActive(link.to) }"
            :aria-current="isActive(link.to) ? 'page' : undefined"
          >
            {{ link.label }}
            <span
              v-if="isActive(link.to)"
              class="absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-leaf-500"
              aria-hidden="true"
            />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/contact#book" class="btn-rust !min-h-0 !px-5 !py-3 text-[0.9375rem]">Book a free chat</RouterLink>
        </li>
      </ul>

      <button
        ref="menuButton"
        type="button"
        class="btn-line !min-h-11 !px-4 !py-2 text-[0.9375rem] md:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Close' : 'Menu' }}
      </button>
    </nav>

    <Transition name="drop">
      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-paper md:hidden"
      >
        <ul class="page-x border-t border-ink/15 pt-2">
          <li v-for="link in links" :key="link.to" class="border-b border-ink/10">
            <RouterLink
              ref="firstLink"
              :to="link.to"
              class="display flex items-center justify-between py-4 text-[2.5rem]"
              :class="isActive(link.to) ? 'text-leaf-700' : 'text-ink'"
              :aria-current="isActive(link.to) ? 'page' : undefined"
            >
              {{ link.label }}
              <svg v-if="isActive(link.to)" class="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21V9M12 13c-4 0-6-3-6-6 3 0 6 2 6 6zm0-2c0-4 3-6 7-6 0 4-3 6-7 6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
              </svg>
            </RouterLink>
          </li>
        </ul>
        <div class="page-x py-6">
          <RouterLink to="/contact#book" class="btn-rust w-full">Book a free chat</RouterLink>
          <p class="mt-5 text-ink-soft">
            Or email <a href="mailto:penny@patch-a-mumma.co.uk" class="link text-ink">penny@patch-a-mumma.co.uk</a>
          </p>
        </div>
        <GardenBand layout="compact" :seed="5" :plates="false" class="mt-auto shrink-0" />
      </div>
    </Transition>
  </header>

  <!-- Phones: booking is always one tap away once the hero has scrolled off -->
  <Transition name="rise">
    <div
      v-if="showBar && !menuOpen && route.path !== '/contact'"
      class="fixed inset-x-0 bottom-0 z-40 border-t border-ink/15 bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-[2px] md:hidden"
    >
      <RouterLink to="/contact#book" class="btn-rust w-full">Book a free chat</RouterLink>
    </div>
  </Transition>
</template>

<style scoped>
.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.rise-enter-active,
.rise-leave-active {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}
.rise-enter-from,
.rise-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .drop-enter-active,
  .drop-leave-active,
  .rise-enter-active,
  .rise-leave-active {
    transition: none;
  }
}
</style>
