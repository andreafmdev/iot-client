<template>
  <div
    class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
  >
    <div class="px-4 py-5 sm:p-6">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">
              Users
            </h1>
            <p class="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
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
        <div class="-mx-4 mt-8 sm:-mx-0">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <slot name="header"></slot>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <!-- Slot per inserire dinamicamente le righe della tabella -->
              <slot name="rows"></slot>
            </tbody>
          </table>
        </div>
        <slot name="paginations"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Nessun dato specifico da gestire qui
</script>

<style scoped></style>
