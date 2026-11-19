<script setup>
import { computed } from 'vue'
import { rng } from '../../art/plants.js'

// A swing-top preserving jar drawn in section, with its contents. Decorative.
const props = defineProps({
  contents: { type: String, default: 'kraut' }, // kraut | pickles | beet | carrot | kefir
  seed: { type: Number, default: 1 },
  label: { type: String, default: '' },
})

const SPEC = {
  kraut: { brine: '#EFE3A6', bits: '#C9B25A', kind: 'shreds' },
  pickles: { brine: '#D9E5B4', bits: '#4E7A2E', kind: 'cukes' },
  beet: { brine: '#B34067', bits: '#7A1736', kind: 'shreds' },
  carrot: { brine: '#F4C690', bits: '#E07020', kind: 'sticks' },
  kefir: { brine: '#EBE4CF', bits: '#C8BC98', kind: 'grains' },
}

const inside = computed(() => {
  const s = SPEC[props.contents]
  const r = rng(props.seed)
  const items = []
  if (s.kind === 'shreds') {
    for (let i = 0; i < 16; i++) {
      const x = 12 + r() * 36
      const y = 46 + r() * 40
      items.push(`M${x.toFixed(1)} ${y.toFixed(1)}q${(4 + r() * 4).toFixed(1)} ${(-3 + r() * 6).toFixed(1)} ${(8 + r() * 4).toFixed(1)} ${(r() * 2).toFixed(1)}`)
    }
  } else if (s.kind === 'sticks') {
    for (let i = 0; i < 7; i++) {
      const x = 13 + i * 5.2
      items.push(`M${x.toFixed(1)} 88l${(r() * 3 - 1.5).toFixed(1)} -${(34 + r() * 8).toFixed(1)}`)
    }
  } else if (s.kind === 'grains') {
    for (let i = 0; i < 14; i++) {
      const x = 14 + r() * 32
      const y = 70 + r() * 18
      items.push(`M${x.toFixed(1)} ${y.toFixed(1)}a2.2 2 0 1 0 4.4 0a2.2 2 0 1 0 -4.4 0`)
    }
  }
  return { ...s, items }
})
</script>

<template>
  <svg viewBox="0 0 60 100" class="block h-auto w-full overflow-visible" aria-hidden="true" focusable="false">
    <!-- brine level: the .jar-fill group is what animates -->
    <g class="jar-fill">
      <path d="M8 40h44v46c0 5-3 8-8 8H16c-5 0-8-3-8-8z" :fill="inside.brine" />
      <g v-if="inside.kind === 'cukes'">
        <rect x="12" y="46" width="11" height="44" rx="5.5" :fill="inside.bits" stroke="#173D1F" stroke-width="0.8" />
        <rect x="25" y="50" width="10" height="40" rx="5" fill="#5E8C35" stroke="#173D1F" stroke-width="0.8" />
        <rect x="37" y="44" width="11" height="46" rx="5.5" :fill="inside.bits" stroke="#173D1F" stroke-width="0.8" />
        <path d="M30 44c-2 6 2 10-1 16M30 50l-4-3M29 56l4-3" stroke="#2F6B2A" stroke-width="1" fill="none" />
      </g>
      <path v-else :d="inside.items.join('')" :stroke="inside.bits" :stroke-width="inside.kind === 'sticks' ? 3.4 : 1.6" stroke-linecap="round" fill="none" />
    </g>
    <!-- glass -->
    <path d="M14 22h32v6c4 2 7 6 7 11v47c0 6-4 10-10 10H17c-6 0-10-4-10-10V39c0-5 3-9 7-11z" fill="#FFFFFF" fill-opacity="0.18" stroke="#173D1F" stroke-width="1.4" />
    <path d="M13 39c-1 12-1 30 0 44" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8" />
    <!-- lid and swing clasp -->
    <path d="M12 14h36v8H12z" fill="#8B989D" stroke="#173D1F" stroke-width="1.4" />
    <path d="M12 18c-4 0-5 8 0 10M48 18c4 0 5 8 0 10" fill="none" stroke="#4F4A44" stroke-width="1.2" />
    <rect v-if="label" x="15" y="56" width="30" height="16" fill="#FAF9F4" stroke="#173D1F" stroke-width="1" />
    <text v-if="label" x="30" y="67" text-anchor="middle" font-family="Archivo, sans-serif" font-size="7" font-weight="700" fill="#10291C">{{ label }}</text>
  </svg>
</template>
