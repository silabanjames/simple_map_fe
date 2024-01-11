import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/css/index.css'


import App from './App.vue'
import router from './router'

// import L from "leaflet"
// import 'leaflet/dist/leaflet.css';

const app = createApp(App)


app.use(createPinia())
app.use(router)
// app.use(Leaflet)

app.mount('#app')
