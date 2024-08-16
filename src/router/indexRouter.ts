import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from "@views/HomeView.vue"
import DashboardView from '@/views/DashboardView.vue'


const routes = [
  { path: '/', component: HomeView },
  { path: '/dashboard', component: DashboardView },

]

const router = createRouter({
  history: createWebHashHistory (),
  routes,scrollBehavior (to, from, savedPosition) {
      return{top:0}
    }
})

export default router;