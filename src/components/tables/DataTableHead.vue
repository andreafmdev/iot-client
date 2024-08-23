<template>
  <tr>
    <th
      v-for="(alias, index) in columnsAlias"
      :key="index"
      :class="headerCellClasses[index] || ''"
      @click="toggleSort(columns[index])"
      class="cursor-pointer"
    >
      {{ alias }}
      <span v-if="getSortOrder(columns[index])">
        <!-- Freccia giù (ordinamento discendente) -->
        <svg
          v-if="getSortOrder(columns[index]) === 'desc'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 inline-block"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 17a1 1 0 01-.993-.883L9 16v-8.586l-2.293 2.293a1 1 0 01-1.497-1.32l.083-.094 4-4a1 1 0 011.32-.083l.094.083 4 4a1 1 0 01-1.32 1.497l-.094-.083L11 7.414V16a1 1 0 01-.883.993L10 17z"
            clip-rule="evenodd"
          />
        </svg>
        <!-- Freccia su (ordinamento ascendente) -->
        <svg
          v-else-if="getSortOrder(columns[index]) === 'asc'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 inline-block"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 01.993.883L11 4v8.586l2.293-2.293a1 1 0 011.497 1.32l-.083.094-4 4a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l.094.083L9 12.586V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="ml-1 text-xs">{{ getSortIndex(columns[index]) }}</span>
      </span>
    </th>
  </tr>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  columns: {
    type: Array as () => string[],
    required: true,
  },
  columnsAlias: {
    type: Array as () => string[],
    required: true,
  },
  headerCellClasses: {
    type: Array as () => string[],
    default: () => [],
  },
});

const emit = defineEmits(["sort"]);

const sortState = ref<Array<{ column: string; order: "asc" | "desc" | null }>>(
  []
);

function toggleSort(column: string) {

  const existingSort = sortState.value.find((sort) => sort.column === column);
  if (existingSort) {
    // Toggle order or remove if already ascending
    if (existingSort.order === "asc") {
      existingSort.order = "desc";
    } else if (existingSort.order === "desc") {
      sortState.value = sortState.value.filter(
        (sort) => sort.column !== column
      );
    }
  } else {
    // Default to descending order if not already sorted
    sortState.value.push({ column, order: "asc" });
  }

  emitSortEvent();
}

function emitSortEvent() {
  emit("sort", sortState.value);
}

function getSortOrder(column: string): "asc" | "desc" | null {
  const sort = sortState.value.find((sort) => sort.column === column);
  return sort ? sort.order : null;
}

function getSortIndex(column: string): number | null {
  const index = sortState.value.findIndex((sort) => sort.column === column);
  return index !== -1 ? index + 1 : null;
}
</script>
