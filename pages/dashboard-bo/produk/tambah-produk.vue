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
                    <div class="mb-4">
                        <label for="product_category_1" class="block text-sm font-bold mb-2">Kategori :</label>
                        <select id="product_category_1" name="product_category_1"
                            class="border rounded w-full py-2 px-3 border-red-500" v-model="formData.product_category_1"
                            @change="updateSubcategories">
                            <option value="" disabled selected>Pilih Kategori</option>
                            <option v-for="category in listCategory" :value="category.id">{{ category.category_name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="product_category_2" class="block text-sm font-bold mb-2">Sub Kategori :</label>
                        <select type="text" id="product_category_2" name="product_category_2"
                            v-model="formData.product_category_2"
                            class="border rounded w-full py-2 px-3 border-red-500">
                            <option value="" disabled selected>Pilih Sub Kategori</option>
                            <!-- Check this loop -->
                            <option v-for="cat in listCategoryLvl2" :value="cat.id">{{ cat.category_name }}</option>
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
import type CategoryProduct from "~/models/CategoryProduct";
import DashboardBo from "~/pages/dashboard-bo/dashboard-bo.vue";
 
const productEror = ref<string | null>(null);
const productBerhasil = ref<string | null>(null);
const listCategory = ref<CategoryProduct[] | null>(null);
let listCategoryLvl2 = ref<CategoryProduct[] | null>(null);

const formData = ref({
    serial_number: '',
    product_name: '',
    product_price: '',
    product_image: '',
    product_category_1: null,
    product_category_2: null
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
        let res = await axios.post("http://43.243.187.6:6060/api/v1/product/addProduct", formData.value, config);
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
        product_category_1: null,
        product_category_2: null
    };
};

async function getDataCategory() {
    try {
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

        const res = await axios.get("http://43.243.187.6:6060/api/v1/category/findall", config);
        const finalRes: CategoryProduct[] = res.data.data;

        listCategory.value = finalRes;


    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateSubcategories() {
    // Filter subcategories based on the selected category
    const selectedCategoryId = formData.value.product_category_1;

    console.log("ini datanya", selectedCategoryId);

    const selectedCategory = listCategory.value?.find(category => category.id === selectedCategoryId);

    console.log("ini datanya category", selectedCategory);

    if (selectedCategory) {
        formData.value.product_category_2 = null // Reset the second dropdown value
        listCategoryLvl2.value = selectedCategory.sub_category || []; // Set subcategories, or empty array if none

        console.log("ini sub ", listCategoryLvl2.value);

    } else {
        // If no category is selected, clear the subcategory list
        listCategoryLvl2.value = [];
    }
}



const goBack = () => {
    window.history.back();
};




getDataCategory();


</script>