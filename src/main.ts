import './assets/main.css'

import { createApp } from 'vue'
import { vEditText } from '@/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.directive('edit-text', vEditText)

app.mount('#app')
