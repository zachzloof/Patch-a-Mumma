import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

/**
 * Runs `setup(el)` inside a gsap.matchMedia scoped to the element, only when the
 * visitor has not asked for reduced motion. Everything is reverted on unmount,
 * so drawings always fall back to their finished, fully visible state.
 */
export function useMotion(rootRef, setup) {
  let mm
  onMounted(() => {
    if (!rootRef.value) return
    mm = gsap.matchMedia(rootRef.value)
    mm.add(MOTION_OK, () => setup(rootRef.value))
  })
  onBeforeUnmount(() => mm?.revert())
}

/** The garden grows in: stems draw, leaves unfurl from their base, fruit swells. */
export function growIn(scope, { delay = 0.1, duration = 1.6 } = {}) {
  const q = (s) => scope.querySelectorAll(s)
  const tl = gsap.timeline({ delay, defaults: { ease: 'power3.out' } })
  const stems = q('.g-stem path')
  const leaves = q('.g-leaf')
  const fruit = q('.g-fruit')
  const roots = q('.g-root path[pathLength]')
  if (stems.length)
    tl.fromTo(stems, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration, stagger: { amount: 0.7 } }, 0)
  if (roots.length)
    tl.fromTo(roots, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: duration * 0.8, stagger: { amount: 0.5 } }, 0.2)
  if (leaves.length)
    tl.from(leaves, { scale: 0, transformOrigin: '0% 50%', duration: duration * 0.7, stagger: { amount: 1.1 } }, 0.25)
  if (fruit.length)
    tl.from(fruit, { scale: 0, transformOrigin: '50% 50%', duration: duration * 0.6, ease: 'power3.out', stagger: { amount: 0.6 } }, 0.9)
  return tl
}

/** Roots (paths with pathLength) draw downward as the section scrolls past. */
export function rootsOnScroll(scope, { trigger = scope, start = 'top 75%', end = 'bottom 40%' } = {}) {
  const roots = scope.querySelectorAll('.g-root path[pathLength]')
  if (!roots.length) return
  gsap.fromTo(
    roots,
    { strokeDasharray: 1, strokeDashoffset: 1 },
    { strokeDashoffset: 0, ease: 'none', stagger: { amount: 0.4 }, scrollTrigger: { trigger, start, end, scrub: 0.6 } },
  )
}

/** Grow a scope's plants once it scrolls into view. */
export function growWhenSeen(scope, opts = {}) {
  const tl = growIn(scope, { delay: 0, ...opts })
  tl.pause()
  ScrollTrigger.create({ trigger: scope, start: 'top 80%', once: true, onEnter: () => tl.play() })
  return tl
}

export { gsap, ScrollTrigger }
