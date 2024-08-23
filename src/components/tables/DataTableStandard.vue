<template>
  <DataTable>
    <template #header>
      <DataTableHead
        classes="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
      >
        Name
      </DataTableHead>
      <DataTableHead
        classes="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
      >
        Title
      </DataTableHead>
      <DataTableHead
        classes="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
      >
        Email
      </DataTableHead>
      <DataTableHead
        classes="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
      >
        Role
      </DataTableHead>
    </template>
    <template #rows>
      <DataTableRow
        v-for="measure in measures"
        :key="measure._id"
        :name="measure.value"
        :title="measure.desc"
        :email="measure.type"
      />
    </template>
    <template #paginations> </template>
  </DataTable>
</template>

<script setup lang="ts">
import DataTableRow from "@components/tables/DataTableRow.vue";
import DataTableHead from "@components/tables/DataTableHead.vue";
import DataTablePagination from "@components/tables/DataTablePagination.vue";
</script>
