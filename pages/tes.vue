<template>
    <vue3-datatable :rows="listItems" :columns="cols"> </vue3-datatable>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import type Product from "~/models/Product";
import axios from "axios";


const listItems: Ref<Product[]> = ref([]);

const cols =
    ref([
        { field: 'id', title: 'ID', isUnique: true },
        { field: 'serial_number', title: 'Serial Number' },
        { field: 'product_name', title: 'Name' },
        { field: 'product_price', title: 'Harga', type: 'number' },
        { field: 'stok', title: 'Stok', type: 'number' },
        { field: 'product_sold_over', title: 'Stok Over', type: 'number' },
        { field: 'product_sold', title: 'Terjual', type: 'number' },
    ]) || [];

async function getData() {
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

        const res = await axios.get("http://43.243.187.6:6060/api/v1/product/findall", config);
        const finalRes: Product[] = res.data.data;
        listItems.value = finalRes;
        // rows.value = finalRes;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData();
</script>