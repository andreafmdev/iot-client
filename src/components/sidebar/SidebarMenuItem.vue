<template>
  <RouterLink
    :to="link"
    class="px-2 py-2 rounded-md hover:bg-gray-700 flex flex-row items-center justify-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        :d="icon"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
    <span v-if="!isSidebarCollapsed" class="ml-3">{{ name }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { key } from "@store/store";

import { RouterLink } from "vue-router";
// Define props with types
defineProps<{
  name: string;
  icon: string;
  link: string;
  isCollapsed?: boolean;
}>();

// Access Vuex store and state
const store = useStore(key);
// Computed property for sidebar collapsed state
const isSidebarCollapsed = computed(() => store.state.isSidebarCollapsed);
</script>

<style scoped>
svg {
  margin: auto; /* Centra l'icona all'interno del contenitore */
}
</style>
