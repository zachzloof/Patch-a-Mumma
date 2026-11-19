<script setup>
import { computed, ref } from 'vue'
import Plant from './Plant.vue'
import SoilFill from './SoilFill.vue'
import { rng } from '../../art/plants.js'
import { useMotion, growIn } from '../../composables/useGrowth.js'

// The drawn kitchen garden standing on the ground line. Decorative: the
// meaning (what grows when) is repeated in text elsewhere where it matters.
const props = defineProps({
  layout: { type: String, default: 'home' }, // home | compact
  seed: { type: Number, default: 0 },
  plates: { type: Boolean, default: true },
  animate: { type: Boolean, default: true },
})

const LAYOUTS = {
  home: {
    mobile: {
      W: 400, H: 296, G: 240,
      plants: [
        { kind: 'runnerBeans', x: 50, size: 206, seed: 11 },
        { kind: 'tomato', x: 138, size: 160, seed: 12 },
        { kind: 'marigold', x: 184, size: 28, seed: 14 },
        { kind: 'squash', x: 232, size: 112, seed: 13 },
        { kind: 'carrot', x: 300, size: 54, seed: 15 },
        { kind: 'carrot', x: 320, size: 48, seed: 16 },
        { kind: 'beetroot', x: 350, size: 64, seed: 17 },
        { kind: 'beetroot', x: 382, size: 56, seed: 18 },
        { kind: 'marigold', x: 98, size: 26, seed: 19 },
      ],
      tufts: [8, 104, 176, 292, 338, 396],
      plates: [],
      tags: [
        { x: 54, name: 'Runner bean' },
        { x: 140, name: 'Tomato' },
        { x: 232, name: 'Courgette' },
      ],
    },
    desktop: {
      W: 1440, H: 344, G: 272,
      plants: [
        { kind: 'runnerBeans', x: 92, size: 244, seed: 21 },
        { kind: 'tomato', x: 236, size: 196, seed: 22 },
        { kind: 'tomato', x: 330, size: 172, seed: 23 },
        { kind: 'runnerBeans', x: 452, size: 214, seed: 43 },
        { kind: 'marigold', x: 392, size: 32, seed: 24 },
        { kind: 'lettuce', x: 420, size: 26, seed: 25 },
        { kind: 'lettuce', x: 498, size: 24, seed: 26 },
        { kind: 'marigold', x: 532, size: 28, seed: 27 },
        { kind: 'squash', x: 650, size: 214, seed: 28 },
        { kind: 'marigold', x: 770, size: 30, seed: 29 },
        { kind: 'carrot', x: 806, size: 66, seed: 30 },
        { kind: 'carrot', x: 832, size: 60, seed: 31 },
        { kind: 'carrot', x: 858, size: 70, seed: 32 },
        { kind: 'carrot', x: 884, size: 62, seed: 33 },
        { kind: 'beetroot', x: 940, size: 76, seed: 34 },
        { kind: 'beetroot', x: 982, size: 70, seed: 35 },
        { kind: 'beetroot', x: 1022, size: 72, seed: 36 },
        { kind: 'squash', x: 1140, size: 170, seed: 44 },
        { kind: 'garlic', x: 1070, size: 64, seed: 37 },
        { kind: 'garlic', x: 1094, size: 58, seed: 38 },
        { kind: 'marigold', x: 1196, size: 30, seed: 40 },
        { kind: 'tomato', x: 1252, size: 186, seed: 41 },
        { kind: 'runnerBeans', x: 1364, size: 232, seed: 42 },
      ],
      tufts: [10, 170, 380, 560, 760, 920, 1060, 1190, 1300, 1430],
      plates: [
        { px: 190, top: 6, tx: 124, ty: 100, name: 'Runner bean', note: 'Sow May to June', tip: 'Pick often and it keeps cropping' },
        { px: 650, top: 18, tx: 650, ty: 126, name: 'Courgette', note: 'Sow Apr to June', tip: 'One plant goes a long way' },
        { px: 830, top: 86, tx: 845, ty: 206, name: 'Carrot', note: 'Sow Apr to July', tip: 'Sow thinly, straight in the ground' },
        { px: 985, top: 18, tx: 982, ty: 200, name: 'Beetroot', note: 'Sow Apr to July', tip: 'The leaves are good to eat too' },
        { px: 1176, top: 6, tx: 1084, ty: 206, name: 'Garlic', note: 'Plant Oct to Dec', tip: 'Needs a cold spell to form cloves' },
      ],
      tags: [
        { x: 283, name: 'Tomato', note: 'sow indoors Feb to Apr · pinch out side shoots' },
      ],
    },
  },
  compact: {
    mobile: {
      W: 400, H: 200, G: 156,
      plants: [
        { kind: 'runnerBeans', x: 44, size: 140, seed: 51 },
        { kind: 'lettuce', x: 104, size: 20, seed: 52 },
        { kind: 'tomato', x: 160, size: 118, seed: 53 },
        { kind: 'marigold', x: 204, size: 24, seed: 54 },
        { kind: 'carrot', x: 236, size: 48, seed: 55 },
        { kind: 'carrot', x: 254, size: 44, seed: 56 },
        { kind: 'beetroot', x: 290, size: 54, seed: 57 },
        { kind: 'garlic', x: 326, size: 46, seed: 58 },
        { kind: 'garlic', x: 344, size: 42, seed: 59 },
        { kind: 'marigold', x: 376, size: 24, seed: 60 },
      ],
      tufts: [6, 122, 214, 312, 396],
      plates: [],
    },
    desktop: {
      W: 1440, H: 230, G: 182,
      plants: [
        { kind: 'runnerBeans', x: 70, size: 164, seed: 61 },
        { kind: 'lettuce', x: 150, size: 22, seed: 62 },
        { kind: 'marigold', x: 196, size: 26, seed: 63 },
        { kind: 'tomato', x: 260, size: 138, seed: 64 },
        { kind: 'carrot', x: 330, size: 52, seed: 65 },
        { kind: 'carrot', x: 352, size: 48, seed: 66 },
        { kind: 'beetroot', x: 396, size: 58, seed: 67 },
        { kind: 'squash', x: 540, size: 150, seed: 68 },
        { kind: 'marigold', x: 640, size: 26, seed: 69 },
        { kind: 'garlic', x: 690, size: 50, seed: 70 },
        { kind: 'garlic', x: 712, size: 46, seed: 71 },
        { kind: 'lettuce', x: 760, size: 22, seed: 72 },
        { kind: 'beetroot', x: 812, size: 58, seed: 73 },
        { kind: 'beetroot', x: 846, size: 54, seed: 74 },
        { kind: 'tomato', x: 930, size: 140, seed: 75 },
        { kind: 'carrot', x: 1000, size: 50, seed: 76 },
        { kind: 'carrot', x: 1022, size: 54, seed: 77 },
        { kind: 'squash', x: 1150, size: 140, seed: 78 },
        { kind: 'marigold', x: 1250, size: 26, seed: 79 },
        { kind: 'runnerBeans', x: 1360, size: 160, seed: 80 },
      ],
      tufts: [12, 210, 450, 660, 880, 1080, 1290, 1430],
      plates: [],
    },
  },
}

function groundPath(W, H, G, seed) {
  const r = rng(seed + 500)
  const pts = []
  for (let i = 0; i <= 24; i++) pts.push([Math.round((W * i) / 24), +(G + (r() - 0.5) * 6).toFixed(1)])
  const line = 'M' + pts.map((p) => p.join(' ')).join('L')
  const fill = `M0 0H${W}` + pts.slice().reverse().map((p) => `L${p[0]} ${p[1]}`).join('') + 'Z'
  return { fill, line }
}

const sets = computed(() => {
  const L = LAYOUTS[props.layout]
  return ['mobile', 'desktop'].map((k) => {
    const s = L[k]
    const g = groundPath(s.W, s.H, s.G, props.seed)
    return {
      key: k,
      ...s,
      plants: s.plants.map((p) => ({ ...p, seed: p.seed + props.seed })),
      ground: g,
      soilTop: ((s.G - 6) / s.H) * 100,
    }
  })
})

const root = ref(null)
useMotion(root, (el) => {
  if (props.animate) growIn(el)
})
</script>

<template>
  <div ref="root" class="relative" aria-hidden="true">
    <div
      v-for="set in sets"
      :key="set.key"
      class="relative"
      :class="set.key === 'mobile' ? 'md:hidden' : 'hidden md:block'"
    >
      <div class="absolute inset-x-0 bottom-0" :style="{ top: set.soilTop + '%' }">
        <SoilFill kind="topsoil" :seed="7 + seed" />
      </div>
      <svg
        class="relative block h-auto w-full overflow-visible"
        :viewBox="`0 0 ${set.W} ${set.H}`"
        focusable="false"
      >
        <path :d="set.ground.fill" fill="#FAF9F4" />
        <!-- plate leaders, drawn under the plants -->
        <g v-if="plates" class="hidden lg:inline">
          <line
            v-for="p in set.plates"
            :key="'l' + p.name"
            :x1="p.px"
            :y1="p.top + 60"
            :x2="p.tx"
            :y2="p.ty"
            stroke="#173D1F"
            stroke-width="1"
            stroke-dasharray="2 3"
            vector-effect="non-scaling-stroke"
          />
        </g>
        <Plant
          v-for="(p, i) in set.plants"
          :key="i"
          :kind="p.kind"
          :x="p.x"
          :y="set.G"
          :size="p.size"
          :seed="p.seed"
          :flip="p.x > set.W * 0.85"
        />
        <Plant v-for="(t, i) in set.tufts" :key="'t' + i" kind="tuft" :x="t" :y="set.G + 1" :seed="i + 3" />
        <path :d="set.ground.line" fill="none" stroke="#173D1F" stroke-width="1.6" vector-effect="non-scaling-stroke" />
      </svg>
      <template v-if="plates">
        <div
          v-for="p in set.plates"
          :key="'p' + p.name"
          class="absolute hidden -translate-x-1/2 border border-ink/80 bg-paper px-2 py-1 text-center leading-tight shadow-[0_6px_14px_-10px_rgba(16,41,28,0.6)] lg:block"
          :style="{ left: (p.px / set.W) * 100 + '%', top: (p.top / set.H) * 100 + '%' }"
        >
          <span class="block text-[0.8125rem] font-bold text-ink">{{ p.name }}</span>
          <span class="block whitespace-nowrap text-[0.75rem] text-ink-soft">{{ p.note }}</span>
          <span v-if="p.tip" class="mt-0.5 block whitespace-nowrap border-t border-ink/15 pt-0.5 text-[0.75rem] italic text-leaf-700">{{ p.tip }}</span>
        </div>
      </template>
      <!-- crop tags set in the topsoil, just under the ground line -->
      <span
        v-for="t in set.tags || []"
        :key="'tag' + t.name"
        class="absolute -translate-x-1/2 whitespace-nowrap border border-[#6B4A33] bg-humus-dark px-1.5 py-px text-[0.6875rem] font-semibold leading-tight text-[#E9DFC9] md:text-[0.75rem]"
        :style="{ left: (t.x / set.W) * 100 + '%', top: ((set.G + 14) / set.H) * 100 + '%' }"
      >
        {{ t.name }}<span v-if="t.note" class="font-normal text-[#CDBFA3]"> · {{ t.note }}</span>
      </span>
    </div>
  </div>
</template>
