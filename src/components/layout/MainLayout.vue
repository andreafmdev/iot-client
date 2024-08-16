<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Navbar />
      <main class="flex-1 p-6 bg-gray-100">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// TypeScript enabled
import { ref } from "vue";
import Sidebar from "@components/sidebar/Sidebar.vue"
import Navbar from "@components/navbar/Navbar.vue"

</script>

<style scoped>
/* Add component-specific styles here */
</style>
