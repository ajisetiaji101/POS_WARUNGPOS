<template>
    <DashboardBo>
        <div class="w-full">
            <div class="grid grid-cols-3 gap-4 p-4 w-full font-poppins">
                <div class="shadow-md h-96 p-4 rounded-md">
                    <h1>Pembelian Terbanyak</h1>
                    <div class=" w-full">
                        <PieChart :chartData="testData" class=" h-72" />
                    </div>
                </div>
                <div class="shadow-md h-96 p-4 rounded-md">
                    <h1>Stok Produk</h1>
                    <div class="w-full">
                        <BarChart :chartData="data" class="h-72" />
                    </div>
                </div>
                <div class="shadow-md h-96 p-4 rounded-md">
                    <h1>Stok Kategori </h1>
                    <div class="w-full">
                        <BarChart :chartData="data" class="h-72" />
                    </div>
                </div>
            </div>
            <div class=" w-full p-4">
                <LineChart :chartData="dataLine" />
            </div>
        </div>
    </DashboardBo>
</template>
  
<script setup lang="ts">
import { PieChart, BarChart, LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import DashboardBo from './dashboard-bo.vue';

Chart.register(...registerables);


const testData = {
    labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
    datasets: [
        {
            label: "total",
            data: [30, 40, 60, 70, 5],
            backgroundColor: [
                '#77CEFF',
                '#0079AF',
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
            ],
        },
    ],
};

const labels = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli"];

const data = {
    labels: labels,
    datasets: [{
        label: 'Stok Kategori Produk',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
};

const dataLine = {
    labels: labels,
    datasets: [{
        label: 'Total Penjualan',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};

</script>
  