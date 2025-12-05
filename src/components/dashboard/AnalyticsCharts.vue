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
        
        <div class="flex justify-content-between align-items-center mb-2">
            <div class="text-xl font-bold text-900">Incidents per Day</div>
            
            <div class="surface-100 text-600 font-semibold px-2 py-1 border-round text-sm">
                {{ weekDateRange }}
            </div>
        </div>
        
        <div class="w-full flex-1 min-h-0 relative">
            <Chart type="bar" :data="weeklyData" :options="barOptions" class="w-full h-full" />
        </div>
    </div>
</div>
    </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, computed } from 'vue';
import Chart from 'primevue/chart';

const weekDateRange = computed(() => {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday
    const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // Sunday

    const options = { month: 'short', day: 'numeric' };
    return `${firstDay.toLocaleDateString('en-US', options)} - ${lastDay.toLocaleDateString('en-US', options)}`;
});

// --- Chart 1: Doughnut Data ---
const incidentData = ref({
    // These match your Backend ENUM / Mobile App List exactly
    labels: ['Medical', 'Fire', 'Harassment', 'Accident', 'Natural Disaster', 'Other'],
    datasets: [
        {
            // Dummy numbers for now
            data: [35, 15, 20, 15, 10, 5], 
            backgroundColor: [
                '#10b981', // Medical (Green)
                '#ef4444', // Fire (Red)
                '#8b5cf6', // Harassment (Purple)
                '#f59e0b', // Accident (Amber/Orange)
                '#3b82f6', // Natural Disaster (Blue)
                '#94a3b8'  // Other (Grey)
            ],
            hoverBackgroundColor: [
                '#059669', // Medical Dark
                '#dc2626', // Fire Dark
                '#7c3aed', // Harassment Dark
                '#d97706', // Accident Dark
                '#2563eb', // Disaster Dark
                '#64748b'  // Other Dark
            ],
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

// --- Chart 2: Bar Data (Weekly View) ---
const weeklyData = ref({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Total Incidents',
            // Using a slightly lighter red or the primary color to distinguish from the donut
            backgroundColor: '#ef4444', 
            borderRadius: 6, // Slightly rounder bars look modern
            data: [12, 19, 3, 5, 2, 3, 9], // Dummy data
            barThickness: 35 // Thicker bars since there are only 7 items (instead of 24)
        }
    ]
});

// Options (mostly the same, just tweaked for the new bar thickness)
const barOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
        legend: { display: false },
        tooltip: {
            callbacks: {
                // Prescriptive hint: Show context in tooltip
                label: function(context) {
                    return ` ${context.raw} Incidents - Staffing Level: ${context.raw > 10 ? 'HIGH' : 'NORMAL'}`;
                }
            }
        }
    },
    scales: {
        x: { 
            grid: { display: false, drawBorder: false }, 
            ticks: { color: '#64748b', font: { size: 12 } } 
        },
        y: { 
            grid: { color: '#f1f5f9', drawBorder: false }, 
            ticks: { color: '#64748b', font: { size: 11 } },
            beginAtZero: true
        }
    }
});
</script>