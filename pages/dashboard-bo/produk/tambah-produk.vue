<template>
    <DashboardBo>
        <div class="w-full font-poppins flex justify-center">
            <div class="w-1/2">
                <div class="font-poppins my-2 px-2 text-center font-semibold text-xl">
                    <h1>Tambah Produk</h1>
                </div>
                <LoginError :error="productEror" />
                <LoginBerhasil :data="productBerhasil" />

                <form @submit.prevent="submitForm" class="mb-8">
                    <div class="mb-4">
                        <label for="serial_number" class="block text-sm font-bold mb-2">Serial Number:</label>
                        <input v-model="formData.serial_number" type="text" id="serial_number" name="serial_number"
                            class="border rounded w-full py-2 px-3 border-red-500">
                    </div>

                    <div class="mb-4">
                        <label for="product_name" class="block text-sm font-bold mb-2">Product Name:</label>
                        <input v-model="formData.product_name" type="text" id="product_name" name="product_name"
                            class="border rounded w-full py-2 px-3 border-red-500">
                    </div>

                    <div class="mb-4">
                        <label for="product_price" class="block text-sm font-bold mb-2">Product Price:</label>
                        <input v-model="formData.product_price" type="number" id="product_price" name="product_price"
                            class="border rounded w-full py-2 px-3 border-red-500">
                    </div>
                    <div class="mb-4">
                        <label for="product_image" class="block text-sm font-bold mb-2">Product Image URL:</label>
                        <input v-model="formData.product_image" type="text" id="product_image" name="product_image"
                            class="border rounded w-full py-2 px-3 border-red-500">
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

const formData = ref({
    serial_number: '',
    product_name: '',
    product_price: '',
    product_image: '',
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
        let res = await axios.post("http://localhost:8080/api/v1/product/addProduct", formData.value, config);
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
        serial_number: '',
        product_name: '',
        product_price: '',
        product_image: '',
    };
};

const goBack = () => {
    window.history.back();
};

</script>
  