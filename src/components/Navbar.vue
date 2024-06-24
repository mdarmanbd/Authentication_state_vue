<script setup>







</script>

<template>
    <div class="hidden md:block sticky top-0 z-50 bg-green-400">
        <div class="flex items-center w-[850px] m-auto py-2">
            <ul class="[&>li]:text-gray-800 flex space-x-5 [&>*]:text-base [&>*]:font-rubik [&>*]:font-medium">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/About">About</router-link>
                </li>
            </ul>
            <div class="cursor-pointer ml-auto block text-base text-gray-700 hover:text-black font-rubik font-medium">
                Log in
            </div>
            
        </div>
    </div>
  
   

    
</template>


<style scoped>

</style>
