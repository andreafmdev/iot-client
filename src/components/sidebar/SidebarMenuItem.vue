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

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useSidebarStore } from '@store/sidebarStore';

import { RouterLink } from "vue-router";

export default defineComponent({
  name: "SidebarMenuItem", // Fixed typo in component name
  props: {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // Access Vuex store and state
    const sidebarStore = useSidebarStore();

    // Computed property for sidebar collapsed state
    const isSidebarCollapsed = computed(() => sidebarStore.isSidebarCollapsed);

    // Return everything that is needed in the template
    return {
      isSidebarCollapsed,
      ...props, // Spread props to make them available in the template
    };
  },
});
</script>

<style scoped>
svg {
  margin: auto; /* Center the icon within the container */
}
</style>
