// src/stores/loaderStore.ts
import { defineStore } from 'pinia';

export const useLoaderStore = defineStore({
  id: 'loader',
  state: () => ({
    loading: false, // Stato di caricamento iniziale
  }),
  actions: {
    startLoading() {
      this.loading = true; // Imposta lo stato di caricamento su true
    },
    stopLoading() {
      this.loading = false; // Imposta lo stato di caricamento su false
    },
  },
  getters: {
    isLoading: (state) => state.loading, // Restituisce lo stato attuale del caricamento
  },
});
