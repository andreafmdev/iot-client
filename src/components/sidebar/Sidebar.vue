<template>
  <div class="flex h-screen">
    <!-- Sidebar -->

    <div
      :class="[
        isSidebarCollapsed ? 'collapsed' : 'expanded',
        ,
        'bg-gray-800 text-white p-4 flex flex-col  justify-between transition-width',
      ]"
    >
      <!-- Sidebar Link section -->
      <div class="place-items-start flex flex-col">
        <div class="flex items-center">
          <button @click="toggleSidebar" class="text-white px-2">
            <img src="@/assets/images/vite.svg" alt="Logo" class="h-8 w-auto" />
          </button>
        </div>

        <hr class="my-5 border-gray-200 mx-4" />
        <div
          class="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider"
        v-if="!isSidebarCollapsed">
          Menu
        </div>
        <SidebarMenuItem
          v-for="(item, index) in menuItems"
          :key="index"
          :name="item.name"
          :icon="item.icon"
          :link="item.link"
        />
        <hr class="my-5 border-gray-200 mx-4" />
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useStore } from "vuex";
import { key } from '@store/store';
import {sidebarItemsDefaultConfig} from "@config/sidebar/sidebarconfig";
import SidebarMenuItem from "@components/sidebar/SidebarMenuItem.vue";

console.log(sidebarItemsDefaultConfig)
// Ensure proper type assertion or ensure sidebarItemsDefaultConfig is typed
const menuItems = sidebarItemsDefaultConfig;
const store = useStore(key);

const isSidebarCollapsed = computed(() => store.state.isSidebarCollapsed);



function toggleSidebar() {
  store.commit("toggleSidebar");
}
</script>

<style scoped>
.collapsed {
  width: 5rem; /* Questa è la larghezza quando la sidebar è collassata */
}

.expanded {
  width: 16rem; /* Questa è la larghezza quando la sidebar è espansa */
}

.transition-width {
  transition: width 0.4s ease-in-out; /* Transizione di larghezza */
}
</style>
