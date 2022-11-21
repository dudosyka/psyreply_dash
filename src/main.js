import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import VueApexCharts from "vue3-apexcharts";
import 'animate.css'
import {createRouter, createWebHistory} from "vue-router";
import ClientComp from './components/Client'
import AdminComp from './components/Admin'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "client",
            path: "/",
            component: ClientComp
        },
        {
            name: "Admin",
            path: "/qwerty123",
            component: AdminComp
        }
    ]
})

createApp(App).use(router).use(VueApexCharts).mount('#app')

document.addEventListener('keydown', evt => {
    if ((evt.key === '-' || evt.key === '=') && evt.ctrlKey) {
        evt.preventDefault();
    }
});
