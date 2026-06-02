<script setup>
import { ref } from 'vue'
import PageHero from '../components/shared/PageHero.vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
})

const submitting = ref(false)
const submitted = ref(false)
const error = ref('')

const services = [
  'Garden Design & Planning',
  'Installation & Planting',
  'Ongoing Maintenance',
  'Fermentation & Preservation',
  'Workshops',
  'Not sure yet — let\'s chat',
]

const submitForm = async () => {
  submitting.value = true
  error.value = ''

  try {
    // Replace YOUR_FORM_ID with your Formspree form ID after signing up at formspree.io
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(form.value),
    })

    if (response.ok) {
      submitted.value = true
      form.value = { name: '', email: '', phone: '', service: '', message: '' }
    } else {
      error.value = 'Something went wrong. Please email us directly at hello@patchamumma.com.au'
    }
  } catch {
    error.value = 'Something went wrong. Please email us directly at hello@patchamumma.com.au'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <PageHero
      title="Let's Grow Together"
      subtitle="Book a consultation or send us a message — we'd love to hear from you."
      image="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1920&q=80"
    />

    <section class="py-20 bg-cream">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">

        <!-- Booking section -->
        <div class="mb-20">
          <div class="text-center mb-12">
            <p class="font-body text-sm font-bold text-forest-700 uppercase tracking-widest mb-3">Step 1</p>
            <h2 class="font-heading text-4xl font-bold text-bark mb-4">Book a Free Consultation</h2>
            <p class="font-body text-bark/70 max-w-xl mx-auto leading-relaxed">
              Pick a time that works for you and we'll have a no-pressure chat about your space,
              your goals, and how we can help.
            </p>
          </div>

          <!-- Calendly placeholder -->
          <div class="bg-forest-100 border-2 border-dashed border-forest-300 rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <svg class="w-12 h-12 text-forest-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <h3 class="font-heading text-2xl font-bold text-bark mb-3">Calendly Booking</h3>
            <p class="font-body text-bark/70 mb-6 leading-relaxed">
              Your booking calendar will appear here once you connect your Calendly account.
              Replace the placeholder URL in <code class="bg-cream-dark px-1.5 py-0.5 rounded text-sm">ContactView.vue</code> with your link.
            </p>
            <!-- When you have your Calendly URL, replace the href below and remove the placeholder div above -->
            <a
              href="https://calendly.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-earth py-3 px-8 rounded-full text-base"
            >
              Open Booking Calendar
            </a>
          </div>

          <!--
            To embed Calendly inline, replace the placeholder above with:

            <div class="calendly-inline-widget" data-url="https://calendly.com/YOUR_USERNAME/30min" style="min-width:320px;height:700px;"></div>
            <component :is="'script'" type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
          -->
        </div>

        <!-- Divider -->
        <div class="flex items-center gap-4 mb-20 max-w-2xl mx-auto">
          <div class="flex-1 h-px bg-cream-dark" />
          <span class="font-body text-bark/50 text-sm">or send us a message</span>
          <div class="flex-1 h-px bg-cream-dark" />
        </div>

        <!-- Contact form -->
        <div class="max-w-2xl mx-auto">
          <div class="text-center mb-10">
            <p class="font-body text-sm font-bold text-forest-700 uppercase tracking-widest mb-3">Step 2</p>
            <h2 class="font-heading text-4xl font-bold text-bark mb-4">Send Us a Message</h2>
            <p class="font-body text-bark/70 leading-relaxed">
              Prefer to write? Fill in the form and we'll get back to you within one business day.
            </p>
          </div>

          <!-- Success state -->
          <div v-if="submitted" class="bg-forest-100 border border-forest-300 rounded-2xl p-10 text-center">
            <svg class="w-14 h-14 text-forest-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 class="font-heading text-2xl font-bold text-bark mb-2">Message sent!</h3>
            <p class="font-body text-bark/70">We'll be in touch within one business day. Thanks for reaching out.</p>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="submitForm" class="space-y-5">
            <!-- Name + Email -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label for="name" class="block font-body text-sm font-bold text-bark mb-2">Your Name *</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Jane Smith"
                  class="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 font-body text-bark focus:outline-none focus:border-forest-600 focus:ring-2 focus:ring-forest-600/20 transition-colors"
                />
              </div>
              <div>
                <label for="email" class="block font-body text-sm font-bold text-bark mb-2">Email Address *</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  class="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 font-body text-bark focus:outline-none focus:border-forest-600 focus:ring-2 focus:ring-forest-600/20 transition-colors"
                />
              </div>
            </div>

            <!-- Phone + Service -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label for="phone" class="block font-body text-sm font-bold text-bark mb-2">Phone (optional)</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="04XX XXX XXX"
                  class="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 font-body text-bark focus:outline-none focus:border-forest-600 focus:ring-2 focus:ring-forest-600/20 transition-colors"
                />
              </div>
              <div>
                <label for="service" class="block font-body text-sm font-bold text-bark mb-2">Interested In</label>
                <select
                  id="service"
                  v-model="form.service"
                  class="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 font-body text-bark focus:outline-none focus:border-forest-600 focus:ring-2 focus:ring-forest-600/20 transition-colors appearance-none"
                >
                  <option value="" disabled>Select a service...</option>
                  <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block font-body text-sm font-bold text-bark mb-2">Your Message *</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                placeholder="Tell us a bit about your space and what you'd like to achieve..."
                class="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 font-body text-bark focus:outline-none focus:border-forest-600 focus:ring-2 focus:ring-forest-600/20 transition-colors resize-none"
              />
            </div>

            <!-- Error message -->
            <p v-if="error" class="font-body text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {{ error }}
            </p>

            <p class="font-body text-xs text-bark/50">
              * Required fields. We'll never share your details with third parties.
            </p>

            <button
              type="submit"
              :disabled="submitting"
              class="btn-earth w-full py-4 rounded-xl text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span v-if="submitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </form>
        </div>

        <!-- Direct contact -->
        <div class="mt-16 pt-12 border-t border-cream-dark text-center">
          <p class="font-body text-bark/60 text-sm mb-3">Prefer to reach us directly?</p>
          <a
            href="mailto:hello@patchamumma.com.au"
            class="font-heading text-xl font-semibold text-forest-800 hover:text-forest-700 transition-colors"
          >
            hello@patchamumma.com.au
          </a>
        </div>

      </div>
    </section>
  </div>
</template>
