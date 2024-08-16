import { createApp } from 'vue'
import { store, key } from '@store/store'
import '@/style.css'
import App from './App.vue'
import router from '@router/indexRouter';

const app = createApp(App);
app.use(store, key)
app.use(router)

app.mount("#app");
