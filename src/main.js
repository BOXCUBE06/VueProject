import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

// Create the Vue app first
const app = createApp(App)

// Use plugin defaults (optional)
app.use(setupCalendar, {})

// Register global components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

// Use router
app.use(router)

// Mount the app
app.mount('#app')
