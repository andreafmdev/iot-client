<template>
  <Disclosure as="header" class="bg-gray-900" v-slot="{ open }">
    <div
      class="mx-auto max-w-10xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8"
    >
      <div class="relative flex h-16 justify-between">
        <!--#  Logo Section -->
        <button @click="toggleSidebar">
        <div class="relative z-10 flex px-2 lg:px-0">
          <div class="flex flex-shrink-0 items-center">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
        </div>
      </button>
        <!--# Search Bar Section -->

        <div
          v-if="isAuth"
          class="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0"
        >
          <div class="w-full sm:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <MagnifyingGlassIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                class="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
        <!--# Notification and Auth Section (for large screens) -->

        <div class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
          <button
            type="button"
            class="relative flex-shrink-0 rounded-full bg-gray-00 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon v-if="isAuth" class="h-6 w-6" aria-hidden="true" />
          </button>

          <!--# Conditional Rendering for Auth -->
          <div class="ml-4">
            <template v-if="isAuth">
              <!--# Profile dropdown -->
              <Menu as="div" class="relative flex-shrink-0">
                <div>
                  <MenuButton
                    class="flex-shrink-0 p-2 relative flex rounded-full bg-gray-900 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <div class="flex items-center">
                      <div>
                        <img
                          class="inline-block h-9 w-9 rounded-full"
                          :src="user!.imageUrl!"
                          alt=""
                        />
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-gray-500">
                          {{ user.name }}
                        </p>
                        <p class="text-xs font-medium text-gray-500">
                          View profile
                        </p>
                      </div>
                    </div>
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <a
                        v-if="item.name !== 'Sign out'"
                        :href="item.href"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >{{ item.name }}</a
                      >
                      <button
                        v-else
                        @click="signOut"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block w-full text-left px-4 py-2 text-sm text-gray-700',
                        ]"
                      >
                        {{ item.name }}
                      </button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </template>
            <template v-else>
              <!--# Log In Button -->
              <RouterLink
                :to="'/signIn'"
                class="text-sm font-medium text-white hover:underline"
              >
                Log in
              </RouterLink>
            </template>
          </div>
        </div>
      </div>
      <nav
        v-if="isAuth"
        class="hidden lg:flex lg:space-x-8 lg:py-2"
        aria-label="Global"
      >
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</a
        >
      </nav>
    </div>
    <!--# Mobile Menu -->

    <DisclosurePanel as="nav" class="lg:hidden" aria-label="Global">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
      <div class="border-t border-gray-700 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="user!.imageUrl!" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">{{ user.name }}</div>
            <div class="text-sm font-medium text-gray-400">
              {{ user.email }}
            </div>
          </div>

          <button
            type="button"
            class="relative ml-auto flex-shrink-0 rounded-full bg-gray-900 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon v-if="isAuth" class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            :href="item.href"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >{{ item.name }}</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
    <!-- Button to toggle the isAuth state for testing -->
  </Disclosure>
</template>

<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { BellIcon } from "@heroicons/vue/24/outline";
import { onMounted, computed } from "vue";
import { useAuthStore } from "@store/authStore";
import { useSidebarStore } from "@store/sidebarStore";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
  { name: "Sign out", href: "/home" },
];
const authStore = useAuthStore();
const sidebarStore = useSidebarStore(); // Access Sidebar Store

const isAuth = computed(() => authStore.isAuthenticated);

const user = computed(() => ({
  name: authStore.userEmail || "Anonymous",
  email: authStore.userEmail || "",
  imageUrl: authStore.avatarUrl, // Puoi aggiungere un URL di immagine di default o ricavarlo dal JWT
}));

function signOut() {
  authStore.logout(); // Usa l'azione `logout` dello store
}
function toggleSidebar() {
  sidebarStore.toggleSidebar();
}
function generateAvatarImg(name){
  
}
onMounted(() => {
  authStore.checkAuthStatus();
});
</script>
