<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import ServicesPreview from '../components/home/ServicesPreview.vue'
import HowItWorks from '../components/home/HowItWorks.vue'
import MissionSection from '../components/home/MissionSection.vue'
import SowingCalendar from '../components/home/SowingCalendar.vue'
import TestimonialsSection from '../components/home/TestimonialsSection.vue'
import CtaSection from '../components/home/CtaSection.vue'
import VineRail from '../components/art/VineRail.vue'
import RootRail from '../components/art/RootRail.vue'
import StrataEdge from '../components/art/StrataEdge.vue'
</script>

<template>
  <div>
    <HeroSection />
    <!-- One sheet of survey paper, horizons drawn between the passes -->
    <div class="relative">
      <ServicesPreview />
      <StrataEdge top="#FAF9F4" bottom="#FAF9F4" :seed="31" :amp="5" line="#C9BFA9" />
      <HowItWorks />
      <StrataEdge top="#FAF9F4" bottom="#FAF9F4" :seed="32" :amp="5" line="#C9BFA9" />
      <MissionSection />
      <StrataEdge top="#FAF9F4" bottom="#FAF9F4" :seed="33" :amp="5" line="#C9BFA9" />
      <SowingCalendar />
      <RootRail :seed="19" :start-cm="30" />
      <VineRail :seed="7" />
    </div>
    <TestimonialsSection />
    <CtaSection />
  </div>
</template>
