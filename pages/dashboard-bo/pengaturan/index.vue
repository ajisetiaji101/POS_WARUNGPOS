<template>
    <dashboardBo>
        <div class="flex flex-col w-full h-full pt-16 m-4 font-poppins">
            <form @submit.prevent="">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-bold mb-2">Nama Warung :</label>
                    <input type="text" id="name" name="name" class="border rounded w-full py-2 px-3 border-red-500">
                </div>
                <div class="mb-4">
                    <label for="username" class="block text-sm font-bold mb-2">Alamat :</label>
                    <input type="text" id="username" name="username"
                        class="border rounded w-full py-2 px-3 border-red-500">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-bold mb-2">Telepon :</label>
                    <input type="email" id="email" name="email" class="border rounded w-full py-2 px-3 border-red-500">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-bold mb-2">Email :</label>
                    <input type="passowrd" id="password" name="password"
                        class="border rounded w-full py-2 px-3 border-red-500">
                </div>
                <div class="mb-4">
                    <label for="alamat" class="block text-sm font-bold mb-2">Verifikasi :</label>
                    <input type="passowrd" id="alamat" name="alamat"
                        class="border rounded w-full py-2 px-3 border-red-500">
                </div>
                <div class="mb-4">
                    <label for="alamat" class="block text-sm font-bold mb-2">lat :</label>
                    <input type="passowrd" id="alamat" name="alamat"
                        class="border rounded w-full py-2 px-3 border-red-500">
                </div>
                <div class="mb-4">
                    <label for="alamat" class="block text-sm font-bold mb-2">lng :</label>
                    <input type="passowrd" id="alamat" name="alamat"
                        class="border rounded w-full py-2 px-3 border-red-500">
                </div>
                <div class="flex">
                    <button type="submit" class="bg-red-500 text-white py-2 px-4 rounded">Submit</button>
                    <button @click="goBack" class="bg-green-500 text-white py-2 px-4 ml-2 rounded mx-2">
                        Kembali</button>
                </div>
            </form>
        </div>
    </dashboardBo>
</template>

<script setup lang="ts">
import dashboardBo from '../dashboard-bo.vue';

const goBack = () => {
    window.history.back();
};

</script>