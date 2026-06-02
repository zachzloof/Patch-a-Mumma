<script setup>
import NavBar from './components/layout/NavBar.vue'
import FooterSection from './components/layout/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-cream font-body">
    <NavBar />
    <main class="flex-1 pt-16">
      <RouterView v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </RouterView>
    </main>
    <FooterSection />
  </div>
</template>
