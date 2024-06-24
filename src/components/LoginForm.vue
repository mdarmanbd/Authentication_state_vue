
  
<script setup>
import {ref, reactive} from 'vue'
import {store} from '../store/store'
import { onClickOutside } from '@vueuse/core';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const modal = ref(null);
 onClickOutside(modal, ()=>(store.isModalOpen = false))

 const toasterNotification = (massage,type) => {
  toast(massage, {
          type: type,
          autoClose: 1000,
          transition: toast.TRANSITIONS.BOUNCE,
          position: toast.POSITION.TOP_RIGHT,
          toastStyle: {
              fontSize: '14px',
              color: 'green',
          },
      })
}

const logInForm = reactive ({
  email:'',
  password: null,
  confirmPassword: null,
  isPasswordError: false,
  isAuthentication : null
})

 const submitButton = () =>{
    
  if(logInForm.password === logInForm.confirmPassword && logInForm.password.length === 5 && logInForm.confirmPassword.length === 5){
    logInForm.isPasswordError = false
    logInForm.isAuthentication = true
    localStorage.setItem('isAuthentication', JSON.stringify(logInForm.isAuthentication))
    toasterNotification('Log in success' , 'success')
    store.isModalOpen = false
    logInForm.email = '',
    logInForm.password = null,
    logInForm.confirmPassword = null,
    logInForm.isPasswordError = false,
    logInForm.isAuthentication = null
    window.location.reload();
  }else{
    logInForm.isPasswordError = true
    logInForm.isAuthentication = false
    localStorage.setItem('isAuthentication', JSON.stringify(logInForm.isAuthentication))
  }

   
 }

</script>

<template>
  <div class="">
   
    <Teleport to="body">
      <Transition name="modal">
        <div @click="outsideClick()" v-if="store.isModalOpen" class="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 flex justify-center items-center">
          <div class=" w-[400px] h-[500px] top-[10%] z-[999] fixed m-auto bg-white shadow rounded" ref="modal">
            <button @click="store.isModalOpen = false" class="float-right mt-2 text-black font-normal text-lg me-4 ">
                <img class=" rounded-full w-7 text-center grid items-center bg-gray-200 p-0.5" src="../svg/cross.svg">
            </button>
            <div class="absolute w-full block top-12 px-8">
                <h3 class="text-gray-800 text-base font-semibold text-center mb-1">Log in</h3>
                <p class="text-gray-600 text-sm font-medium text-center mb-5">Enter your account details below</p>
               
                <form @submit.prevent="submitButton()" >
                    <label class="block text-gray-800 text-sm font-medium pb-2">Email:</label>
                    <input v-model="logInForm.email" type="email" required class="bg-gray-100 w-full focus:outline-none py-1 pl-2 text-gray-800 text-base font-normal">
                    
                    <label class=" text-gray-800 text-sm font-medium mt-4 pb-2 block">Password:</label>
                    <input v-model="logInForm.password" type="password" class="bg-gray-100 w-full focus:outline-none py-1 pl-2 text-gray-800 text-base font-normal ">

                    <label class=" text-gray-800 text-sm font-medium mt-4 pb-2 block">Confirm password:</label>
                    <input v-model="logInForm.confirmPassword" type="password" :class=" logInForm.isPasswordError ? 'border border-red-500' : ''" class="bg-gray-100 w-full focus:outline-none py-1 pl-2 text-gray-800 text-base font-normal ">
                    <small v-if="logInForm.isPasswordError" class="text-xs text-red-500 text-center block">password should be same & also be 5 digit </small>
                  
                    <button type="submit" class="w-full bg-gray-200 text-center py-2 text-gray-800 text-sm font-bold mt-6 ">
                        Log in
                    </button>
                    <p class="mt-4 text-sm font-normal text-blue-500 text-center"> <span class="text-gray-700">Don't have an account ?</span> <br> Sign up forgot your password?</p>
                </form>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>

.modal-enter-active,
.modal-leave-active {
  transition: all 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
  /* transform:scale(0.9) */

}


.modal {
  position: fixed;
  z-index: 999;
  top: 10%;
  width: 400px;
  height: 500px;
  /* transform: translateY(-15%); */
  /* background: rgb(208, 247, 208); */
}
</style>