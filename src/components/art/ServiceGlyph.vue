<script setup>
// Small drawn vignettes for each service, in the same ink-and-flat-fill hand.
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="none" stroke="#173D1F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <!-- planting plan on a sheet, with a pencil -->
    <g v-if="name === 'plan'">
      <path d="M9 13l34-5 6 41-34 5z" fill="#FAF9F4" />
      <path d="M14 20l24-3.5M15 27l24-3.5M16 34l24-3.5M17 41l24-3.5" stroke="#8B989D" stroke-width="1" />
      <rect x="17" y="19" width="9" height="12" rx="1" transform="rotate(-8 21 25)" fill="#8DBF5A" />
      <rect x="29" y="17" width="9" height="12" rx="1" transform="rotate(-8 33 23)" fill="#D6A55F" />
      <rect x="20" y="35" width="18" height="8" rx="1" transform="rotate(-8 29 39)" fill="#4E8E35" />
      <circle cx="22" cy="24" r="1.6" fill="#D8432E" stroke="none" />
      <circle cx="33" cy="22" r="1.6" fill="#E87A24" stroke="none" />
      <path d="M44 52L56 26l4 2-12 26-5 3z" fill="#E8A33A" />
      <path d="M56 26l4 2" stroke-width="2.4" />
    </g>
    <!-- raised bed with seedlings and a spade -->
    <g v-else-if="name === 'bed'">
      <path d="M6 40h52v13H6z" fill="#C08A3E" />
      <path d="M6 46h52M14 40v13M50 40v13" stroke-width="1" />
      <path d="M6 40c6-3 12-3 18-1s14 2 20-1 10-1 14 1" fill="#3A2518" />
      <path d="M17 39v-9m0 4c-3 0-5-2-5-5 3 0 5 2 5 5zm0-2c0-3 2-5 5-5 0 3-2 5-5 5zM32 39v-12m0 5c-4 0-6-3-6-6 4 0 6 3 6 6zm0-2c0-4 3-6 7-6 0 4-3 6-7 6zM46 39v-8m0 3c-3 0-4-2-4-4 3 0 4 2 4 4zm0-1c0-3 2-4 4-4 0 3-2 4-4 4z" fill="#8DBF5A" />
      <path d="M56 8v24" stroke-width="2.2" />
      <path d="M52 30h8l-1 8c-1 3-5 3-6 0z" fill="#8B989D" />
      <path d="M53 6h6" stroke-width="2.4" />
    </g>
    <!-- watering can mid-pour -->
    <g v-else-if="name === 'can'">
      <path d="M14 26h26l3 24H11z" fill="#4E8E35" />
      <path d="M14 26c0-8 26-8 26 0" />
      <path d="M43 34l13-10 3 2-12 14" fill="#4E8E35" />
      <path d="M55 22l6-3 2 5-5 2z" fill="#2F6B2A" />
      <path d="M12 32c-6 0-8 6-6 12 2 4 5 5 7 4" />
      <path d="M17 33h20" stroke="#8DBF5A" stroke-width="1" />
      <path d="M60 29l1 5M57 30l-1 6M62 33l2 4" stroke="#8B989D" stroke-width="1.2" />
    </g>
    <!-- swing-top jar of kraut -->
    <g v-else-if="name === 'jar'">
      <path d="M18 18h28v4c4 2 6 6 6 10v18c0 5-4 8-9 8H21c-5 0-9-3-9-8V32c0-4 2-8 6-10z" fill="#E9F0DE" />
      <path d="M14 34c6-2 30-2 36 0v15c0 5-3 7-8 7H22c-5 0-8-2-8-7z" fill="#E7D58A" />
      <path d="M18 40c3-2 6 1 9-1s5 2 8 0 6 1 9-1M18 46c3-2 6 1 9-1s5 2 8 0 6 1 9-1" stroke="#B9A04A" stroke-width="1" />
      <path d="M18 18h28M16 12h32v6H16z" fill="#8B989D" />
      <path d="M14 22c-3 0-4-6 0-8M50 22c3 0 4-6 0-8" stroke-width="1.2" />
      <path d="M21 27c-2 4-2 10 0 14" stroke="#FFFFFF" stroke-width="1.6" />
    </g>
    <!-- seed tray with labelled seedlings -->
    <g v-else-if="name === 'tray'">
      <path d="M6 38h52l-4 14H10z" fill="#3A2518" />
      <path d="M6 38h52" />
      <path d="M19 38v-10m0 4c-3 0-5-2-5-5 3 0 5 2 5 5zm0-2c0-3 2-5 5-5 0 3-2 5-5 5zM32 38v-13m0 5c-4 0-6-3-6-6 4 0 6 3 6 6zm0-2c0-4 3-6 7-6 0 4-3 6-7 6zM45 38v-9m0 3c-3 0-5-2-5-4 3 0 5 2 5 4zm0-1c0-3 2-5 5-5 0 3-2 5-5 5z" fill="#8DBF5A" />
      <path d="M9 22l7-1 1 8-7 1zM26 14l4 4" fill="#FAF9F4" />
      <path d="M12 26v14" stroke-width="1" />
      <path d="M50 14c4 0 7 3 7 7M48 9c7 0 13 6 13 13" stroke="#C08A3E" stroke-width="1.2" />
    </g>
  </svg>
</template>
