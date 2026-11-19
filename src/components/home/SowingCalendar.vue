<script setup>
import { RouterLink } from 'vue-router'

// General UK sowing and harvest windows (month numbers 1-12). These are
// common horticultural guidelines, not promises about any one garden.
const crops = [
  { name: 'Broad beans', sow: [2, 3, 4, 10, 11], harvest: [6, 7, 8] },
  { name: 'Garlic', sow: [2, 3, 10, 11, 12], harvest: [6, 7, 8], verb: 'Plant' },
  { name: 'Tomatoes', sow: [2, 3, 4], harvest: [7, 8, 9, 10], note: 'sown indoors' },
  { name: 'Runner beans', sow: [5, 6], harvest: [7, 8, 9, 10] },
  { name: 'Courgettes', sow: [4, 5, 6], harvest: [6, 7, 8, 9, 10] },
  { name: 'Carrots', sow: [4, 5, 6, 7], harvest: [6, 7, 8, 9, 10, 11] },
  { name: 'Beetroot', sow: [4, 5, 6, 7], harvest: [6, 7, 8, 9, 10] },
  { name: 'Kale', sow: [3, 4, 5, 6], harvest: [1, 2, 3, 9, 10, 11, 12] },
  { name: 'Lettuce', sow: [3, 4, 5, 6, 7, 8], harvest: [5, 6, 7, 8, 9, 10] },
]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const now = new Date().getMonth() + 1
const state = (c, m) => (c.sow.includes(m) ? 'sow' : c.harvest.includes(m) ? 'harvest' : '')
const sowingNow = crops.filter((c) => c.sow.includes(now)).map((c) => c.name.toLowerCase())
</script>

<template>
  <section class="py-16 md:py-24" aria-labelledby="cal-title">
    <div class="page-x grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div class="lg:col-span-4">
        <h2 id="cal-title" class="display text-[3rem] md:text-[4rem]">What grows when</h2>
        <p class="mt-5 max-w-[40ch] text-[1.125rem] leading-relaxed text-ink-soft">
          A food patch runs on the calendar, not on willpower.
          <template v-if="sowingNow.length">
            This month you could be sowing or planting
            <strong class="text-ink">{{ sowingNow.join(', ') }}</strong>.
          </template>
          <template v-else>This month is for planning, clearing and feeding the soil.</template>
        </p>
        <RouterLink to="/contact#book" class="link mt-4 inline-block py-2.5 text-[1.0625rem] text-rust decoration-rust/40 hover:decoration-rust">
          Plan your first season with us
        </RouterLink>
      </div>

      <div class="lg:col-span-8">
        <table class="w-full table-fixed border-collapse text-left">
          <caption class="sr-only">General UK sowing and harvest months for common kitchen-garden crops</caption>
          <thead>
            <tr>
              <th scope="col" class="w-[6.5rem] pb-3 text-[0.8125rem] font-semibold text-ink-soft sm:w-40">Crop</th>
              <th
                v-for="(m, i) in months"
                :key="m"
                scope="col"
                class="pb-3 text-center text-[0.75rem] font-semibold sm:text-[0.8125rem]"
                :class="i + 1 === now ? 'text-rust' : 'text-ink-soft'"
              >
                <abbr :title="m" class="no-underline"><span class="sm:hidden">{{ m[0] }}</span><span class="hidden sm:inline">{{ m }}</span></abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in crops" :key="c.name" class="border-t border-ink/15">
              <th scope="row" class="py-2.5 pr-2 text-[0.9375rem] font-bold leading-tight text-ink sm:text-[1rem]">
                {{ c.name }}
                <span v-if="c.note" class="block text-[0.75rem] font-normal text-ink-soft">{{ c.note }}</span>
              </th>
              <td
                v-for="m in 12"
                :key="m"
                class="relative p-0 py-2.5"
                :class="m === now ? 'bg-rust-light/60' : ''"
              >
                <span
                  v-if="state(c, m)"
                  class="mx-[1px] block h-4 rounded-[2px] sm:h-5"
                  :class="state(c, m) === 'sow' ? 'cal-sow' : 'bg-tomato'"
                >
                  <span class="sr-only">{{ months[m - 1] }}: {{ state(c, m) === 'sow' ? (c.verb || 'Sow') : 'Harvest' }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.875rem] text-ink-soft">
          <span class="flex items-center gap-2"><span class="cal-sow inline-block h-4 w-6 rounded-[2px]" aria-hidden="true" />Sow or plant</span>
          <span class="flex items-center gap-2"><span class="inline-block h-4 w-6 rounded-[2px] bg-tomato" aria-hidden="true" />Harvest</span>
          <span class="flex items-center gap-2"><span class="inline-block h-4 w-6 bg-rust-light" aria-hidden="true" />This month</span>
          <span>General UK timings. Every garden is different; we plan yours on the free visit.</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cal-sow {
  background-color: #4e8e35;
  background-image: radial-gradient(circle at 50% 50%, #ddebc4 1.4px, transparent 1.6px);
  background-size: 7px 7px;
}
</style>
