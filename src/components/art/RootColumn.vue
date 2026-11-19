<script setup>
import { computed } from 'vue'
import Plant from './Plant.vue'

// A sprouting seed with its root system, plus a centimetre depth gauge.
const props = defineProps({
  depth: { type: Number, default: 300 },
  seed: { type: Number, default: 10 },
  ticks: { type: Array, default: () => [0, 10, 20] },
  light: { type: Boolean, default: true },
})
const tickY = computed(() => props.ticks.map((t, i) => ({ t, y: 10 + (i * (props.depth - 30)) / (props.ticks.length - 1) })))
const ink = computed(() => (props.light ? '#F3EAD6' : '#173D1F'))
</script>

<template>
  <svg :viewBox="`0 0 70 ${depth}`" :width="70" :height="depth" class="overflow-visible" aria-hidden="true" focusable="false">
    <!-- gauge -->
    <g :stroke="ink" stroke-width="1.2" opacity="0.85">
      <line x1="6" :y1="10" x2="6" :y2="depth - 20" />
      <line v-for="m in 21" :key="m" x1="6" :x2="m % 5 === 1 ? 14 : 10" :y1="10 + ((m - 1) * (depth - 30)) / 20" :y2="10 + ((m - 1) * (depth - 30)) / 20" />
    </g>
    <text
      v-for="tk in tickY"
      :key="tk.t"
      x="18"
      :y="tk.y + 4"
      :fill="ink"
      font-size="11"
      font-weight="600"
      font-family="Archivo, sans-serif"
      style="font-variant-numeric: tabular-nums"
    >{{ tk.t }}{{ tk.t === ticks[ticks.length - 1] ? ' cm' : '' }}</text>
    <!-- roots, then the seed and its shoot -->
    <Plant kind="rootSystem" :x="48" :y="6" :seed="seed" :size="depth - 30" />
    <path d="M48 6 C47 -4 49 -14 48 -22" fill="none" stroke="#8DBF5A" stroke-width="2" stroke-linecap="round" />
    <path d="M48 -18c-5-5-11-5-14-2 4 4 9 4 14 2z" fill="#8DBF5A" stroke="#173D1F" stroke-width="1" />
    <path d="M48 -20c4-6 10-7 14-4-3 5-9 6-14 4z" fill="#4E8E35" stroke="#173D1F" stroke-width="1" />
    <ellipse cx="48" cy="8" rx="7" ry="9.5" transform="rotate(-18 48 8)" fill="#E9B160" stroke="#173D1F" stroke-width="1.2" />
    <path d="M45 3c1 4 1 8 3 11" fill="none" stroke="#B9873E" stroke-width="1" />
  </svg>
</template>
