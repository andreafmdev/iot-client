import { defineStore } from 'pinia';

// Define the interface for the state
interface SidebarState {
  isSidebarCollapsed: boolean;
}

// Define the store
export const useSidebarStore = defineStore({
  id: 'sidebar',
  state: (): SidebarState => ({
    isSidebarCollapsed: false,
  }),
  actions: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed; // Directly mutate the state
    },
  },
 
});
