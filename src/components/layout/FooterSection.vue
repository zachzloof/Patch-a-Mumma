<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="bg-forest-900 text-forest-200">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

        <!-- Brand -->
        <div class="md:col-span-2">
          <RouterLink to="/" class="flex items-center gap-2 mb-4 group w-fit">
            <svg class="w-7 h-7 text-forest-600 group-hover:text-forest-200 transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 3-11 5.5 3-4.5 10-4 10-4S17 8 17 8z"/>
            </svg>
            <span class="font-heading text-xl font-bold text-cream">Patch A Mumma</span>
          </RouterLink>
          <p class="text-sm leading-relaxed mb-5 text-forest-200/80 max-w-xs">
            Helping everyday people across Essex reclaim their food through vegetable gardens,
            fruit trees, herbs, and the ancient art of fermentation.
          </p>
          <div class="flex gap-3">
            <a
              href="#"
              class="w-9 h-9 bg-forest-800 rounded-full flex items-center justify-center hover:bg-forest-700 transition-colors"
              aria-label="Instagram"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="#"
              class="w-9 h-9 bg-forest-800 rounded-full flex items-center justify-center hover:bg-forest-700 transition-colors"
              aria-label="Facebook"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="font-heading text-cream font-semibold mb-4 text-base">Explore</h4>
          <ul class="space-y-2 text-sm">
            <li><RouterLink to="/" class="hover:text-cream transition-colors">Home</RouterLink></li>
            <li><RouterLink to="/services" class="hover:text-cream transition-colors">Services</RouterLink></li>
            <li><RouterLink to="/about" class="hover:text-cream transition-colors">About Us</RouterLink></li>
            <li><RouterLink to="/gallery" class="hover:text-cream transition-colors">Gallery</RouterLink></li>
            <li><RouterLink to="/contact" class="hover:text-cream transition-colors">Contact</RouterLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-heading text-cream font-semibold mb-4 text-base">Get In Touch</h4>
          <ul class="space-y-3 text-sm text-forest-200/80">
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 mt-0.5 text-forest-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <a href="mailto:penny@patch-a-mumma.co.uk" class="hover:text-cream transition-colors break-all">
                penny@patch-a-mumma.co.uk
              </a>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 mt-0.5 text-forest-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span>Chelmsford, Essex, UK</span>
            </li>
          </ul>
          <RouterLink
            to="/contact"
            class="btn-earth inline-block mt-4 text-sm py-2 px-4 rounded-lg"
          >
            Book a Consultation
          </RouterLink>
        </div>
      </div>

      <div class="border-t border-forest-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-forest-200/50">
        <p>© 2024 Patch A Mumma. All rights reserved.</p>
        <p class="font-heading italic">Grown with love, harvested with purpose.</p>
      </div>
    </div>
  </footer>
</template>
