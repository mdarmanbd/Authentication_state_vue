
import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue';
import Home from '../components/Home.vue';

import About from '../components/About.vue';


const routes = [
    {
        path:'/',
        component:Home
    },

    {
        path:'/About',
        component:About,
        meta: {
            requiresAuthentication: true
        }

    }
   
]

const router = createRouter({
    history: createWebHistory(),
    routes
})




export default router