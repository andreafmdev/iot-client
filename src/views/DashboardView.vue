<template>
  <div>
    <div class="flex flex-col justify-between im">
      <!--# TITOLO DASHBOARD ... -->

      <p class="lg:text-2xl font-semibold leading-1 sm:text-base text-gray-900">
        Last 30 days
      </p>

      <!--#  VALUE METER CARDS ... -->

      <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ValueMeterCard
          v-for="item in stats"
          :key="item.id"
          :icon="item.icon"
          :name="item.name"
          :stat="item.stat"
          :change="item.change"
          :changeType="item.changeType"
        />
      </div>

      <!--# GRAFICI ... -->

      <div class="grid grid-cols-4 gap-4 mt-5">
        <DashboardCard
          ><template #title>
            <h1 class="text-lg font-medium leading-6 text-gray-900">Grafico</h1>
          </template>
          <template #body>
            <BarChart></BarChart>
          </template>
        </DashboardCard>
        <!-- ... -->
        <div></div>
      </div>

      <div class="grid grid-cols- gap-4 mt-5"></div>
      <!--# lista dati PAGINati ... -->
    </div>
    <div
      class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
    >
      <!--# DatatableResult  ... -->

      <DataTableStandard
        :data="measures"
        :columns="['ID', 'Description', 'Value', 'Sensor Type']"
        :keys="['_id', 'desc', 'value', 'type']"
        :cellClasses="[
          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3',
          'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
          'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
          'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
        ]"
        :headerClasses="[
          'py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-3',
          'px-3 py-3.5 text-left text-lg font-semibold text-gray-900',
          'px-3 py-3.5 text-left text-lg font-semibold text-gray-900',
          'px-3 py-3.5 text-left text-lg font-semibold text-gray-900',
        ]"
        
        :paginationTotalItems="totalMeasureItems"
        @paginationPageUpdate="handlePageChange"
        :currentPage="currentMeasurePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMeasures } from "@/services/measureService";
import DashboardCard from "@components/dashboard/cards/DashboardCard.vue";
import ValueMeterCard from "@components/dashboard/cards/ValueMeterCard.vue";
import DataTableStandard from "@components/tables/DataTableStandard1.vue";

import { Ref, ref, onMounted } from "vue";
import { PaginatedMeasureResponse, MeasureResponse } from "@/types/MeasureType";
import BarChart from "@/components/charts/BarChart.vue";

import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";

const stats = [
  {
    id: 1,
    name: "Total Subscribers",
    stat: "71,897",
    icon: UsersIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Avg. Open Rate",
    stat: "58.16%",
    icon: EnvelopeOpenIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Click Rate",
    stat: "24.57%",
    icon: CursorArrowRaysIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

// Reactive state to store the people data and pagination details
const measures = ref<MeasureResponse[]>([]);
const totalMeasureItems = ref(0);

const currentMeasurePage = ref(1);

const itemsPerPage = ref(parseInt(import.meta.env.DATATABLE_LIMIT_FOR_PAGE)); // Same as in your pagination component
const totalPages = ref(1);

//!# functions ... -->
// Function to fetch data from the service
const fetchMeasures = async (page: number = 1) => {
  try {
    const response = await getMeasures(page, itemsPerPage.value);
    measures.value = response.data; // Salva solo l'array di misure
    totalMeasureItems.value = response.total; // Salva il totale degli elementi
    currentMeasurePage.value = response.currentPage; // Salva la pagina corrente
    totalPages.value = response.totalPages; // Salva il totale delle pagine
  } catch (error) {
    console.error("Data fetch failed:", error);
  }
};
// Call `fetchMeasure` on component mount to load initial data
// Call `fetchMeasure` on component mount to load initial data
onMounted(() => {
  fetchMeasures();
});
const handlePageChange = (newPage: number) => {
  fetchMeasures(newPage);
};
</script>
