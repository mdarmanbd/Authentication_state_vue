
import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue';
import Home from '../components/Home.vue';
import Customers from '../components/Customers.vue';
import About from '../components/About.vue';
import ViewCustomer from '../components/ViewCustomer.vue';

const routes = [
    {
        path:'/',
        component:Home
    },
    {
        path:'/Customers',
        component:Customers,
        meta: {
            requiresAuthentication: true
        }
    },
    {
        path:'/Customers/:id',
        component: ViewCustomer,
        meta: {
            requiresAuthentication: true
        }
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

router.beforeEach((to, from, next)=>{
    if(to.meta.requiresAuthentication){
        const isAuthenticationParse = JSON.parse(localStorage.getItem('isAuthentication'))
        const isAuthentication = ref(isAuthenticationParse)
        if(isAuthentication.value){
            next()
        }else{
            next('/')
        }
    }else{
        next()
    }
})



export default router