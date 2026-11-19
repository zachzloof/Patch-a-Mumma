<script setup>
const benefits = [
  'Know exactly what goes into your food',
  'Fresh, nutrient-rich produce at your doorstep',
  'Reduce your grocery bill year-round',
  'Build resilience and food security for your family',
  'Reconnect with the seasons and the soil',
]
</script>

<template>
  <section class="py-16 md:py-24" aria-labelledby="why-title">
    <div class="page-x grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-7">
        <h2 id="why-title" class="display text-[3rem] md:text-[4.5rem]">
          In a world of uncertainty, <span class="text-leaf-700">grow something real.</span>
        </h2>
        <div class="mt-8 max-w-[62ch] space-y-5 text-[1.125rem] leading-relaxed text-ink-soft">
          <p>
            Something has quietly shifted in our relationship with food. Fewer people know where their groceries come
            from, or what's in them. Supply chains are fragile. Prices keep climbing. And trust in what ends up on our
            plates is wearing thin.
          </p>
          <p>
            We started Patch A Mumma because we believe growing food isn't a hobby, it's a right. A vegetable patch in
            your back garden is a quiet act of independence. We'll help you plant it, tend it, and make the very most of
            every harvest.
          </p>
        </div>
        <ul class="mt-9 space-y-3">
          <li v-for="item in benefits" :key="item" class="flex items-start gap-3 text-[1.0625rem] font-semibold text-ink">
            <svg class="mt-0.5 h-6 w-6 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21v-9" stroke="#173D1F" stroke-width="1.8" stroke-linecap="round" />
              <path d="M12 14c-4 0-6-2.6-6-6 3.6 0 6 2.4 6 6z" fill="#8DBF5A" stroke="#173D1F" stroke-width="1.3" />
              <path d="M12 12.5c0-4 2.6-6.4 6.5-6.4 0 3.8-2.6 6.4-6.5 6.4z" fill="#4E8E35" stroke="#173D1F" stroke-width="1.3" />
            </svg>
            {{ item }}
          </li>
        </ul>
      </div>

      <figure class="lg:col-span-5 lg:pt-4">
        <div class="relative overflow-hidden border-2 border-ink bg-paper-deep">
          <img
            src="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=900&h=1125&q=75"
            alt="Gloved hands lifting a young plant with its root ball"
            width="900"
            height="1125"
            loading="lazy"
            decoding="async"
            class="aspect-[4/5] w-full object-cover"
          />
        </div>
        <figcaption class="mt-3 flex justify-between gap-4 text-[0.875rem] text-ink-soft">
          <span>Good soil first, everything else follows.</span>
          <span class="shrink-0">Photo: Unsplash</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
