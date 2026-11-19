<script setup>
import { ref } from 'vue'
import PageHero from '../components/shared/PageHero.vue'
import ServiceGlyph from '../components/art/ServiceGlyph.vue'
import { services, CONTACT } from '../data/services.js'

const form = ref({ name: '', email: '', phone: '', service: '', message: '' })
const submitting = ref(false)
const submitted = ref(false)
const error = ref('')
const statusEl = ref(null)

const serviceOptions = [...services.map((s) => s.title), "Not sure yet, let's chat"]

const submitForm = async () => {
  submitting.value = true
  error.value = ''
  try {
    const response = await fetch(CONTACT.formspree, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form.value),
    })
    if (response.ok) {
      submitted.value = true
      form.value = { name: '', email: '', phone: '', service: '', message: '' }
    } else {
      error.value = `Your message didn't send. Please try again, or email us directly at ${CONTACT.email}.`
    }
  } catch {
    error.value = `Your message didn't send (it looks like a connection problem). Please try again, or email us at ${CONTACT.email}.`
  } finally {
    submitting.value = false
    statusEl.value?.focus()
  }
}

const field =
  'w-full rounded-none border-2 border-ink/40 bg-white px-4 py-3.5 text-[1.0625rem] text-ink placeholder:text-ink-faint transition-colors hover:border-ink/70 focus:border-ink focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-rust'
</script>

<template>
  <div>
    <PageHero
      title="Let's grow together"
      subtitle="Book a free consultation or send us a message. We'd love to hear from you."
      :seed="17"
      :cta="false"
    />

    <div class="page-x grid gap-16 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
      <!-- Book -->
      <section id="book" class="scroll-mt-24 lg:col-span-5" aria-labelledby="book-title">
        <h2 id="book-title" class="display text-[2.75rem] md:text-[3.5rem]">Book a free chat</h2>
        <p class="mt-4 max-w-[44ch] text-[1.125rem] leading-relaxed text-ink-soft">
          Pick a time that works for you and we'll have a no-pressure chat about your space, your goals, and how we can
          help.
        </p>

        <div class="mt-8 border-2 border-ink bg-leaf-100/60 p-6 md:p-8">
          <div class="flex items-center gap-4">
            <svg class="h-14 w-14 shrink-0" viewBox="0 0 56 56" aria-hidden="true" fill="none" stroke="#173D1F" stroke-width="1.6" stroke-linejoin="round">
              <rect x="6" y="10" width="44" height="40" rx="2" fill="#FAF9F4" />
              <path d="M6 20h44" />
              <rect x="6" y="10" width="44" height="10" fill="#B23C1C" />
              <path d="M16 6v8M40 6v8" stroke-width="2.4" stroke-linecap="round" />
              <path d="M13 27h6M25 27h6M37 27h6M13 35h6M25 35h6M13 43h6" stroke="#8B989D" stroke-width="2" />
              <path d="M40 41v-8m0 3c-3 0-4-2-4-4 3 0 4 2 4 4zm0-1c0-3 2-4 4-4 0 3-2 4-4 4z" fill="#8DBF5A" />
            </svg>
            <p class="condensed text-[1.5rem] leading-tight">30 minutes, free, no obligation</p>
          </div>
          <a :href="CONTACT.calendly" target="_blank" rel="noopener noreferrer" class="btn-rust mt-6 w-full">
            Open the booking calendar
            <svg class="h-5 w-5" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 4h8v8M16 4 6 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span class="sr-only">(opens Calendly in a new tab)</span>
          </a>
          <p class="mt-4 text-[0.9375rem] text-ink-soft">Booking opens in Calendly in a new tab.</p>
        </div>

        <div class="mt-10 border-t-2 border-ink pt-6">
          <h3 class="condensed text-[1.375rem]">Prefer to reach us directly?</h3>
          <a :href="`mailto:${CONTACT.email}`" class="link mt-2 inline-block break-all text-[1.1875rem] text-ink">{{ CONTACT.email }}</a>
          <p class="mt-2 text-ink-soft">{{ CONTACT.place }}</p>
        </div>
      </section>

      <!-- Message -->
      <section class="lg:col-span-7" aria-labelledby="msg-title">
        <h2 id="msg-title" class="display text-[2.75rem] md:text-[3.5rem]">Or send a message</h2>
        <p class="mt-4 max-w-[52ch] text-[1.125rem] leading-relaxed text-ink-soft">
          Prefer to write? Fill in the form and we'll get back to you within one business day.
        </p>

        <div ref="statusEl" tabindex="-1" class="focus:outline-none" aria-live="polite">
          <div v-if="submitted" class="mt-8 border-2 border-ink bg-leaf-100 p-8">
            <ServiceGlyph name="tray" class="h-16 w-16" />
            <p class="condensed mt-4 text-[2rem]">Message sent. Thank you!</p>
            <p class="mt-2 text-[1.0625rem] text-ink-soft">We'll be in touch within one business day.</p>
            <button type="button" class="link mt-5 text-ink" @click="submitted = false">Send another message</button>
          </div>
        </div>

        <form v-if="!submitted" class="mt-8 space-y-6" @submit.prevent="submitForm">
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label for="name" class="mb-2 block font-bold">Your name <span class="font-normal text-ink-soft">(required)</span></label>
              <input id="name" v-model="form.name" type="text" required autocomplete="name" placeholder="Jane Smith" :class="field" />
            </div>
            <div>
              <label for="email" class="mb-2 block font-bold">Email address <span class="font-normal text-ink-soft">(required)</span></label>
              <input id="email" v-model="form.email" type="email" required autocomplete="email" inputmode="email" placeholder="jane@example.com" :class="field" />
            </div>
          </div>
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label for="phone" class="mb-2 block font-bold">Phone <span class="font-normal text-ink-soft">(optional)</span></label>
              <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" placeholder="07XXX XXX XXX" :class="field" />
            </div>
            <div>
              <label for="service" class="mb-2 block font-bold">Interested in</label>
              <div class="relative">
                <select id="service" v-model="form.service" :class="[field, 'appearance-none pr-11']">
                  <option value="">Choose a service (optional)</option>
                  <option v-for="s in serviceOptions" :key="s" :value="s">{{ s }}</option>
                </select>
                <svg class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6l5 5 5-5" fill="none" stroke="#10291C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </div>
            </div>
          </div>
          <div>
            <label for="message" class="mb-2 block font-bold">Your message <span class="font-normal text-ink-soft">(required)</span></label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="6"
              placeholder="Tell us a bit about your space and what you'd like to grow…"
              :class="[field, 'resize-y']"
            />
          </div>

          <p v-if="error" role="alert" class="border-2 border-rust bg-rust-light px-4 py-3 font-semibold text-rust-dark">{{ error }}</p>

          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-[0.9375rem] text-ink-soft">We'll never share your details with third parties.</p>
            <button type="submit" :disabled="submitting" class="btn-ink w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:px-10">
              {{ submitting ? 'Sending…' : 'Send message' }}
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
