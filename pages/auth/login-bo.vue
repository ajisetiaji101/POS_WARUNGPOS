<template>
    <section class="bg-gray-100 h-screen">
        <div class="flex">
            <div class="text-red-500 w-1/4 h-screen shadow-md flex flex-col justify-center items-center font-poppins">
                <div class="md:block">
                    <Icon name="healthicons:market-stall-outline" class="font-semibold text-5xl my-8" />
                </div>
                <div class="text-center">
                    <h1>BACKOFFICE</h1>
                    <h1 class="font-semibold text-2xl tracking-wider">Selamat Datang !</h1>
                    <p class="text-sm">Silahkan login kembali</p>
                </div>
                <form class="space-y-6 my-8 w-full px-8" action="#" method="POST">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-red-500">Email address</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" required
                                class="block pl-3 w-full rounded-md border border-red-500 py-1.5 text-red-500 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 transition duration-300 ease-in-out sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium leading-6 text-red-500">Password</label>
                        <div class="mt-2">
                            <input id="password" name="password" type="password" autocomplete="password" required
                                class="pl-3 block w-full rounded-md border border-red-500 py-1.5 text-red-500 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 transition duration-300 ease-in-out sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="flex w-full text-center">
                        <NuxtLink to="/point-of-sale"
                            class="px-3 py-2 bg-red-700 font-medium rounded-md text-sm shadow-md mr-2 text-white w-1/2">
                            Login
                        </NuxtLink>
                        <NuxtLink to="/"
                            class="px-3 py-2 bg-red-700 font-medium rounded-md text-sm shadow-md text-white w-1/2">
                            Kembali
                        </NuxtLink>
                    </div>
                </form>
            </div>
            <div class=" bg-red-500 w-full">
                <NuxtImg src="/ads_warung.jpg" class="object-cover h-screen w-full" />
            </div>
        </div>
    </section>
</template>
  