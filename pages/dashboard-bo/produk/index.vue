<template>
    <DashboardBo>
        <div class="w-full m-4 pt-16">
            <div class="flex justify-end">
                <NuxtLink to="/dashboard-bo/produk/tambah-produk"
                    class="py-2 px-4 text-white bg-red-500 rounded-md mb-4">
                    Tambah
                </NuxtLink>
                <NuxtLink to="/dashboard-bo/produk/tambah-produk"
                    class="py-2 px-4 ml-2 text-white bg-green-500 rounded-md mb-4">
                    Print
                </NuxtLink>
            </div>
            <vue3-datatable :rows="listItems" :columns="cols" :loading="loading" :sortable="true" :columnFilter="true"
                :isServerMode="true" :totalRows="total_rows" :pageSize="params.pagesize" :hasCheckbox="true"
                @change="changeServer" skin="bh-table-bordered">
                <template #product_price="data">
                    <strong class="text-info">{{ formatToRupiah(data.value.product_price) }}</strong>
                </template>
                <template #actions="data">
                    <div class="flex gap-4">
                        <button type="button" class=" bg-green-500 text-white px-4 py-2 rounded-md"
                            @click="viewUser(data.value)">View</button>
                        <button type="button" class="bg-red-500 text-white px-4 py-2 rounded-md"
                            @click="deleteUser(data.value)">Delete</button>
                    </div>
                </template>
            </vue3-datatable>
        </div>
    </DashboardBo>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import type Product from "~/models/Product";
import axios from "axios";
import DashboardBo from "../dashboard-bo.vue";
import type Metadata from "~/models/Metadata";
import type ListResultResponse from "~/models/ListResultResponse";


const listItems: Ref<Product[]> = ref([]);
const loading: any = ref(true);
let total_rows = ref(0);
const params = reactive({
    current_page: 1,
    pagesize: 10,
    sort_column: 'id',
    sort_direction: 'asc',
});
const metadata: Ref<Metadata> = ref({
    total_items: 0,
    page: 0,
    perpage: 0,
    total_pages: 0,
});

const cols =
    ref([
        { field: 'id', title: 'ID', isUnique: true },
        { field: 'serial_number', title: 'Serial Number' },
        { field: 'product_name', title: 'Name' },
        { field: 'product_price', title: 'Harga', type: 'number' },
        { field: 'stok', title: 'Stok', type: 'number' },
        { field: 'product_sold_over', title: 'Stok Over', type: 'number' },
        { field: 'product_sold', title: 'Terjual', type: 'number' },
        { field: 'actions', title: 'Actions' },
    ]) || [];

async function getData() {
    try {
        loading.value = true;
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

        const res = await axios.get("http://43.243.187.6:6060/api/v1/product/findall?page=" + params.current_page + "&size=" + params.pagesize, config);
        const finalRes: ListResultResponse<Product> = res.data.data;
        listItems.value = finalRes.data;

        metadata.value = finalRes.metadata;

        total_rows.value = metadata.value.total_items;

        loading.value = false;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const changeServer = (data: any) => {
    params.current_page = data.current_page;
    params.pagesize = data.pagesize;

    getData();
};

const viewUser = (data: Product) => {
    alert('View User \n' + data.id + ', ' + data.product_name + ', ' + data.product_price + ', ' + data.product_sold_over + ', ' + data.product_sold);
};
const deleteUser = (data: Product) => {
    alert('View User \n' + data.id + ', ' + data.product_name + ', ' + data.product_price + ', ' + data.product_sold_over + ', ' + data.product_sold);
};

getData();

const formatToRupiah = (e: number | undefined) => {
    const toRupiah = new RupiahFormatter();
    return toRupiah.format(e);
}

</script>