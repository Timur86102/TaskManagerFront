import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router.js'
import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/aura'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Toast from "primevue/toast"
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)
app.use(createPinia())
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
})
app.use(DialogService)
app.use(ToastService)
app.component("Textarea", Textarea)
app.component("Select", Select)
app.component("Toast", Toast)
app.mount('#app')
