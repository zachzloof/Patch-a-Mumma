<template>
  <section class="py-20 bg-cream-dark">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <!-- Text -->
        <div>
          <p class="font-body text-sm font-bold text-forest-700 uppercase tracking-widest mb-3">Why It Matters</p>
          <h2 class="font-heading text-4xl md:text-5xl font-bold text-bark leading-tight mb-6">
            In a world of uncertainty,<br />
            <span class="italic text-forest-800">grow something real.</span>
          </h2>
          <p class="font-body text-bark/80 text-lg leading-relaxed mb-5">
            Something has quietly shifted in our relationship with food. Fewer people know where their
            groceries come from, or what's in them. Supply chains are fragile. Prices keep climbing.
            And trust in what ends up on our plates is wearing thin.
          </p>
          <p class="font-body text-bark/80 text-lg leading-relaxed mb-8">
            We started Patch A Mumma because we believe growing food isn't a hobby — it's a right.
            A vegetable patch in your backyard is a quiet act of independence. We'll help you plant it,
            tend it, and make the very most of every harvest.
          </p>

          <!-- Benefits list -->
          <ul class="space-y-3">
            <li
              v-for="item in benefits"
              :key="item"
              class="flex items-center gap-3 font-body text-bark/90"
            >
              <svg class="w-5 h-5 text-forest-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Image -->
        <div class="relative">
          <div class="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80"
              alt="Thriving vegetable garden with raised beds"
              class="w-full h-full object-cover"
            />
          </div>
          <!-- Floating stat card -->
          <div class="absolute -bottom-4 -left-4 bg-forest-900 text-cream rounded-2xl p-5 shadow-xl">
            <p class="font-heading text-4xl font-bold text-forest-600">100%</p>
            <p class="font-body text-sm text-forest-200 mt-1">Organic &amp; Chemical Free</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const benefits = [
  'Know exactly what goes into your food',
  'Fresh, nutrient-rich produce at your doorstep',
  'Reduce your grocery bill year-round',
  'Build resilience and food security for your family',
  'Reconnect with the seasons and the soil',
]
</script>
