<template>
  <div  v-if="isLoading" class="loader-container">
    <div class="loader bw xl">
      <div class="spin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLoaderStore } from "@store/loaderStore";

const loaderStore = useLoaderStore();
const isLoading = computed(() => loaderStore.isLoading);
</script>
<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 50;
}



</style>
