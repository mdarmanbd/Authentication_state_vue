
<script setup>
import { ref } from 'vue';
import{useRoute} from 'vue-router'
import router from '../router/router';
import { store } from '../store/store';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const route = useRoute()
const routeId = route.params.id
const findCustomerIndex = store.findCustomerIndex
const addCustomersParse = JSON.parse(localStorage.getItem('addCustomers'))
const customer = ref( addCustomersParse[findCustomerIndex] || {}) 
const isEditPageShow = ref(false)
const uploadImage = ref(null)


const editCustomer = () => {
    isEditPageShow.value = true
}

const deleteCustomer = () => {
    addCustomersParse.splice(findCustomerIndex , 1)
    localStorage.setItem('addCustomers', JSON.stringify(addCustomersParse))
     router.push('/')
}

const backToCustomer = () =>{
    isEditPageShow.value = false
}

const onFileChange = (event) => {
   const file = event.target.files[0]

   if(file.type.startsWith('image/')){
    const reader = new FileReader()
    reader.onload = (event) => {
        uploadImage.value =  event.target.result
    }
    reader.readAsDataURL(file);
   }else{
    uploadImage.value = null
   }
    
}

const submitButton = () => {
    store.demoCustomer = false
    if(uploadImage.value){
        addCustomersParse[findCustomerIndex].image = uploadImage
    }
        addCustomersParse[findCustomerIndex] = customer.value;
        localStorage.setItem('addCustomers', JSON.stringify(addCustomersParse));
        router.push('/')
    
   
}
</script>

<template>
    <div class="bg-gray-50 pt-5 pb-10">
        <div class="md:w-[850px] m-auto">
            <router-link v-if="!isEditPageShow" to="/" class="block pb-3 pl-2 md:pl-0">
              <button class="bg-gray-200 py-1 px-3 text-gray-800 text-sm font-medium">
                Back 
              </button>  
            </router-link>
            <div v-if="isEditPageShow" class="pb-3 pl-2 md:pl-0">
                <button @click="backToCustomer()" class="bg-gray-200 py-1 px-3 text-gray-800 text-sm font-medium">
                    Back 
                </button> 
            </div>
            <div class="px-2 md:px-0 flex items-center justify-between pt-6">
                <h3 class="text-sm md:text-base font-semibold text-gray-600">{{ customer.firstName }} </h3>
                <div class="flex gap-3">
                    <button @click="editCustomer()" class="bg-cyan-700 py-1 px-1.5 md:px-2 text-white text-xs md:text-sm font-medium">Edit</button>
                    <button @click="deleteCustomer()" class="bg-red-700 py-1 px-1.5 md:px-2 text-white text-xs md:text-sm font-medium">Delete</button>
                </div>
            </div>
            <div v-if="!isEditPageShow" class="grid md:grid-cols-2 mt-10 pl-2 md:pl-0 h-screen">
                <div class="order-2 md:order-1">
                    <h4 class="text-gray-600 font-normal text-sm md:text-base pb-2">
                        Customer ID : <span class="font-medium text-green-500">{{ customer.id }}</span> 
                    </h4>
                    <h4 class="text-gray-600 font-normal text-sm md:text-base pb-2">
                        Amout : <span class="font-medium">{{ customer.amount }}</span> 
                    </h4>
                    <h4 class="text-gray-600 font-normal text-sm md:text-base pb-2">
                        Email : <span class="font-medium">{{ customer.email }}</span> 
                    </h4>
                    <h4 class="text-gray-600 font-normal text-sm md:text-base pb-2">
                        Phone : <span class="font-medium">{{ customer.phone }}</span> 
                    </h4>
                    <h4 class="text-gray-600 font-normal text-sm md:text-base pb-2"> 
                        Address : <span class="font-medium">{{ customer.address }}</span> 
                    </h4>
                </div>
                <div class="order-1 md:order-2 mb-5 md:mb-0 md:relative">
                    <img :src="customer.image" class="m-auto w-[200px] h-[200px] md:absolute md:top-0 md:left-0 md:-translate-y-1/4 md:translate-x-1/2 " alt="Image Preview" />
                </div>
            </div>
            <form v-if="isEditPageShow" @submit.prevent="submitButton()" class="mt-5 px-2 md:px-0">
                <div class="grid md:grid-cols-4">
                    <div class="order-2 md:order-1 md:col-span-3">
                        <div class="md:flex items-center">
                            <label class="text-sm text-gray-800 font-medium block w-[100px]"> First Name<span>*</span> : </label>
                            <input v-model="customer.firstName" type="text" required class="focus:outline focus:outline-gray-400 text-sm font-normal w-full py-2 md:py-1 pl-2 bg-gray-200" placeholder="first name">
                        </div>
                        <div class="md:flex items-center mt-3">
                            <label class="text-sm text-gray-800 font-medium w-[100px] block ">Last Name: </label>
                            <input v-model="customer.lastName" type="text" class="focus:outline focus:outline-gray-400 text-sm font-normal w-full py-2 md:py-1 pl-2 bg-gray-200" placeholder="last name">
                        </div>
                        <div class="md:flex items-center mt-3">
                            <label class="text-sm text-gray-800 font-medium w-[100px] block ">Amount<span>*</span> : </label>
                            <input v-model="customer.amount" required type="number" class="focus:outline focus:outline-gray-400 text-sm font-normal w-full py-1 pl-2 bg-gray-200" placeholder="amout">
                        </div>
                    </div>
                    <div class="order-1 md:order-2 block overflow-hidden mb-5 md:mb-0">
                        <div class=" mx-5 grid items-center h-[180px] md:h-[110px]">
                            <div v-if="!uploadImage">
                                <img :src="customer.image" class="m-auto border border-gray-500 w-[180px] md:w-[110px] h-[180px] md:h-[110px]" alt="Image Preview" />
                            </div>
                            <div v-if="uploadImage">
                                <img :src="uploadImage" class="m-auto border border-gray-500 w-[180px] md:w-[110px] h-[180px] md:h-[110px]" alt="Image Preview" />
                            </div>
                        </div>
                        <input type="file" @change="onFileChange" class="text-xs block w-[180px] m-auto md:w-[110px] mt-1 " accept="image/*" />
                    </div>
                </div>

                <p class="text-sm text-gray-900 font-bold my-4">Customers Contact</p>

                <div class="md:flex items-center">
                    <label class="text-sm text-gray-800 font-medium w-[100px] block ">Email<span>*</span> : </label>
                    <input v-model="customer.email" type="email" required class="focus:outline focus:outline-gray-400 text-sm font-normal w-full py-2 md:py-1 pl-2 bg-gray-200" placeholder="example@.com">
                </div>
                
                <div class="md:flex items-center mt-3">
                    <label class="text-sm text-gray-800 font-medium block w-[100px]">Phone: </label>
                    <input v-model="customer.phone" type="number" required class="focus:outline focus:outline-gray-400 text-sm font-normal w-full py-2 md:py-1 pl-2 bg-gray-200" placeholder="Phone">
                </div>
                <p class="text-sm text-gray-900 font-bold my-4">Customers Location</p>
                <div class="md:flex items-center">
                    <label class="text-sm text-gray-800 font-medium block w-[100px]">Address: </label>
                    <input v-model="customer.address" type="text" class="focus:outline focus:outline-gray-400 text-sm font-normal w-full py-2 md:py-1 pl-2 bg-gray-200" placeholder="Address">
                </div>
                <div class="md:flex items-center mt-3">
                    <label class="text-sm text-gray-800 font-medium block w-[100px]">City: </label>
                    <input v-model="customer.city" type="text" class="focus:outline focus:outline-gray-400 text-sm font-normal w-full py-2 md:py-1 pl-2 bg-gray-200" placeholder="City">
                </div>
                <button type="submit" class="mt-3 mb-10 md:mb-5 text-sm bg-cyan-600 block items-center py-1.5 px-3 text-white font-normal rounded cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    </div>
    
</template>

<style scoped>

</style>