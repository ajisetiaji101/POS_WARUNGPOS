<template>
    <DashboardBo>
        <div class="w-full font-poppins flex justify-center">
            <div class="w-1/2">
                <div class="font-poppins my-2 px-2 text-center font-semibold text-xl">
                    <h1>Tambah User</h1>
                </div>
                <LoginError :error="productEror" />
                <LoginBerhasil :data="productBerhasil" />

                <form @submit.prevent="submitForm" class="mb-8">
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-bold mb-2">Nama Lengkap :</label>
                        <input v-model="formData.name" type="text" id="name" name="name"
                            class="border rounded w-full py-2 px-3 border-red-500">
                    </div>
                    <div class="mb-4">
                        <label for="username" class="block text-sm font-bold mb-2">Username :</label>
                        <input v-model="formData.username" type="text" id="username" name="username"
                            class="border rounded w-full py-2 px-3 border-red-500">
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-bold mb-2">Email :</label>
                        <input v-model="formData.email" type="email" id="email" name="email"
                            class="border rounded w-full py-2 px-3 border-red-500">
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-bold mb-2">Password :</label>
                        <input v-model="formData.password" type="passowrd" id="password" name="password"
                            class="border rounded w-full py-2 px-3 border-red-500">
                    </div>
                    <div class="mb-4">
                        <label for="alamat" class="block text-sm font-bold mb-2">Alamat :</label>
                        <input v-model="formData.alamat" type="passowrd" id="alamat" name="alamat"
                            class="border rounded w-full py-2 px-3 border-red-500">
                    </div>
                    <div class="mb-4">
                        <label for="nik" class="block text-sm font-bold mb-2">NIK :</label>
                        <input v-model="formData.nik" type="text" id="nik" name="nik"
                            class="border rounded w-full py-2 px-3 border-red-500">
                    </div>
                    <div class="mb-4">
                        <label for="level" class="block text-sm font-bold mb-2">Role :</label>
                        <select id="level" name="level" class="border rounded w-full py-2 px-3 border-red-500"
                            v-model="formData.level">
                            <option value="" disabled selected>Pilih Role</option>
                            <option v-for="category in Role" :value="category.id">{{ category.category_name }}
                            </option>
                        </select>
                    </div>
                    <div class="flex">
                        <button type="submit" class="bg-red-500 text-white py-2 px-4 rounded">Submit</button>
                        <button @click="goBack" class="bg-green-500 text-white py-2 px-4 rounded mx-2">
                            Kembali</button>
                    </div>
                </form>
            </div>
        </div>
    </DashboardBo>
</template>

<script setup lang="ts">
import axios from "axios";
import DashboardBo from "~/pages/dashboard-bo/dashboard-bo.vue";

const productEror = ref<string | null>(null);
const productBerhasil = ref<string | null>(null);
const Role = [
    { id: 1, category_name: "Admin" },
    { id: 2, category_name: "Kasir" },
    { id: 3, category_name: "Owner" }
]

const formData = ref({
    name: '',
    username: '',
    email: '',
    password: '',
    alamat: '',
    nik: '',
    level: null
});




const submitForm = async (e: any) => {

    // Ambil token dari tempat penyimpanan (misalnya localStorage)
    const token = useCookie('auth:token');


    // Pastikan token tersedia sebelum membuat permintaan
    if (!token) {
        return;
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token.value}`,
        }
    };

    try {
        e.preventDefault()
        let res = await axios.post("http://43.243.187.6:6060/api/v1/user/createNewUserByOwner", formData.value, config);
        productBerhasil.value = res.data.data;
    } catch (error: any) {

        if (error.response != null) {
            productEror.value = error.response._data.data;
        } else {
            productEror.value = "Periksa koneksi anda"
        }

    }
    // Reset formulir setelah pengiriman jika diperlukan
    formData.value = {
        name: '',
        username: '',
        email: '',
        password: '',
        alamat: '',
        nik: '',
        level: null
    };
};


const goBack = () => {
    window.history.back();
};



</script>