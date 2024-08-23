<template>
  <tr>
    <td
      v-for="(key, index) in keys"
      :key="key"
      :class="[className, cellClasses[index] || '']"
    >
      {{ rowValue[key] }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { PropType } from "vue";

interface RowData {
  [key: string]: string | number | undefined;
}

const props = defineProps({
  rowValue: {
    type: Object as PropType<RowData>,
    required: true,
  },
  keys: {
    type: Array as PropType<string[]>,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  cellClasses: {
    type: Array as PropType<string[]>,
    default: () => [], // Default to an empty array
  },
});
</script>
