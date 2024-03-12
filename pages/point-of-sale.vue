<template>
    <section class="static">
        <!-- LOGO -->
        <div class="py-4 px-8 shadow-md flex justify-between w-2/3 top">
            <h1 class="text-xl font-semibold text-red-400 flex-initial w-80">
                <Icon name="healthicons:market-stall-outline"
                    class=" font-semibold text-red-400 text-3xl font-poppins" />
                WarungPOS
            </h1>


            <div class="relative flex-1">
                <input placeholder="Pencaharian . . ."
                    class="rounded-lg bg-slate-100 py-2 pl-10 pr-2 w-full font-poppins outline-none"
                    v-model="productSearch" @keyup.enter="getDataSearch" />
                <Icon name="material-symbols-light:search"
                    class="absolute top-1 right-1 font-semibold text-gray-300 text-3xl font-poppins hover:text-red-400 hover:font-bold" />
            </div>
        </div>
        <!-- LOGO -->

        <div class=" flex w-2/3">
            <!-- SIDEBAR OPEN -->
            <div class=" w-1/5 pl-8 h-screen shadow-md">
                <div
                    class="h-4/5 overflow-y-auto scrollbar-thin scrollbar-corner-rounded-md scrollbar-w-2 scrollbar-track-slate-100 scrollbar-thumb-red-400">
                    <div>
                        <h1 class=" font-semibold pl-3 pb-2 pt-3 text-md text-red-500 font-poppins cursor-pointer hover:bg-gray-100"
                            @click="getData">Semua
                            Kategori</h1>
                    </div>
                    <div v-for="category in listCatgeory">
                        <h1 class=" font-semibold pl-3 py-2 text-md text-red-500 font-poppins cursor-pointer hover:bg-gray-100"
                            @click="getDataCategoryLevel1(category.id)">
                            {{ category.category_name }}</h1>
                        <ul v-for="subCategory in category.sub_category"
                            class=" text-sm text-red-500 font-semibold font-poppins cursor-pointer hover:bg-gray-100">
                            <li class="p-3" @click="getDataCategoryLevel2(subCategory.id)">{{ subCategory.category_name
                                }}
                            </li>
                        </ul>
                    </div>
                </div>
                <hr class=" border border-b-2 mr-4">
                <div class=" mr-4">
                    <div class="my-2 flex flex-col justify-between">
                        <div class="flex justify-between">
                            <Icon name="iconamoon:profile-circle"
                                class=" font-semibold text-red-400 text-4xl font-poppins pt-2" />
                            <h1 class=" text-red-400 font-semibold text-sm py-2 block">{{ name }}</h1>
                            <h1 class=" text-white bg-red-400 rounded-md p-2 font-semibold">Cashier</h1>
                        </div>
                    </div>
                    <div class=" w-full py-2">
                        <button @click="handleSingOut"
                            class="px-4 py-2 bg-red-400 rounded-md font-poppins text-white block w-full text-center">
                            Keluar
                        </button>
                    </div>
                </div>
            </div>
            <!-- SIDEBAR CLOSE -->

            <!-- OPEN ISI -->
            <div
                class="w-4/5 shadow-sm p-4 h-screen overflow-y-auto scrollbar-thin scrollbar-corner-rounded-md scrollbar-w-2 scrollbar-track-slate-100 scrollbar-thumb-red-400 relative">
                <div class="grid grid-cols-6 gap-4">
                    <div v-for="(item, index) in listItems" :key="index">
                        <div class="bg-slate-100 rounded-md p-2 text-center w-40 h-44 flex flex-col justify-center cursor-pointer  hover:bg-slate-300 active:bg-slate-500 hover:shadow-sm hover:outline-red-400 hover:outline-2 hover:outline"
                            @click="addCartItem(item)">
                            <div
                                class="flex justify-center items-center aspect-w-4 aspect-h-5 rounded-md overflow-hidden">
                                <img class="w-28 object-cover" :src="item.product_image" alt="mie-gaga.png" />
                            </div>
                            <h1 class="font-semibold font-poppins text-xs py-2">{{
                        item.product_name }}</h1>
                            <div class="flex flex-row justify-between">
                                <h6 class="text-sm font-semibold text-red-400">{{ formatToRupiah(item.product_price) }}
                                </h6>
                                <span class="text-xs font-semibold text-gray-500 inline-block pt-1 align-bottom">{{
                        item.product_sold
                    }}
                                    Terjual</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- END ISI -->
        </div>

        <!-- SIDEBAR RIGHT -->
        <div class=" w-1/3 shadow-md absolute top-0 right-0 h-screen px-8">

            <div class="h-3/5" v-show="isCart">

                <div class=" flex justify-between py-3">
                    <div @click="clickHistory">
                        <Icon name="material-symbols:format-align-left" class=" text-3xl text-red-400 block my-4" />
                    </div>
                    <h1 class=" font-poppins font-semibold text-xl text-center py-4 text-red-400">Cart ({{
                        cartItems.size
                    }})
                    </h1>
                    <div>
                        <Icon name="iwwa:alarm" class=" text-3xl text-red-400 block my-4" />
                    </div>
                </div>
                <hr class=" border border-b-2">

                <div class="flex justify-between py-4 font-poppins">
                    <h1>Order List #{{ orderNumberList }}</h1>
                    <h1>{{ formattedDateTime }}</h1>
                </div>
                <hr class=" border border-b-2">

                <!-- ORDERAN -->
                <div
                    class=" h-full font-poppins overflow-x-auto scrollbar-thin scrollbar-corner-rounded-md scrollbar-w-2 scrollbar-track-slate-100 scrollbar-thumb-red-400 pr-4">
                    <div class="my-4" v-for="item in cartItems">
                        <div class="flex flex-row justify-between">
                            <div>
                                <h1 class=" font-bold">{{ item.product_name }}</h1>
                                <h2>{{ formatToRupiah(item.product_price) }}</h2>
                            </div>
                            <div class="grid grid-cols-3 gap-3 font-semibold">
                                <button class=" p-4 bg-slate-400 rounded-md shadow-md"
                                    @click="addQuantityItem(item)">+</button>
                                <span class="p-4 bg-slate-100 rounded-md">{{ item.total }}</span>
                                <button class="p-4 bg-slate-400 rounded-md shadow-md"
                                    @click="deleteQuantityItem(item)">-</button>
                            </div>
                        </div>
                    </div>
                </div>




                <!-- ORDERAN CKISE -->

                <hr class=" border border-b-2">
                <div class="flex justify-between py-1 font-poppins">
                    <h1>Subtotal</h1>
                    <h1>{{ allSubtotall }}</h1>
                </div>
                <div class="flex justify-between py-1 font-poppins">
                    <h1>Discount {{ realtimePresentaseDiskon }}%</h1>
                    <h1>{{ realtimeDiskon }}</h1>
                </div>
                <div class="flex justify-between py-1 font-poppins">
                    <h1>10% Pajak</h1>
                    <h1>{{ hitungPajakRealtime }}</h1>
                </div>
                <div class="flex justify-between py-1 font-poppins font-bold">
                    <h1>Total</h1>
                    <h1>{{ hitungTotalRealtime }}</h1>
                </div>
                <div class="flex pt-2">
                    <button class=" bg-red-400 px-3 block mr-2 rounded-md py-2">
                        <Icon name="material-symbols-light:save-outline" class="text-white block text-xl" />
                        <h6 class=" text-white txt-xs">Save</h6>
                    </button>
                    <button @click="popUpDiskon" class=" bg-red-400 px-3 block mr-2 rounded-md py-2">
                        <Icon name="ri:discount-percent-line" class="text-white block text-xl" />
                        <h6 class=" text-white txt-xs">Discount</h6>
                    </button>
                    <button class=" bg-red-400 px-3 block mr-2 rounded-md py-2">
                        <Icon name="solar:bill-list-outline" class="text-white block text-xl" />
                        <h6 class=" text-white txt-xs">Split Bill</h6>
                    </button>
                    <button @click="popUp" class=" flex-1 rounded-md px-8 py-2 bg-red-400">
                        <h1 class="text-white text-xl">BAYAR</h1>
                    </button>
                </div>

            </div>


            <div class="h-5/6" v-show="isHistory">

                <div class=" flex justify-between py-3">
                    <div @click="clickHistory">
                        <Icon name="clarity:shopping-cart-line" class=" text-3xl text-red-400 block my-4" />
                    </div>
                    <h1 class=" font-poppins font-semibold text-xl text-center py-4 text-red-400">Daftar History </h1>
                    <div>
                        <Icon name="iwwa:alarm" class=" text-3xl text-red-400 block my-4" />
                    </div>
                </div>

                <hr class=" border border-b-2">

                <div
                    class="h-full font-poppins overflow-x-auto scrollbar-thin scrollbar-corner-rounded-md scrollbar-w-2 scrollbar-track-slate-100 scrollbar-thumb-red-400 pr-4">
                    <div class="m-2 p-2" v-if="isDetailItemCart">
                        <h1 class="font-semibold text-2xl py-2">{{ orderItem?.invoice }}</h1>
                        <h2> Cashier : {{ orderItem?.user_name }}</h2>
                        <h2>Tanggal : </h2>
                        <h1>Total Items : {{ orderItem?.qty }}</h1>
                        <hr class="border-2 my-3">
                        <ul>
                            <li v-for="eh in orderItem?.list_product">
                                {{ eh.product_name }} {{ eh.qty }}x {{ formatToRupiah(eh.product_price) }}
                            </li>
                        </ul>
                        <hr class="border-2 my-3">
                        <h1>Dicount : {{ orderItem?.discount }} %</h1>
                        <h1>Pajak : {{ formatToRupiah(orderItem?.pajak) }}</h1>
                        <h1>Total Pembayaran : {{ formatToRupiah(orderItem?.order_price) }}</h1>
                        <div class="flex">
                            <button
                                class="bg-red-500 mx-1 text-3xl text-white rounded-md shadow-sm px-2 flex items-center my-2 py-2"
                                @click="backItemHistory">
                                <Icon name="ic:twotone-arrow-left" />
                            </button>
                            <button
                                class="bg-red-500 mx-1 text-3xl text-white rounded-md shadow-sm px-2 flex items-center my-2 py-2">
                                <Icon name="clarity:shopping-cart-line" />
                            </button>
                            <button
                                class="bg-red-500 mx-1 text-3xl text-white rounded-md shadow-sm px-2 flex items-center my-2 py-2"
                                @click="orderItem && cetakPrint(orderItem)">
                                <Icon name="lets-icons:print-light" />
                            </button>
                            <button
                                class="bg-red-500 mx-1 text-3xl text-white rounded-md shadow-sm px-2 flex items-center my-2 py-2">
                                <Icon name="mdi-light:delete" />
                            </button>
                        </div>
                    </div>
                    <div class="m-2 rounded-md border border-red-500 p-2 font-poppins" v-for="ep in orderHistoryItem"
                        v-if="isItemCart">
                        <div class=" flex justify-between">
                            <div>
                                <h1 class=" font-semibold">{{ ep.invoice }}</h1>
                                <h3>Qty : {{ ep.qty }}</h3>
                                <h3>Waktu : </h3>
                                <h6>Dibuat Oleh : {{ ep.user_name }}</h6>
                            </div>
                            <div class="flex">
                                <button
                                    class="bg-red-500 mx-1 h-full text-3xl text-white rounded-md shadow-sm px-2 flex items-center"
                                    @click="cetakPrint(ep)">
                                    <Icon name="lets-icons:print-light" />
                                </button>
                                <button
                                    class="bg-red-500 mx-1 h-full text-3xl text-white rounded-md shadow-sm px-2 flex items-center">
                                    <Icon name="clarity:shopping-cart-line" />
                                </button>
                                <button
                                    class="bg-red-500 h-full text-3xl text-white rounded-md shadow-sm px-2 flex items-center"
                                    @click="detailHistoryFunc(ep)">
                                    <Icon name="iwwa:information" />
                                </button>
                                <button
                                    class="bg-red-500 mx-1 h-full text-3xl text-white rounded-md shadow-sm px-2 flex items-center">
                                    <Icon name="mdi-light:delete" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class=" border border-b-2">
            </div>

        </div>

        <div v-if="isPopupVisible"
            class="w-80 h-60 border border-red-500 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 font-poppins text-red-500 text-center">
            <div class="m-4">
                <h1 class="block my-2">Pilih Pembayaran</h1>
                <div class="flex my-2 justify-center">
                    <div @click="popUpCash" class="w-20 py-8 bg-red-500 text-white mx-2 rounded-md cursor-pointer">
                        <span class="text-white text-center block">CASH</span>
                    </div>
                    <div @click="generateXenditQRCode" class="w-20 py-8 bg-red-500 text-white mx-2 rounded-md">
                        <span class="text-white text-center block h-auto cursor-pointer">QRIS</span>
                    </div>

                </div>
                <button @click="closeUp" class="bg-red-500 text-white rounded-md px-4 py-2 mt-2">
                    Batal
                </button>
            </div>
        </div>

        <!-- SIDEBAR CLOSE RIGHT -->
        <div v-if="isPopupVisibleCash"
            class="w-80 h-60 border border-red-500 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 font-poppins text-red-500 text-center">
            <div class="m-4">
                <h1>Total Pembayaran Senilai</h1>
                <span>{{ hitungTotalRealtime }}</span>
                <h1 class="py-2">Uang tunai ?</h1>
                <h3 v-if="subError">Uang cash Kurang dari Total Pembayaran</h3>
                <input v-model="subCash" type="number" class="rounded-md pl-2">
                <div class=" mt-4">
                    <button @click="checkout" class="text-white bg-red-500 mx-1 px-3 py-2 rounded-md">Proses</button>
                    <button @click="closePopUpCash"
                        class="text-white bg-red-500 mx-1 px-3 py-2 rounded-md">Batal</button>
                </div>
            </div>
        </div>

        <div v-if="isPopupVisibleKembalian"
            class="w-80 h-60 border border-red-500 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 font-poppins text-red-500 text-center">
            <div class="m-4">
                <h1>Pembayaran Berhasil</h1>
                <h2>Lakukan Pengembalian Uang Sebesar !</h2>
                <span>{{ realtimeKembalian }}</span>
                <div class=" mt-4">
                    <button @click="closePopKembalian"
                        class="text-white bg-red-500 mx-1 px-3 py-2 rounded-md">Tutup</button>
                </div>
            </div>
        </div>

        <div v-if="isPopupVisibleDiskon"
            class=" w-80 h-40 border border-red-500 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 font-poppins text-red-500 text-center">
            <div class="m-4">
                <h1>Tambahkan Diskon</h1>
                <h2 class="py-2">{{ realtimeDiskon }}</h2>
                <input class=" rounded-md pl-2" name="diskon" v-model="subDiskon" type="number" />
                <div class=" mt-4">
                    <button @click="tambahDiskon"
                        class="text-white bg-red-500 mx-1 px-3 py-2 rounded-md">Tambah</button>
                    <button @click="closeUpDiskon"
                        class="text-white bg-red-500 mx-1 px-3 py-2 rounded-md">Batal</button>
                </div>
            </div>
        </div>

        <div v-show="isPopupVisibleQRCode"
            class=" w-80 h-1/4 border border-red-500 shadow-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 font-poppins text-red-500 text-center">
            <div class="m-4 flex flex-col items-center">
                <h1>QR Code Pembayaran</h1>
                <canvas id="my-qr-code" />
                <button @click="closeUpQRCode" class="text-white bg-red-500 mx-1 px-3 py-2 rounded-md">Tutup</button>
            </div>
        </div>
    </section>
</template>

<style>
#my-qr-code {
    image-rendering: pixelated;
    width: 160px;
    height: 160px;
}
</style>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { jwtDecode } from "jwt-decode";
import type Product from '~/models/Product'
import type CheckoutProductRequest from '~/models/CheckoutProductRequest'
import type CategoryProduct from '~/models/CategoryProduct'
import type ListResultResponse from '~/models/ListResultResponse';
import { RupiahFormatter } from '~/utils/Formatter'
import type Metadata from '~/models/Metadata';
import type CheckoutCartRequest from '~/models/CheckoutCartRequest';
import type OrderHistoryResponse from '~/models/OrderHistoryResponse';
import { generate } from 'lean-qr';


definePageMeta({
    auth: true
})

const { status, signIn, signOut } = useAuth();
const cookies: any = useCookie('auth:token');
const listItems: Ref<Product[]> = ref([]);
const listCatgeory: Ref<CategoryProduct[]> = ref([]);
const listDataCheckout: Ref<CheckoutProductRequest[]> = ref([]);
const name: Ref<string> = ref('');
const productSearch: Ref<string> = ref('');
const cartItems: Ref<Set<Product>> = ref(new Set());
const orderHistoryItem: Ref<OrderHistoryResponse[]> = ref([]);
const orderItem = ref<OrderHistoryResponse | null>(null);
const checkoutRequest: Ref<CheckoutCartRequest> = ref({
    list_item: [],
    invoice: '',
    total_price: 0,
    pajak: 0,
    discount: 0,
    qtyCart: 0
});

const dateTime = ref(new Date());
const subTotal = ref(0);
const subPajak = ref(0);
const orderNumberList = ref(0)
const totalPembayaran = ref(0);
const subDiskon = ref(0);
const subCash = ref(0);
const subKembalian = ref(0);
const qr_string = ref('');
const metadata: Ref<Metadata> = ref({
    total_items: 0,
    page: 0,
    perpage: 0,
    total_pages: 0,
});
let page = ref(1);
let subError: boolean = false
let isPopupVisible: boolean = false;
let isPopupVisibleDiskon: boolean = false;
let isPopupVisibleCash: boolean = false;
let isPopupVisibleKembalian: boolean = false;
let isPopupVisibleQRCode: boolean = false;
let isHistory: boolean = false;
let isCart: boolean = true;
let isItemCart: boolean = true;
let isDetailItemCart: boolean = false;



async function getData() {
    try {
        // Ambil token dari tempat penyimpanan (misalnya localStorage)
        const token = useCookie('auth:token');
        const decoded: any = jwtDecode(token.value ?? '');

        name.value = decoded.name;

        // Pastikan token tersedia sebelum membuat permintaan
        if (!token) {
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            }
        };

        const res = await axios.get("http://43.243.187.6:6060/api/v1/product/findall?page=" + page.value + "&size=30", config);
        const finalRes: ListResultResponse<Product> = res.data.data;
        listItems.value.push(...(finalRes.data || []));
        metadata.value = finalRes.metadata;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getDataCategoryLevel1(e?: number) {
    try {
        // Ambil token dari tempat penyimpanan (misalnya localStorage)
        const token = useCookie('auth:token');
        const decoded: any = jwtDecode(token.value ?? '');

        name.value = decoded.name;

        // Pastikan token tersedia sebelum membuat permintaan
        if (!token) {
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            }
        };
        const res = await axios.get("http://43.243.187.6:6060/api/v1/product/findProductByCategoryLevel1?id=" + e, config);
        const finalRes: Product[] = res.data.data;
        listItems.value = finalRes;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function getDataCategoryLevel2(e?: number) {
    try {
        // Ambil token dari tempat penyimpanan (misalnya localStorage)
        const token = useCookie('auth:token');
        const decoded: any = jwtDecode(token.value ?? '');

        name.value = decoded.name;

        // Pastikan token tersedia sebelum membuat permintaan
        if (!token) {
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            }
        };

        const res = await axios.get("http://43.243.187.6:6060/api/v1/product/findProductByCategoryLevel2?id=" + e, config);
        const finalRes: Product[] = res.data.data;
        listItems.value = finalRes;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getDataSearch() {
    try {

        page.value = 1;
        // Ambil token dari tempat penyimpanan (misalnya localStorage)
        const token = useCookie('auth:token');
        const decoded: any = jwtDecode(token.value ?? '');

        name.value = decoded.name;

        // Pastikan token tersedia sebelum membuat permintaan
        if (!token && productSearch.value == '') {
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            }
        };

        const res = await axios.get("http://43.243.187.6:6060/api/v1/product/search?product=" + productSearch.value + "&page=" + page.value + "&size=30", config);
        const finalRes: ListResultResponse<Product> = res.data.data;
        listItems.value = finalRes.data || [];
        metadata.value = finalRes.metadata;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getCategory() {
    try {
        // Ambil token dari tempat penyimpanan (misalnya localStorage)
        const token = useCookie('auth:token');
        const decoded: any = jwtDecode(token.value ?? '');
        name.value = decoded.name;

        // Pastikan token tersedia sebelum membuat permintaan
        if (!token) {
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            }
        };

        const res = await axios.get("http://43.243.187.6:6060/api/v1/category?warungId=" + decoded.warung_pos_identity, config);
        const finalRes: CategoryProduct[] = res.data.data;
        listCatgeory.value = finalRes;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function checkout() {
    try {

        if (subCash.value < totalPembayaran.value) {
            subError = true;
            return;
        } else {
            subKembalian.value = subCash.value - totalPembayaran.value;
            subCash.value = 0;
            subError = false;
        }
        // Ambil token dari tempat penyimpanan (misalnya localStorage)
        const token = useCookie('auth:token');
        const decoded: any = jwtDecode(token.value ?? '');

        name.value = decoded.name;

        // Pastikan token tersedia sebelum membuat permintaan
        if (!token) {
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            }
        };

        cartItems.value.forEach((e) => {
            const data: CheckoutProductRequest = {
                id: e.id,
                qtyItem: e.total,
            }
            checkoutRequest.value.list_item.push(data);
        })

        checkoutRequest.value.discount = subDiskon.value;
        checkoutRequest.value.invoice = 'INVOICE2024-' + orderNumberList.value;
        checkoutRequest.value.pajak = subPajak.value;
        checkoutRequest.value.total_price = totalPembayaran.value;
        checkoutRequest.value.qtyCart = cartItems.value.size;


        const res = await axios.post("http://43.243.187.6:6060/api/v1/product/checkout", checkoutRequest.value, config);

        getData();
        orderTotal();

        isPopupVisibleCash = false;
        cartItems.value.clear();
        listDataCheckout.value = [];
        isPopupVisibleKembalian = true;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function orderTotal() {
    try {

        // Ambil token dari tempat penyimpanan (misalnya localStorage)
        const token = useCookie('auth:token');
        const decoded: any = jwtDecode(token.value ?? '');

        name.value = decoded.name;

        // Pastikan token tersedia sebelum membuat permintaan
        if (!token) {
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            }
        };

        const res = await axios.get("http://43.243.187.6:6060/api/v1/order/getOrderNext", config);

        orderNumberList.value = res.data.data;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function orderHistoryProduct() {
    try {

        // Ambil token dari tempat penyimpanan (misalnya localStorage)
        const token = useCookie('auth:token');
        const decoded: any = jwtDecode(token.value ?? '');

        name.value = decoded.name;

        // Pastikan token tersedia sebelum membuat permintaan
        if (!token) {
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            }
        };

        const res = await axios.get("http://43.243.187.6:6060/api/v1/order/getOrderByOwner", config);

        orderHistoryItem.value = res.data.data;

        console.log("data", orderHistoryItem);


    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

orderHistoryProduct();

async function handleSingOut() {

    try {
        await signOut();
    } catch (error) {
        console.error('Error logout', error)
    }

    navigateTo('/auth/login-fo');
}

const addCartItem = (item: Product) => {

    const existingProduct = Array.from(cartItems.value).find((product) => product === item);

    if (existingProduct) {
        // If the product already exists in the cartItems set
        if (existingProduct.total) {
            existingProduct.total += 1;
        } else {
            existingProduct.total = 1;
        }
    } else {
        // If the product is not in the cartItems set
        item.total = 1;
        cartItems.value.add(item);
    }
};


const addQuantityItem = (item: Product) => {
    const existingProduct = Array.from(cartItems.value).find((product) => product === item);
    if (existingProduct) {
        // If the product already exists in the cartItems set
        if (existingProduct.total) {
            existingProduct.total += 1;
        } else {
        }
    }

}

const deleteQuantityItem = (item: Product) => {
    const existingProduct = Array.from(cartItems.value).find((product) => product === item);

    if (existingProduct) {
        // If the product already exists in the cartItems set
        if ('total' in existingProduct && existingProduct.total) {
            if (existingProduct.total > 1) {
                existingProduct.total -= 1;
            } else {
                // If the quantity is 1, remove the product from cartItems
                cartItems.value.delete(existingProduct);
            }
        }
    }
};

// UPDATE WAKTU
const formattedDateTime = computed(() => formatDateTime(dateTime.value));

const updateDateTime = () => {
    dateTime.value = new Date();
};

const timer = setInterval(updateDateTime, 1000);

onMounted(() => {
    // Update the time every second
    timer;
});

onBeforeUnmount(() => {
    // Clear the interval when the component is destroyed
    clearInterval(timer);
});

const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
};
//


// hitung subTotal
const hitungSubTotal = () => {
    if (cartItems.value.size !== 0) {
        let totalHargaItem: number = 0;

        cartItems.value.forEach(e => {
            totalHargaItem += e.product_price! * e.total!;
        })
        subTotal.value = totalHargaItem;
        return formatToRupiah(subTotal.value);
    } else {
        subTotal.value = 0
        return formatToRupiah(subTotal.value);
    }
}

const allSubtotall = computed(() => hitungSubTotal());
// 


// hitung discount
const hitungPajak = () => {
    if (subTotal.value !== 0) {
        subPajak.value = (subTotal.value * 10) / 100;
        return formatToRupiah(subPajak.value);
    } else {
        subPajak.value = 0;
        return formatToRupiah(subPajak.value);
    }
}

const hitungPajakRealtime = computed(() => hitungPajak());
//


//hitung total
const hitungTotal = () => {
    if (subTotal.value != 0 && subPajak.value != 0) {
        totalPembayaran.value = (subTotal.value - subDiskon.value) + subPajak.value;
        return formatToRupiah(totalPembayaran.value);
    } else {
        totalPembayaran.value = 0;
        return formatToRupiah(totalPembayaran.value);
    }
}

const hitungTotalRealtime = computed(() => hitungTotal());
//


//hitung diskon

const hitungDiskon = () => {
    if (cartItems.value.size != 0) {
        return formatToRupiah(subDiskon.value);
    } else {
        return formatToRupiah(subDiskon.value);
    }
}

const realtimeDiskon = computed(() => hitungDiskon())
//

//hitung kembalian

const hitungKembalian = () => {
    return formatToRupiah(subKembalian.value);

}

const realtimeKembalian = computed(() => hitungKembalian())
//


//presentaseDiskon
const presentaseDiskon = () => {
    if (totalPembayaran.value !== 0) {
        const presentaseDiskon = Math.round((subDiskon.value / subTotal.value) * 100);
        return presentaseDiskon;
    } else {
        return 0;
    }
}
const realtimePresentaseDiskon = computed(() => presentaseDiskon())
//

const formatToRupiah = (e: number | undefined) => {
    const toRupiah = new RupiahFormatter();
    return toRupiah.format(e);
}

const popUp = () => {
    if (cartItems.value.size != 0) {
        isPopupVisible = true;
    } else {
        isPopupVisible = false;
    }

}

const closeUp = () => {
    isPopupVisible = false;
}

const popUpDiskon = () => {
    if (cartItems.value.size != 0) {
        isPopupVisibleDiskon = true;
    } else {
        isPopupVisibleDiskon = false;
    }

}

const closeUpDiskon = () => {
    isPopupVisibleDiskon = false;
    subDiskon.value = 0;
}

const tambahDiskon = () => {
    isPopupVisibleDiskon = false;
}

const popUpCash = () => {
    isPopupVisibleCash = true;
    isPopupVisible = false;
}

const closePopUpCash = () => {
    isPopupVisibleCash = false;
}
const closePopKembalian = () => {
    isPopupVisibleKembalian = false;
}

const scroll = () => {
    if (process.client) {
        let lastScrollTop = 0;
        window.onscroll = () => {
            let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (bottomOfWindow && scrollTop > lastScrollTop) {
                // Scroll ke bawah
                lastScrollTop = scrollTop;
                if (!(metadata.value.page == metadata.value.total_pages)) {
                    page.value++
                    if (listItems.value) {
                        getData();
                    }
                }
            } else {
                // Scroll ke atas
                lastScrollTop = scrollTop;
                // Lakukan sesuatu untuk scroll ke atas di sini
                console.log('Scrolling up');
            }
        }
    }
}


const clickHistory = () => {
    isHistory = !isHistory;
    isCart = !isCart;
}

const backItemHistory = () => {
    isItemCart = !isItemCart;
    isDetailItemCart = !isDetailItemCart;
    orderItem.value = null;
}

const detailHistoryFunc = (e: OrderHistoryResponse) => {
    isItemCart = !isItemCart;
    isDetailItemCart = !isDetailItemCart;
    orderItem.value = e;
}


const cetakPrint = (e: OrderHistoryResponse) => {

    // Create a new window
    let printWindow = window.open('', '_blank');

    // Write the order details to the new window
    printWindow?.document.write(`<html><head><title>INVOICE</title></head><body>
        <h3>INVOICE: ${e.invoice}</h1>
        <h2>Daftar Barang:</h2>
        <ul>
            ${e.list_product.map(item => `<li>${item.product_name} ${item.qty}x : ${formatToRupiah(item.product_price)}</li>`).join('')}
        </ul>
        <h2>Total Pembayaran: ${formatToRupiah(e.order_price)}</h2>
    </body></html>`);

    // Print the new window
    printWindow?.print();

    // Close the new window after printing
    printWindow?.close();
}

const generateXenditQRCode = async () => {
    const url = 'https://api.xendit.co/qr_codes';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic eG5kX2RldmVsb3BtZW50X09vbUFmT1V0aCtHb3dzWTZMZUpPSHpMQ1p0U2o4NEo5a1hEbitSeGovbUhXK2J5aERRVnhoZz09Og==', // replace with your Xendit secret key
        'api-version': '2022-07-31'
    };
    const data = {
        reference_id: 'order-id-123',
        type: 'DYNAMIC',
        amount: 100000,
        currency: 'IDR',
        expires_at: '2024-10-23T09:56:43.60445Z',
    };

    try {
        const response = await axios.post(url, data, { headers });

        isPopupVisible = false;
        isPopupVisibleQRCode = true;

        qr_string.value = response.data.qr_string;

        console.log(" ini data ", response.data.qr_string);

        const qrCode = generate(response.data.qr_string);
        qrCode.toCanvas(document.getElementById('my-qr-code')! as HTMLCanvasElement);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const closeUpQRCode = () => {
    isPopupVisibleQRCode = false;
}


scroll();
getData();
getCategory();
orderTotal();
</script>
