<script setup>
import Plant from './Plant.vue'

// One raised bed at three moments: 0 = a ghost of the bed on bare lawn,
// 1 = built and freshly planted, 2 = in full harvest. Decorative.
defineProps({ stage: { type: Number, default: 2 } })

const seedlings = [
  { kind: 'lettuce', x: 70, size: 10, seed: 3 },
  { kind: 'carrot', x: 112, size: 22, seed: 4 },
  { kind: 'beetroot', x: 150, size: 24, seed: 5 },
  { kind: 'lettuce', x: 196, size: 11, seed: 6 },
  { kind: 'garlic', x: 236, size: 22, seed: 7 },
  { kind: 'carrot', x: 278, size: 20, seed: 8 },
]
const full = [
  { kind: 'runnerBeans', x: 64, size: 150, seed: 91 },
  { kind: 'marigold', x: 114, size: 26, seed: 92 },
  { kind: 'tomato', x: 148, size: 118, seed: 93 },
  { kind: 'beetroot', x: 200, size: 50, seed: 94 },
  { kind: 'carrot', x: 230, size: 44, seed: 95 },
  { kind: 'squash', x: 286, size: 100, seed: 96 },
]
const ghost = [
  { kind: 'runnerBeans', x: 64, size: 150, seed: 91 },
  { kind: 'tomato', x: 148, size: 118, seed: 93 },
  { kind: 'squash', x: 286, size: 100, seed: 96 },
]
</script>

<template>
  <svg viewBox="0 0 360 230" class="block h-auto w-full overflow-visible" aria-hidden="true" focusable="false">
    <!-- lawn line and tufts -->
    <path d="M0 202h360" stroke="#173D1F" stroke-width="1.4" vector-effect="non-scaling-stroke" />
    <Plant v-for="(x, i) in [8, 40, 330, 352]" :key="'t' + i" kind="tuft" :x="x" :y="202" :seed="i + 30" />

    <template v-if="stage === 0">
      <g class="ghost">
        <Plant v-for="p in ghost" :key="p.seed" v-bind="p" :y="160" />
      </g>
      <rect x="22" y="160" width="316" height="42" fill="none" stroke="#6B7A6F" stroke-width="1.4" stroke-dasharray="5 5" vector-effect="non-scaling-stroke" />
      <!-- tape measure along the bed -->
      <path d="M22 214h316" stroke="#E8A33A" stroke-width="5" />
      <path d="M22 214h316" stroke="#173D1F" stroke-width="1" stroke-dasharray="1 9" />
      <rect x="6" y="206" width="20" height="16" rx="3" fill="#D8432E" stroke="#173D1F" stroke-width="1.2" />
      <!-- notebook and pencil -->
      <g transform="translate(250 166) rotate(-8)">
        <rect width="46" height="30" fill="#FAF9F4" stroke="#173D1F" stroke-width="1.2" />
        <path d="M6 9h30M6 15h24M6 21h28" stroke="#8B989D" stroke-width="1" />
        <path d="M30 34l22-18 3 3-21 18-6 2z" fill="#E8A33A" stroke="#173D1F" stroke-width="1" />
      </g>
    </template>

    <template v-else>
      <!-- the built bed: scaffold boards -->
      <path d="M22 160c40-5 80 4 120-1s100 4 196 0v4H22z" fill="#3A2518" />
      <rect x="22" y="162" width="316" height="40" fill="#C9A26B" stroke="#173D1F" stroke-width="1.4" vector-effect="non-scaling-stroke" />
      <path d="M22 182h316M100 162v40M260 162v40" stroke="#173D1F" stroke-width="1" vector-effect="non-scaling-stroke" />
      <path d="M34 170c14 2 30-1 44 1M120 172c20-2 40 2 60 0M200 190c18 2 34-1 50 1M280 172c14-1 28 1 44 0M40 192c16 2 30-2 46 0" stroke="#9C6A2A" stroke-width="1" fill="none" />
      <g v-if="stage === 1">
        <Plant v-for="p in seedlings" :key="p.seed" v-bind="p" :y="161" />
        <path v-for="x in [56, 72]" :key="x" :d="`M${x} 161L64 120`" stroke="#B58A4E" stroke-width="2.4" />
      </g>
      <g v-else>
        <Plant v-for="p in full" :key="p.seed" v-bind="p" :y="161" />
      </g>
    </template>
  </svg>
</template>
