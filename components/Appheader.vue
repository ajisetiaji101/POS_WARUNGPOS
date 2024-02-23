<template>
    <header class="relative h-20 bg-gray-100 w-full">
        <nav class="text-xl font-bold w-full  py-2 text-center fixed top-0 left-0 right-0 z-10">
            <div class="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div class="flex items-center justify-between py-3 md:py-5 md:block">
                        <!-- LOGO -->
                        <NuxtLink class=" cursor-pointer flex font-poppins">
                            <Icon name="healthicons:market-stall-outline" class=" font-semibold text-red-500 text-3xl" />
                            <h1 class=" text-sm text-red-500 py-1"> WarungPOS</h1>
                        </NuxtLink>

                        <!-- Hamburger For Mobile -->
                        <div class="md:hidden">
                            <button @click="navbarclick"
                                class="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border">
                                <div v-if="navbarBaru">
                                    <Icon name="octicon:x-12" />
                                </div>
                                <div v-else>
                                    <Icon name="ci:hamburger-md" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    :class="navbarBaru ? 'flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 p-12 md:p-0 block' : 'flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 hidden'">
                    <ul class=" h-screen md:h-auto items-center justify-center font-poppins md:flex">
                        <li
                            class="text-sm text-red-500 py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-stone-500 md:hover:bg-transparent">
                            About
                        </li>
                        <li
                            class="text-sm text-red-500 py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-stone-500 md:hover:bg-transparent">
                            Contact
                        </li>
                        <li
                            class="text-sm text-red-500 py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-stone-500 md:hover:bg-transparent">
                            Projects
                        </li>
                    </ul>
                </div>
                <div class=" font-poppins">
                    <NuxtLink to="/auth/login-fo"
                        class=" px-4 py-3 text-red-500 text-sm bg-gray-300 rounded-l-full mr-1 shadow-sm hover:bg-gray-400">
                        Masuk
                    </NuxtLink>
                    <NuxtLink to="/auth/registrasi-user"
                        class=" px-4 py-3 text-red-500 text-sm bg-gray-300 rounded-r-full shadow-sm hover:bg-gray-400">
                        Daftar</NuxtLink>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
const navbarBaru = ref(false);

const navbarclick = () => {
    navbarBaru.value = !navbarBaru.value
}
</script>

