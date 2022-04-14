import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import axios from "axios";
const app = createApp(App)
axios.defaults.baseURL ="http://192.168.3.3:8888"
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")
installElementPlus(app)
app.config.globalProperties.axios = axios
app
    .use(store)
    .use(router)
    .mount('#app')