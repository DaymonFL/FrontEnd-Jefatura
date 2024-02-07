/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Pinia 
import { createPinia } from 'pinia'

// Components
import App from './App.vue'

//Axios
import axios from '@/plugins/axios'

//router
import router from './router/index'


// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)
app.use(axios, {
    //Local
    //baseUrl: 'http://localhost:3030/api'
    //Desarrollo
    //baseUrl: 'http://145.0.40.23:3030/api'
    //Producción
    baseUrl: 'http://192.168.100.61:3001/api'
  })
app.use(router)
app.mount('#app')
