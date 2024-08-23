import { createWebHistory, createRouter } from 'vue-router'
import HomeView from "@views/HomeView.vue"
import DashboardView from '@/views/DashboardView.vue'
import SignIn from '@components/forms/SignIn.vue'
import { useAuthStore } from '@store/authStore';

const routes = [
  { path: '/', component: HomeView },
  { path: '/home', component: HomeView },

  {
    path: '/dashboard', component: DashboardView, beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();

      if (!authStore.isAuthenticated) {
        next('/signIn');
      } else {
        next();
      }
    },

  },
  { path: '/signIn', component: SignIn },

]

const router = createRouter({
  history: createWebHistory(),
  routes, scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router;