<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import Plant from './Plant.vue'
import { gsap, MOTION_OK } from '../../composables/useGrowth.js'

// The hero's depth gauge continued down the left margin on wide screens,
// with a taproot that keeps reaching as the visitor scrolls. Decorative.
const props = defineProps({
  seed: { type: Number, default: 19 },
  startCm: { type: Number, default: 30 },
})

const el = ref(null)
const height = ref(0)
let mm
let ro

const ticks = computed(() => {
  const out = []
  for (let y = 0; y <= height.value - 20; y += 40) {
    const cm = props.startCm + Math.round(y / 20)
    out.push({ y, major: y % 200 === 0, cm })
  }
  return out
})

function animate() {
  mm?.revert()
  if (!el.value || !height.value) return
  mm = gsap.matchMedia(el.value)
  mm.add(MOTION_OK, () => {
    gsap.fromTo(
      el.value.querySelectorAll('.g-root path[pathLength]'),
      { strokeDasharray: 1, strokeDashoffset: 1 },
      { strokeDashoffset: 0, ease: 'none', stagger: { amount: 0.5 }, scrollTrigger: { trigger: el.value, start: 'top 75%', end: 'bottom 85%', scrub: 0.8 } },
    )
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
  <div ref="el" class="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-[104px] min-[1400px]:block" aria-hidden="true">
    <svg v-if="height" :viewBox="`0 0 104 ${height}`" :height="height" width="104" class="overflow-visible" focusable="false">
      <g stroke="#8B7A63" stroke-width="1">
        <line x1="22" y1="0" x2="22" :y2="height - 20" />
        <line v-for="t in ticks" :key="t.y" x1="22" :x2="t.major ? 32 : 27" :y1="t.y" :y2="t.y" />
      </g>
      <text
        v-for="t in ticks.filter((t) => t.major)"
        :key="'l' + t.y"
        x="36"
        :y="t.y + 4"
        fill="#6B5A44"
        font-size="11"
        font-weight="600"
        font-family="Archivo, sans-serif"
        style="font-variant-numeric: tabular-nums"
      >{{ t.cm }} cm</text>
      <g class="roots-on-paper">
        <Plant kind="rootSystem" :x="70" :y="0" :seed="seed" :size="height - 30" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.roots-on-paper :deep(path) {
  stroke: #a98758;
}
</style>
