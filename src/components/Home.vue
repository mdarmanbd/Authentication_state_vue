<script setup>
import {ref, computed, watch} from 'vue'
import { store } from '../store/store';
import router from '../router/router';
import LoginForm from './LoginForm.vue';

const addCustomersParse = JSON.parse(localStorage.getItem('addCustomers'))
const isAuthenticationParse = JSON.parse(localStorage.getItem('isAuthentication'))
const isAuthentication = ref(isAuthenticationParse)
const customers = ref(addCustomersParse)
const searchCustomer = ref('');



// const filteredCustomers = computed(() => {
//   const searchValue = searchCustomer.value.toLowerCase();
//   return customers.value.filter(customer => 
//     customer.firstName.toLowerCase().includes(searchValue)
//   );
// });


const addCustomers = () => {
    router.push('/Customers')
}


</script>

<template>
    <div class="bg-gray-50 h-screen ">
        <!-- {{ searchCustomer }} -->
          <div v-if="!isAuthentication" class="pt-3 md:w-[400px] m-auto">
              <div class="mx-5 md:mx-0 md:w-[400px] block m-auto">
                <p class="text-base text-cyan-600 font-medium text-center">
                    please log-in with your email account
                </p>
              </div>
          </div>
        <div :class=" isAuthentication ? 'pt-10':'pt-14'" class="w-full px-2 md:px-0 md:w-[850px] m-auto ">
            <div class="flex justify-between items-center">
                <h3 class="text-base md:text-lg font-semibold text-gray-700">Customers</h3>
                    <button v-if="!isAuthentication" disabled class="cursor-not-allowed text-sm bg-gray-200 block items-center py-1.5 px-3 text-gray-800 font-medium rounded ">Add Customers</button>
                    <button v-if="isAuthentication" @click="addCustomers()" class="cursor-pointer text-sm bg-gray-200 block items-center py-1 md:py-1.5 px-2 md:px-3 text-gray-800 font-medium rounded ">Add Customers</button>
            </div>
            <!-- <input v-model="searchCustomer" type="text" class="w-full focus:outline-none mt-8 bg-gray-200 broder text-sm font-normal border-gray-100 px-2 py-2" placeholder="Enter Last Name"> -->
            
            <table class="table-auto w-full text-left mt-5">
                <thead>
                    <tr class="[&>*]:text-gray-700 [&>*]:text-sm md:[&>*]:text-base [&>*]:font-medium border-b border-gray-400">
                        <th class="pb-1">Image</th>
                        <th class="pb-1">First Name</th>
                        <th class="pb-1">Location</th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-if="store.demoCustomer">
                        <td class="pl-2 border-b border-gray-300 py-2 text-sm font-normal text-gray-800">
                            <img alt="img">
                        </td>
                        <td class="border-b border-gray-300 py-2 text-sm font-normal text-gray-800">Hello World</td>
                        <td class="border-b border-gray-300 py-2 text-sm font-normal text-gray-800">Hello World</td>
                        <td class="border-b border-gray-300 py-2 flex justify-center m-auto ">
                            <button class="text-sm bg-gray-200 block items-center py-0.5 px-2 text-gray-800 font-medium rounded cursor-pointer">
                                Demo
                            </button>
                        </td>
                    </tr>
                    <tr v-for="(customer,index) in customers" :key="customer.id" >
                        <td class="pl-2 border-b border-gray-300 py-2 text-sm font-normal text-gray-800">
                            <div class="w-10 h-10">
                                <img :src="customer.image" class="w-10 h-10 rounded-full" alt="img">
                            </div>
                        </td>
                        <td class="pl-2 border-b border-gray-300 py-2 text-sm font-normal text-gray-800">{{ customer.firstName }}</td>
                        <td class="border-b border-gray-300 py-2 text-sm font-normal text-gray-800">{{ customer.address }}</td>
                        <td class="border-b border-gray-300 py-5 md:pt-4 md:pb-[17px] flex justify-center ">
                            <router-link :to="`/Customers/${customer.id}`">
                                <button @click="store.coustomerView(index)" class="text-sm bg-gray-200 block items-center py-0.5 px-2 text-gray-800 font-medium rounded cursor-pointer">
                                    View
                                </button>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

   <LoginForm></LoginForm>
</template>


<style scoped>

    tr:nth-child(even){
        background-color: #f1f1f1;
    }
    tr:nth-child(od){
        background-color: #fff;
    }

</style>
