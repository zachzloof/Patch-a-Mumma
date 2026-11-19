<script setup>
defineOptions({ inheritAttrs: false })
import { computed } from 'vue'
import { rng } from '../../art/plants.js'

// A hand-drawn horizon line between two strata. `top` fills above the line,
// `bottom` below it. Decorative only.
const props = defineProps({
  top: { type: String, required: true },
  bottom: { type: String, required: true },
  seed: { type: Number, default: 1 },
  amp: { type: Number, default: 9 },
  line: { type: String, default: '' },
  label: { type: String, default: '' },
  labelTone: { type: String, default: 'dark' }, // dark text on a light chip, or light on dark
})

const d = computed(() => {
  const r = rng(props.seed)
  const W = 1440
  const pts = []
  for (let x = 0; x <= W; x += 60) pts.push([x, 20 + (r() - 0.5) * props.amp * 2])
  let path = `M0 ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1]
    const [x, y] = pts[i]
    path += ` Q${px + 30} ${(py + y) / 2 + (r() - 0.5) * props.amp} ${x} ${y}`
  }
  return path
})
</script>

<template>
  <div :class="$attrs.class || 'relative -my-px'">
  <svg
    class="block h-6 w-full sm:h-8"
    viewBox="0 0 1440 40"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
    :style="{ background: top }"
  >
    <path :d="d + ' L1440 40 L0 40 Z'" :fill="bottom" />
    <path v-if="line" :d="d" fill="none" :stroke="line" stroke-width="1.5" vector-effect="non-scaling-stroke" />
  </svg>
  <span
    v-if="label"
    class="annot pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[0.75rem] sm:right-8"
    :class="labelTone === 'light' ? 'bg-humus-dark text-[#E9DFC9]' : 'bg-paper text-ink-soft'"
    aria-hidden="true"
  >{{ label }}</span>
  </div>
</template>
