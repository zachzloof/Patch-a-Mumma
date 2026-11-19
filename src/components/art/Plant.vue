<script setup>
import { computed } from 'vue'
import { PLANTS } from '../../art/plants.js'

const props = defineProps({
  kind: { type: String, required: true },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  seed: { type: Number, default: 1 },
  size: { type: Number, default: undefined },
  scale: { type: Number, default: 1 },
  flip: { type: Boolean, default: false },
})

const parts = computed(() => {
  const gen = PLANTS[props.kind]
  return props.size === undefined ? gen(props.seed) : gen(props.seed, props.size)
})
const transform = computed(
  () => `translate(${props.x} ${props.y}) scale(${props.flip ? -props.scale : props.scale} ${props.scale})`,
)
</script>

<template>
  <g :transform="transform" class="g-plant">
    <g v-for="(part, i) in parts" :key="i" :transform="part.t">
      <g :class="part.cls">
        <path
          v-for="(p, j) in part.paths"
          :key="j"
          :d="p.d"
          :transform="p.t"
          :fill="p.fill"
          :stroke="p.stroke"
          :stroke-width="p.sw"
          :pathLength="p.draw ? 1 : undefined"
          stroke-linecap="round"
          stroke-linejoin="round"
          :vector-effect="p.draw ? undefined : 'non-scaling-stroke'"
        />
      </g>
    </g>
  </g>
</template>
