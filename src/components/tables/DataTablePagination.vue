<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ " " }}
          <span class="font-medium">{{ startIndex }}</span>
          {{ " " }}
          to
          {{ " " }}
          <span class="font-medium">{{ endIndex }}</span>
          {{ " " }}
          of
          {{ " " }}
          <span class="font-medium">{{ totalItems }}</span>
          {{ " " }}
          results
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            @click="goToPreviousPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </button>

          <template v-for="page in visiblePages" :key="page">
            <button
              @click="goToPage(page)"
              :class="[
                currentPage === page
                  ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0',
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold',
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="goToNextPage"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import { computed, defineEmits, ref } from "vue";

// Props ricevuti dal componente genitore
const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

// Computed properties per calcolare gli indici
const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);
const startIndex = computed(
  () => (props.currentPage - 1) * props.itemsPerPage + 1
);
const endIndex = computed(() =>
  Math.min(props.totalItems, props.currentPage * props.itemsPerPage)
);

// Genera un array di pagine per la paginazione
const visiblePages = computed(() => {
  const maxVisiblePages = 5; // Mostra massimo 5 pagine visibili più le ellissi
  const pages: Array<number | string> = [];

  if (totalPages.value <= maxVisiblePages) {
    // Se ci sono poche pagine, mostrale tutte
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    const startPage = Math.max(2, props.currentPage - 1);
    const endPage = Math.min(totalPages.value - 1, props.currentPage + 1);

    // Prima pagina
    pages.push(1);

    // Ellissi se la seconda pagina non è visibile
    if (startPage > 2) {
      pages.push("...");
    }

    // Pagine intermedie
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Ellissi se la penultima pagina non è visibile
    if (endPage < totalPages.value - 1) {
      pages.push("...");
    }

    // Ultima pagina
    pages.push(totalPages.value);
  }

  return pages;
});
const emit = defineEmits(["update:currentPage"]);
// Eventi per cambiare pagina
const goToPreviousPage = () => {
  if (props.currentPage > 1) {
    emit("update:currentPage", props.currentPage - 1);
  }
};

const goToNextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit("update:currentPage", props.currentPage + 1);
  }
};

const goToPage = (page) => {
  emit("update:currentPage", page);
};
</script>
