<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import Plant from './Plant.vue'
import { gsap, MOTION_OK } from '../../composables/useGrowth.js'

// A runner-bean vine trailing down the page margin on wide screens.
// It draws as the visitor scrolls past. Decorative only.
const props = defineProps({ seed: { type: Number, default: 7 } })

const el = ref(null)
const height = ref(0)
let mm
let ro

function animate() {
  mm?.revert()
  if (!el.value || !height.value) return
  mm = gsap.matchMedia(el.value)
  mm.add(MOTION_OK, () => {
    const scope = el.value
    const tl = gsap.timeline({
      scrollTrigger: { trigger: scope, start: 'top 70%', end: 'bottom 85%', scrub: 0.8 },
    })
    tl.fromTo(scope.querySelectorAll('.g-stem path'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
    tl.from(scope.querySelectorAll('.g-leaf, .g-fruit'), { scale: 0, transformOrigin: '0% 50%', ease: 'power2.out', duration: 0.08, stagger: { amount: 0.9 } }, 0.02)
  })
}

onMounted(async () => {
  height.value = el.value.offsetHeight
  await nextTick()
  animate()
  ro = new ResizeObserver(async () => {
    const h = el.value?.offsetHeight || 0
    if (Math.abs(h - height.value) > 120) {
      height.value = h
      await nextTick()
      animate()
    }
  })
  ro.observe(el.value)
})
onBeforeUnmount(() => {
  ro?.disconnect()
  mm?.revert()
})
</script>

<template>
  <div ref="el" class="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[104px] min-[1400px]:block" aria-hidden="true">
    <svg v-if="height" :viewBox="`0 0 104 ${height}`" :height="height" width="104" class="overflow-visible" focusable="false">
      <Plant kind="vineRail" :seed="props.seed" :size="height" />
    </svg>
  </div>
</template>
