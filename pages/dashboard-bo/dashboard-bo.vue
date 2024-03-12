<template>
    <section>
        <!-- HEADER -->
        <div class="py-4 px-8 shadow-md flex justify-between w-full absolute bg-white top-0 left-0 right-0 z-10">
            <h1 class="text-xl font-semibold text-red-400 flex-initial w-80">
                <Icon name="healthicons:market-stall-outline"
                    class="font-semibold text-red-400 text-3xl font-poppins" />
                WarungPOS
            </h1>

            <div>
                <Icon name="iconamoon:profile-circle" class="font-semibold text-red-400 text-3xl font-poppins" />
            </div>
        </div>
        <!-- END HEADER -->

        <!-- SIDEBAR AND CONTENT -->
        <div class="flex text-red-500">
            <!-- SIDEBAR -->
            <div class="shadow w-1/6 h-screen flex flex-col justify-between">
                <div>
                    <ul class="w-full pt-16">
                        <li class="py-2 px-4 border-l-4 border-red-300 font-poppins"
                            :class="{ 'bg-gray-200 border-r-red-300 border-r-2': ($route as any).path === '/dashboard-bo/info-hits' }">
                            <NuxtLink to="/dashboard-bo">
                                Info Hits
                                <Icon name="ci:warning" class="text-red-500 text-3xl" />
                            </NuxtLink>
                        </li>
                        <li class="py-2 px-4 border-l-4 border-red-300 font-poppins"
                            :class="{ 'bg-gray-200 border-r-red-300 border-r-2': ($route as any).path === '/dashboard-bo' }">
                            <NuxtLink to="/dashboard-bo">
                                Dashboard EIS
                            </NuxtLink>
                        </li>
                        <li class="py-2 px-4 border-l-4 border-red-300 font-poppins"
                            :class="{ 'bg-gray-200 border-r-red-300 border-r-2': ($route as any).path === '/dashboard-bo/produk' }">
                            <NuxtLink to="/dashboard-bo/produk">
                                Manage Produk
                            </NuxtLink>
                        </li>
                        <li class="py-2 px-4 border-l-4 border-red-300 font-poppins"
                            :class="{ 'bg-gray-200 border-r-red-300 border-r-2': ($route as any).path === '/dashboard-bo/user' }">
                            <NuxtLink to="/dashboard-bo/user">
                                Manage User
                            </NuxtLink>
                        </li>
                        <li class="py-2 px-4 border-l-4 border-red-300 font-poppins"
                            :class="{ 'bg-gray-200 border-r-red-300 border-r-2': ($route as any).path === '/dashboard-bo/warung' }">
                            <NuxtLink to="/dashboard-bo/warung">
                                Manage Warung
                            </NuxtLink>
                        </li>
                        <li class="py-2 px-4 border-l-4 border-red-300 font-poppins"
                            :class="{ 'bg-gray-200 border-r-red-300 border-r-2': ($route as any).path === '/dashboard-bo/pengaturan' }">
                            <NuxtLink to="/dashboard-bo/pengaturan">
                                Pengaturan
                            </NuxtLink>
                        </li>
                        <li class="py-2 px-4 border-l-4 border-red-300 font-poppins"
                            :class="{ 'bg-gray-200 border-r-red-300 border-r-2': ($route as any).path === '/dashboard-bo/aktivitaspos' }">
                            <NuxtLink to="/dashboard-bo/aktivitaspos">
                                Aktivitas POS
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <button @click="handleSingOut"
                        class="py-2 px-4 bg-red-500 text-white w-full font-poppins hover:bg-red-700">Logout</button>
                </div>
            </div>
            <!-- END SIDEBAR -->

            <!-- MAIN CONTENT SLOT -->
            <slot />
            <!-- END MAIN CONTENT SLOT -->
        </div>
        <!-- END SIDEBAR AND CONTENT -->
    </section>
</template>

<script setup lang="ts">
const { status, signIn, signOut } = useAuth();

async function handleSingOut() {

    try {
        await signOut();
    } catch (error) {
        console.error('Error logout', error)
    }

    navigateTo('/auth/login-fo');
}
// Your script logic goes here
</script>