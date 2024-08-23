import { createApp } from 'vue'
import { createPinia } from 'pinia';
import '@/style.css'
import App from './App.vue'
import router from '@router/indexRouter';
import { useAuthStore } from '@store/authStore';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router)
const authStore = useAuthStore();

authStore.checkAuthStatus();
app.mount("#app");
