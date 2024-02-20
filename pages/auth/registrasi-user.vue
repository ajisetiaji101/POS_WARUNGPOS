<template>
    <div class=" bg-gray-100 h-screen w-full font-poppins font-semibold">
        <!-- LOGO -->
        <div class="text-center text-red-500">
            <Icon name="healthicons:market-stall-outline" class="font-semibold text-5xl mt-8 mb-2" />
            <p class=" font-semibold">Registrasi Akun</p>
            <!-- LOGO -->
        </div>
        <LoginError :error="registrasiError" />
        <LoginBerhasil :data="registrasiBerhasil" />
        <form @submit.prevent="registrasi" class="space-y-6 my-8 w-full px-8 " action="#" method="POST">
            <div class="grid grid-cols-2 gap-4">
                <div class="px-8 py-4">
                    <label for="email" class="block text-sm font-medium leading-6 text-red-500">Email address</label>
                    <div class="mt-2">
                        <input v-model="formData.email" id="email" name="email" type="email" autocomplete="email" required
                            class="block pl-3 w-full rounded-md border border-red-500 py-1.5 text-red-500 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 transition duration-300 ease-in-out sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="px-8 py-4">
                    <label for="username" class="block text-sm font-medium leading-6 text-red-500">Username</label>
                    <div class="mt-2">
                        <input v-model="formData.username" id="username" name="username" type="username"
                            autocomplete="username" required
                            class="block pl-3 w-full rounded-md border border-red-500 py-1.5 text-red-500 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 transition duration-300 ease-in-out sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="px-8 py-4">
                    <label for="nik" class="block text-sm font-medium leading-6 text-red-500">NIK</label>
                    <div class="mt-2">
                        <input v-model="formData.nik" id="nik" name="nik" type="nik" autocomplete="nik" required
                            class="block pl-3 w-full rounded-md border border-red-500 py-1.5 text-red-500 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 transition duration-300 ease-in-out sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="px-8 py-4">
                    <label for="name" class="block text-sm font-medium leading-6 text-red-500">Nama Lengkap</label>
                    <div class="mt-2">
                        <input v-model="formData.name" id="name" name="name" type="name" autocomplete="name" required
                            class="block pl-3 w-full rounded-md border border-red-500 py-1.5 text-red-500 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 transition duration-300 ease-in-out sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="px-8 py-4">
                    <label for="nama_warung" class="block text-sm font-medium leading-6 text-red-500">Nama Warung</label>
                    <div class="mt-2">
                        <input v-model="formData.nama_warung" id="nama_warung" name="nama_warung" type="nama_warung"
                            autocomplete="nama_warung" required
                            class="block pl-3 w-full rounded-md border border-red-500 py-1.5 text-red-500 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 transition duration-300 ease-in-out sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="px-8 py-4">
                    <label for="alamat" class="block text-sm font-medium leading-6 text-red-500">Alamat</label>
                    <div class="mt-2">
                        <input v-model="formData.alamat" id="alamat" name="alamat" type="alamat" autocomplete="alamat"
                            required
                            class="block pl-3 w-full rounded-md border border-red-500 py-1.5 text-red-500 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 transition duration-300 ease-in-out sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="px-8 py-4">
                    <label for="pasword" class="block text-sm font-medium leading-6 text-red-500">Password</label>
                    <div class="mt-2">
                        <input v-model="formData.password" id="pasword" name="pasword" type="password"
                            autocomplete="pasword" required
                            class="block pl-3 w-full rounded-md border border-red-500 py-1.5 text-red-500 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 transition duration-300 ease-in-out sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="px-8 py-4">
                    <label for="verifikasipassword" class="block text-sm font-medium leading-6 text-red-500">Verifikasi
                        Password</label>
                    <div class="mt-2">
                        <input id="verifikasipassword" name="verifikasipassword" type="password"
                            autocomplete="verifikasipassword" required
                            class="block pl-3 w-full rounded-md border border-red-500 py-1.5 text-red-500 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 transition duration-300 ease-in-out sm:text-sm sm:leading-6" />
                    </div>
                </div>
            </div>
            <div class=" text-white flex justify-center">
                <div class=" bg-red-500 rounded-sm px-3 py-2 text-center w-32 mx-2 shadow-md">
                    <button type="submit">Registrasi</button>
                </div>
                <div class=" bg-red-500 rounded-sm px-3 py-2 text-center w-32 mx-2 shadow-md">
                    <NuxtLink to="/">Kembali</NuxtLink>
                </div>
            </div>
        </form>
    </div>
</template>
<script lang="ts" setup>
import axios from 'axios';

definePageMeta({
    auth: false
})

const registrasiError = ref<string | null>(null);
const registrasiBerhasil = ref<string | null>(null);

type formData = {
    email: string,
    username: string,
    name: string,
    password: string,
    nama_warung: string,
    nik: string,
    alamat: string
}

const formData = reactive({
    email: '',
    password: '',
    username: '',
    name: '',
    nama_warung: '',
    nik: '',
    alamat: ''
})

const registrasi = async (e: any) => {
    try {
        e.preventDefault()
        let res = await axios.post("http://localhost:8080/api/v1/user/registrasi", formData);
        registrasiBerhasil.value = res.data.data;
    } catch (error: any) {

        if (error.response != null) {
            registrasiError.value = error.response._data.data;
        } else {
            registrasiError.value = "Periksa koneksi anda"
        }

    }
}
</script>