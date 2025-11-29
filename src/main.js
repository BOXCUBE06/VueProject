import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// 1. Import PrimeIcons
import 'primeicons/primeicons.css'

// 2. Import PrimeFlex (This replaces Tailwind for layout)
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(router)

// 3. Configure PrimeVue to use the Styled Aura Theme
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark', // Custom selector for dark mode
        }
    }
})

app.mount('#app')