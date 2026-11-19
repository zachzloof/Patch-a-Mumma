<script setup>
import { computed, useId } from 'vue'
import { rng } from '../../art/plants.js'

// Stippled soil texture for a stratum. Purely decorative.
const props = defineProps({
  kind: { type: String, default: 'topsoil' }, // topsoil | clay | chalk | gley
  seed: { type: Number, default: 3 },
})
const id = useId()

const SPEC = {
  topsoil: { base: '#3A2518', dots: ['#4B3223', '#55392A', '#2A1A10'], pebbleColor: '#6B4A33', n: 70, hatch: null },
  clay: { base: '#C08A3E', dots: ['#B88238', '#CC9A55', '#B47E36'], pebbleColor: '#A9752F', n: 46, hatch: '#B8843A' },
  chalk: { base: '#ECE6D7', dots: ['#DED6C3', '#E4DCC9', '#D6CDB8'], pebbleColor: '#CFC5AE', n: 26, hatch: null },
  bedrock: { base: '#241710', dots: ['#2F1F15', '#38261A', '#1A100A'], pebbleColor: '#4A3426', n: 60, hatch: null },
  gley: { base: '#8B989D', dots: ['#7A878C', '#9AA6AA', '#6E7A7F'], pebbleColor: '#5D686C', n: 40, hatch: null },
}

const tile = computed(() => {
  const s = SPEC[props.kind]
  const r = rng(props.seed)
  const size = 180
  const dots = []
  for (let i = 0; i < s.n; i++) {
    dots.push({ x: r() * size, y: r() * size, r: 0.8 + r() * 1.6, c: s.dots[Math.floor(r() * s.dots.length)] })
  }
  const pebbles = []
  const pn = props.kind === 'chalk' ? 3 : 6
  for (let i = 0; i < pn; i++) {
    const x = 10 + r() * (size - 20)
    const y = 10 + r() * (size - 20)
    const w = props.kind === 'chalk' ? 6 + r() * 6 : 3 + r() * 4
    const h = w * (0.55 + r() * 0.3)
    const rot = r() * 180
    pebbles.push({ x, y, w, h, rot })
  }
  return { size, dots, pebbles, ...s }
})
</script>

<template>
  <svg class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
    <defs>
      <pattern :id="id" :width="tile.size" :height="tile.size" patternUnits="userSpaceOnUse">
        <circle v-for="(d, i) in tile.dots" :key="'d' + i" :cx="d.x" :cy="d.y" :r="d.r" :fill="d.c" />
        <ellipse
          v-for="(p, i) in tile.pebbles"
          :key="'p' + i"
          :cx="p.x"
          :cy="p.y"
          :rx="p.w / 2"
          :ry="p.h / 2"
          :transform="`rotate(${p.rot} ${p.x} ${p.y})`"
          :fill="kind === 'chalk' ? '#E2D9C5' : 'none'"
          :stroke="tile.pebbleColor"
          stroke-width="1"
        />
        <path
          v-if="tile.hatch"
          :d="`M0 ${tile.size * 0.3} l${tile.size} -40 M0 ${tile.size * 0.75} l${tile.size} -40`"
          :stroke="tile.hatch"
          stroke-width="1"
          fill="none"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="tile.base" />
    <rect width="100%" height="100%" :fill="`url(#${id})`" />
  </svg>
</template>
