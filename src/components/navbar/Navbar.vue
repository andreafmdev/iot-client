<template>
    <nav class="bg-gray-800 p-4 flex justify-end items-end space-x-4">
      <!-- Logo/Button -->
   
  
      <!-- Right section with notification and user icon -->
      <div class="flex items-center space-x-4">
        <!-- Notification Icon -->
        <button type="button" class="relative text-gray-400 hover:text-white focus:outline-none">
          <BellIcon class="h-6 w-6" aria-hidden="true" />
          <span class="sr-only">View notifications</span>
        </button>
  
        <!-- User Icon -->
        <Menu as="div" class="relative">
          <div>
            <MenuButton class="flex rounded-full bg-gray-800 text-sm focus:outline-none">
              <img class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User Icon" />
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
  import { BellIcon } from '@heroicons/vue/24/outline';
  
  </script>
  
  <style scoped>
  /* Aggiungi il tuo stile personalizzato qui se necessario */
  </style>
  