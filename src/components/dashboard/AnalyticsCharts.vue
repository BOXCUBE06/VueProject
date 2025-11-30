<template>
    <div class="grid mt-2">
        <div class="col-12 lg:col-4">
            <div class="surface-card shadow-2 border-round p-4 h-20rem flex flex-column align-items-center">
                <div class="text-xl font-bold text-900 mb-2 align-self-start">Risk Distribution</div>
                
                <div class="w-full flex-1 min-h-0 relative flex justify-content-center">
                    <Chart type="doughnut" :data="incidentData" :options="doughnutOptions" class="w-full h-full" />
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-8">
            <div class="surface-card shadow-2 border-round p-4 h-20rem flex flex-column">
                <div class="text-xl font-bold text-900 mb-2">Peak Danger Hours (24h)</div>
                
                <div class="w-full flex-1 min-h-0 relative">
                    <Chart type="bar" :data="hoursData" :options="barOptions" class="w-full h-full" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref } from 'vue';
import Chart from 'primevue/chart';

// --- Chart 1: Doughnut Data ---
const incidentData = ref({
    labels: ['Medical', 'Fire', 'Security', 'Flood'],
    datasets: [
        {
            data: [45, 15, 25, 10],
            backgroundColor: ['#10b981', '#ef4444', '#3b82f6', '#f59e0b'],
            hoverBackgroundColor: ['#059669', '#dc2626', '#2563eb', '#d97706'],
            borderWidth: 0
        }
    ]
});

const doughnutOptions = ref({
    responsive: true,
    maintainAspectRatio: false, // CRITICAL: Allows chart to shrink to fit container
    cutout: '65%',
    plugins: {
        legend: { 
            position: 'right', // Moved legend to right to save vertical space
            labels: { usePointStyle: true, boxWidth: 8, color: '#475569', font: { size: 11 } } 
        }
    }
});

// --- Chart 2: Bar Data ---
const hoursData = ref({
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'],
    datasets: [
        {
            label: 'Incidents',
            backgroundColor: '#ef4444', 
            borderRadius: 4,
            data: [2, 12, 8, 15, 25, 18, 5],
            barThickness: 20 // Make bars thinner to look cleaner
        }
    ]
});

const barOptions = ref({
    responsive: true,
    maintainAspectRatio: false, // CRITICAL: Allows chart to shrink
    plugins: { legend: { display: false } },
    scales: {
        x: { 
            grid: { display: false, drawBorder: false }, 
            ticks: { color: '#64748b', font: { size: 11 } } 
        },
        y: { 
            grid: { color: '#f1f5f9', drawBorder: false }, 
            ticks: { color: '#64748b', font: { size: 11 } } 
        }
    }
});
</script>