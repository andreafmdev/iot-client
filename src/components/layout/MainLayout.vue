<template>
  <div class="flex flex-col h-screen bg-white">
    <div class="z-40">
      <Navbar />
    </div>
    <!-- Secondo container per Sidebar e Main Content -->
    <div class="flex flex-1">
      <Sidebar />
      <main class="flex-1 p-6 bg-gray-100">
        <RouterView></RouterView>
      </main>
    </div>

    <Loader></Loader>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@components/sidebar/SidebarNew.vue";
import Navbar from "@components/navbar/NavbarNew.vue";
import Loader from "@components/loader/Loader.vue";
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();

// Check the authentication status on component mount
onMounted(() => {
  authStore.checkAuthStatus();
});
</script>

<style scoped>
/* Add component-specific styles here */
</style>
