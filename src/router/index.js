import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView, meta: { title: 'Food gardens across Essex' } },
    { path: '/services', component: () => import('../views/ServicesView.vue'), meta: { title: 'Services and prices' } },
    { path: '/about', component: () => import('../views/AboutView.vue'), meta: { title: 'About us' } },
    { path: '/gallery', component: () => import('../views/GalleryView.vue'), meta: { title: 'Gallery' } },
    { path: '/contact', component: () => import('../views/ContactView.vue'), meta: { title: 'Book a free chat' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    const behavior = reducedMotion() ? 'auto' : 'smooth'
    if (savedPosition) return savedPosition
    if (to.hash) {
      // Wait until the anchor exists (the page transition swaps views first),
      // then scroll to it. Falls back to the top if it never appears.
      return new Promise((resolve) => {
        const started = Date.now()
        const tick = () => {
          const el = document.querySelector(to.hash)
          if (el) resolve({ el: to.hash, top: 88, behavior: from.path === to.path ? behavior : 'instant' })
          else if (Date.now() - started > 2500) resolve({ top: 0 })
          else setTimeout(tick, 40)
        }
        setTimeout(tick, from.path === to.path ? 0 : 250)
      })
    }
    return { top: 0, behavior: from.path === to.path ? behavior : 'instant' }
  },
})

router.afterEach((to) => {
  document.title = `${to.meta.title} · Patch A Mumma`
})

export default router
