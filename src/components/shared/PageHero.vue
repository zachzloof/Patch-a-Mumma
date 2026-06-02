<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  image: { type: String, required: true },
})
</script>

<template>
  <section class="relative h-64 md:h-80 flex items-end overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${image})` }"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-forest-900/60 to-forest-900/80" />
    <div class="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto w-full pb-10">
      <h1 class="font-heading text-4xl md:text-5xl font-bold text-cream leading-tight">{{ title }}</h1>
      <p v-if="subtitle" class="font-body text-forest-200 mt-2 text-lg">{{ subtitle }}</p>
    </div>
  </section>
</template>
