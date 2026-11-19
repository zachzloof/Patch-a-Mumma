<script setup>
import NavBar from './components/layout/NavBar.vue'
import FooterSection from './components/layout/FooterSection.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-paper">
    <NavBar />
    <main id="main" tabindex="-1" class="flex-1 focus:outline-none">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <FooterSection />
  </div>
</template>
