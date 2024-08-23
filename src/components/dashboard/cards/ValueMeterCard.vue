<template>
    <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
      <dt>
        <div class="absolute rounded-md bg-indigo-500 p-3">
          <component
            :is="icon"
            class="h-6 w-6 text-white"
            aria-hidden="true"
          />
        </div>
        <p class="ml-16 truncate text-sm font-medium text-gray-500">
          {{ name }}
        </p>
      </dt>
      <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p class="text-2xl font-semibold text-gray-900">{{ stat }}</p>
        <p
          :class="[
            changeType === 'increase' ? 'text-green-600' : 'text-red-600',
            'ml-2 flex items-baseline text-sm font-semibold',
          ]"
        >
          <ArrowUpIcon
            v-if="changeType === 'increase'"
            class="h-5 w-5 flex-shrink-0 self-center text-green-500"
            aria-hidden="true"
          />
          <ArrowDownIcon
            v-else
            class="h-5 w-5 flex-shrink-0 self-center text-red-500"
            aria-hidden="true"
          />
          <span class="sr-only">
            {{ changeType === "increase" ? "Increased" : "Decreased" }} by
          </span>
          {{ change }}
        </p>
        <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              View all<span class="sr-only"> {{ name }} stats</span>
            </a>
          </div>
        </div>
      </dd>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/20/solid";
  
  // Define the props that the component will accept
  const props = defineProps({
    icon: Object,
    name: String,
    stat: String,
    change: String,
    changeType: String,
  });
  </script>
  