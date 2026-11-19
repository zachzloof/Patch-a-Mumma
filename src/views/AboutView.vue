<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/shared/PageHero.vue'
import TwoTomatoes from '../components/art/TwoTomatoes.vue'
import StrataEdge from '../components/art/StrataEdge.vue'
import SoilFill from '../components/art/SoilFill.vue'

const values = [
  {
    glyph: 'community',
    title: 'Community',
    description:
      'Food grows better when we grow it together. We love connecting growers, sharing knowledge, and building neighbourhoods where people help each other eat well.',
  },
  {
    glyph: 'compost',
    title: 'Sustainability',
    description:
      'Every seed we plant is a vote for the kind of food system we want. We use organic practices, build soil health, and compost everything, because the land gives back what you put in.',
  },
  {
    glyph: 'book',
    title: 'Education',
    description:
      "We don't just build gardens, we teach you how to use them. Every visit is a chance to share a little more knowledge, so you feel more confident and connected to what you're growing.",
  },
  {
    glyph: 'basket',
    title: 'Abundance',
    description:
      "There is always more than enough when you grow your own. We help people experience the incredible feeling of eating food they've grown themselves, and sharing it with the people they love.",
  },
]
</script>

<template>
  <div>
    <PageHero title="About us" subtitle="Why we started, and what drives us." :seed="7" />

    <section class="py-16 md:py-24" aria-labelledby="story-title">
      <div class="page-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div class="lg:col-span-6">
          <h2 id="story-title" class="display text-[3rem] md:text-[4.25rem]">
            It started with a <span class="text-tomato">questionable tomato.</span>
          </h2>
          <div class="mt-8 max-w-[62ch] space-y-5 text-[1.125rem] leading-relaxed text-ink-soft">
            <p>
              Like most people, we grew up trusting that the food in supermarkets was safe, fresh, and honestly
              labelled. Then, gradually, we started asking questions we couldn't unask. About pesticides. About
              ultra-processing. About how far a vegetable travels before it reaches your plate.
            </p>
            <p>
              We decided to do something about it, in our own back garden first. Then in our neighbours'. Then further.
              Patch A Mumma grew out of that simple impulse: help people grow real food, close to home, with their own
              hands.
            </p>
            <p>
              We're not here to preach or make anyone anxious. We're here to make growing your own food feel
              achievable, joyful, and genuinely delicious. One patch at a time.
            </p>
          </div>
        </div>
        <figure class="lg:col-span-6">
          <TwoTomatoes />
          <figcaption class="mt-3 grid grid-cols-2 gap-4 text-center text-[0.9375rem] font-semibold text-ink-soft">
            <span>Grown where? Sprayed with what?</span>
            <span>Grown here. Nothing added.</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="bg-paper-deep py-16 md:py-24" aria-labelledby="values-title">
      <div class="page-x">
        <h2 id="values-title" class="display text-[3rem] md:text-[4.25rem]">What we stand for</h2>
        <ul class="mt-10 grid gap-x-12 border-t-2 border-ink md:mt-14 md:grid-cols-2">
          <li v-for="v in values" :key="v.title" class="grid grid-cols-[3.5rem_1fr] gap-5 border-b border-ink/15 py-8">
            <svg viewBox="0 0 56 56" class="h-14 w-14" aria-hidden="true" fill="none" stroke="#173D1F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <g v-if="v.glyph === 'community'">
                <path d="M6 46c2-8 8-12 14-12s12 4 14 12" fill="#8DBF5A" />
                <circle cx="20" cy="24" r="6" fill="#E9B160" />
                <path d="M26 46c2-7 7-10 12-10s10 3 12 10" fill="#4E8E35" />
                <circle cx="38" cy="28" r="5" fill="#E9B160" />
                <path d="M28 14v-6m0 3c-3 0-4-2-4-4 3 0 4 2 4 4zm0-1c0-3 2-4 4-4 0 3-2 4-4 4z" fill="#8DBF5A" />
              </g>
              <g v-else-if="v.glyph === 'compost'">
                <path d="M6 46c4-16 14-24 22-24s18 8 22 24z" fill="#3A2518" />
                <path d="M16 36c4 1 6-2 10-1M30 40c4 0 6-3 10-2M22 44c3 0 5-2 8-1" stroke="#C08A3E" />
                <path d="M24 20c-2-6 2-10 6-10M30 22l4-8M20 24l-6-6" stroke="#4E8E35" stroke-width="2" />
                <path d="M2 46h52" />
              </g>
              <g v-else-if="v.glyph === 'book'">
                <path d="M6 16c8-3 16-3 22 2 6-5 14-5 22-2v28c-8-3-16-3-22 2-6-5-14-5-22-2z" fill="#FAF9F4" />
                <path d="M28 18v28" />
                <path d="M11 24h12M11 30h12M33 24h12M33 30h10" stroke="#8B989D" stroke-width="1.2" />
                <path d="M28 14V6m0 4c-3 0-5-2-5-5 3 0 5 2 5 5zm0-2c0-3 2-5 5-5 0 3-2 5-5 5z" fill="#8DBF5A" />
              </g>
              <g v-else>
                <path d="M6 26h44l-5 22H11z" fill="#C9A26B" />
                <path d="M10 32h36M12 40h32M18 26l2 22M28 26v22M38 26l-2 22" stroke-width="1" />
                <path d="M16 26c0-14 24-14 24 0" />
                <circle cx="18" cy="22" r="6" fill="#D8432E" />
                <path d="M26 24c0-8 6-12 10-10-1 6-5 10-10 10z" fill="#4E8E35" />
                <path d="M36 25l8-14 3 2-6 13z" fill="#E87A24" />
              </g>
            </svg>
            <div>
              <h3 class="condensed text-[1.75rem]">{{ v.title }}</h3>
              <p class="mt-2 max-w-[52ch] leading-relaxed text-ink-soft">{{ v.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section aria-labelledby="quote-title">
      <StrataEdge top="#F1EFE6" bottom="#3A2518" :seed="61" line="#2A1A10" />
      <div class="relative overflow-hidden text-paper">
        <SoilFill kind="topsoil" :seed="44" />
        <div class="page-x relative py-16 md:py-24">
          <h2 id="quote-title" class="sr-only">Our belief</h2>
          <blockquote class="display max-w-[22ch] text-[2.75rem] text-paper md:text-[4.5rem]">
            “A vegetable patch in your back garden isn't just a garden. It's a quiet act of independence.”
          </blockquote>
          <RouterLink to="/contact#book" class="btn-rust mt-10">Start growing with us</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
