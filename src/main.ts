import { createApp } from 'vue';
import './assets/global.css';
import store from './store/index.ts';
import App from './App.vue';

createApp(App).use(store).mount('#app');
