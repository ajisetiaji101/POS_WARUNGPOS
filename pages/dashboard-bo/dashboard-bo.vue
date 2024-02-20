<template>
    <section>
        <!-- HEADER -->
        <div class="py-4 px-8 shadow-md flex justify-between w-full">
            <h1 class="text-xl font-semibold text-red-400 flex-initial w-80">
                <Icon name="healthicons:market-stall-outline" class="font-semibold text-red-400 text-3xl font-poppins" />
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
            <div class="shadow w-1/6 h-screen">
                <ul class="w-full">
                    <li class="py-2 px-4 border-l-4 border-red-300 font-poppins"
                        :class="{ 'bg-gray-100': $route.path === '/dashboard-bo' }">
                        <NuxtLink to="/dashboard-bo">
                            Dashboard EIS
                        </NuxtLink>
                    </li>
                    <li class="py-2 px-4 border-l-4 border-red-300 font-poppins"
                        :class="{ 'bg-gray-100': $route.path === '/dashboard-bo/produk' }">
                        <NuxtLink to="/dashboard-bo/produk">
                            Manage Produk
                        </NuxtLink>
                    </li>
                </ul>
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
// Your script logic goes here
</script>
  