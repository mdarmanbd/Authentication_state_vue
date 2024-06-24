<script setup>
import { reactive, ref } from 'vue';
import { store } from '../store/store';
import router from '../router/router';


const isAuthenticationParse = JSON.parse(localStorage.getItem('isAuthentication'))
const isAuthentication = ref(isAuthenticationParse)


const logOut = () => {
    const addCustomers = []
    const lastUsedId = 0
    isAuthentication.value = false
    localStorage.setItem('isAuthentication', JSON.stringify(isAuthentication.value))
    localStorage.setItem('lastUsedId', JSON.stringify(lastUsedId));
    localStorage.setItem('addCustomers', JSON.stringify(addCustomers))
    window.location.reload();
}

</script>

<template>
    <div :class="store.isModalOpen ? 'bg-gray-100 bg-opacity-50 transition':'bg-gray-100'" class="hidden md:block  sticky top-0 z-50">
        <div class="flex items-center w-[850px] m-auto py-2">
            <ul class="[&>li]:text-gray-800 flex space-x-5 [&>*]:text-base [&>*]:font-rubik [&>*]:font-medium">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/About">About</router-link>
                </li>
            </ul>
            <div v-if="!isAuthentication" @click="store.login()" class="cursor-pointer ml-auto block text-base text-gray-700 hover:text-black font-rubik font-medium">
                Log in
            </div>
            <div v-if="isAuthentication" @click="logOut()" class="ml-auto block">
                <router-link to="/" class="cursor-pointer text-gray-700 hover:text-black text-base font-rubik font-medium">
                    Log out
                </router-link>
            </div>
        </div>
    </div>
    <!---responsive navbar start-->
    <div :class="store.isModalOpen ? 'bg-gray-100 bg-opacity-50 transition':'bg-gray-100'" class="block md:hidden sticky top-0 z-50 ">
        <div class="flex items-center m-auto py-2 ">
            <ul class="[&>li]:text-gray-800 flex space-x-5 [&>*]:text-base [&>*]:font-rubik [&>*]:font-medium">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/About">About</router-link>
                </li>
            </ul>
            <div v-if="!isAuthentication" @click="store.login()" class="cursor-pointer ml-auto block text-base text-gray-700 hover:text-black font-rubik font-medium pr-2">
                Log in
            </div>
            <div v-if="isAuthentication" @click="logOut()" class="ml-auto block pr-2">
                <router-link to="/" class="cursor-pointer text-gray-700 hover:text-black text-base font-rubik font-medium ">
                    Log out
                </router-link>
            </div>
        </div>
    </div>
    
</template>


<style scoped>

</style>
