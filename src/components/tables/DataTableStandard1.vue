<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the users in your account including their name, title,
          email and role.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add user
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <DataTableHead
              :columns="keys"
              :columnsAlias="columns"
              :headerCellClasses="headerClasses"
              @sort="handleSort"
            />

            <tbody>
              <DataTableRow
                v-for="(item, index) in sortedData"
                :key="index"
                :rowValue="item"
                :keys="keys"
                :cellClasses="cellClasses"
              />
            </tbody>
          </table>
          <DataTablePagination
            :totalItems="paginationTotalItems"
            @update:currentPage="handleUpdateCurrentPage"
            :currentPage="currentPage"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataTableRow from "@components/tables/DataTableRow.vue";
import DataTableHead from "@components/tables/DataTableHead.vue";
import DataTablePagination from "@components/tables/DataTablePagination.vue";

import { PropType, ref, computed } from "vue";

// Definizione dell'interfaccia per i dati di una riga
interface RowData {
  [key: string]: string | number | undefined;
}

// Props accettati dal componente DataTable
const props = defineProps({
  data: {
    type: Array as PropType<RowData[]>,
    required: true,
  },
  columns: {
    type: Array as PropType<string[]>,
    required: true,
  },
  keys: {
    type: Array as PropType<string[]>,
    required: true,
  },
  cellClasses: {
    type: Array as PropType<string[]>, // Array di classi CSS per le celle
    default: () => [],
  },
  headerClasses: {
    type: Array as PropType<string[]>, // Array di classi CSS per le intestazioni
    default: () => [],
  },
  paginationTotalItems: {
    type: Number,
    required: true,
  },
  currentPage: {
      type: Number,
      default: 1,
    },
});

// Stato iniziale e gestione dell'ordinamento
const sortState = ref<Array<{ column: string; order: "asc" | "desc" | null }>>(
  []
);

const sortedData = computed(() => {
  // Partiamo dai dati originali
  let sortedArray = [...props.data];

  sortState.value.forEach(({ column, order }) => {
    if (column && order) {
      sortedArray.sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];

        if (aValue == null) return order === "asc" ? 1 : -1;
        if (bValue == null) return order === "asc" ? -1 : 1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }
  });

  return sortedArray;
});

function handleSort(
  newSortStates: Array<{ column: string; order: "asc" | "desc" | null }>
) {
  // Cancella lo stato di ordinamento corrente per ricostruirlo
  const updatedSortState: Array<{
    column: string;
    order: "asc" | "desc" | null;
  }> = [];

  newSortStates.forEach((newSortState) => {
    const existingSortIndex = sortState.value.findIndex(
      (sort) => sort.column === newSortState.column
    );

    if (existingSortIndex > -1) {
      // Se la colonna è già ordinata, aggiorna l'ordine
      if (sortState.value[existingSortIndex].order === "asc") {
        // Se era ascendente, la portiamo a discendente
        updatedSortState.push({ column: newSortState.column, order: "desc" });
      } else if (sortState.value[existingSortIndex].order === "desc") {
        // Se era discendente, la rimuoviamo dall'ordinamento
        // Questo lascia invariato updatedSortState, quindi non facciamo nulla
      }
    } else {
      // Se è una nuova colonna, la aggiungiamo come ordinamento ascendente
      updatedSortState.push({ column: newSortState.column, order: "asc" });
    }
  });

  // Aggiorniamo lo stato di ordinamento con l'ordine aggiornato
  sortState.value = updatedSortState;
}
const emit = defineEmits(["paginationPageUpdate"]);
function handleUpdateCurrentPage(page){
  emit('paginationPageUpdate', page);

}
</script>
