<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        
        <div class="mb-5">
            <div class="text-3xl font-medium text-900 mb-2">iAlert Dashboard</div>
            <div class="text-500">System overview and activity monitoring.</div>
        </div>

        <div class="grid">
            <div class="col-12 md:col-6 lg:col-3">
                <div class="h-9rem">
                    <StatCard title="Pending" value="37" icon="pi pi-clock" color="orange" trend="up" subtext="+5 since last hour" class="h-full" />
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="h-9rem">
                    <StatCard title="Mild Incidents" value="148" icon="pi pi-info-circle" color="green" class="h-full" />
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="h-9rem">
                    <StatCard title="Moderate" value="85" icon="pi pi-exclamation-circle" color="yellow" class="h-full" />
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="h-9rem">
                    <StatCard title="Severe" value="12" icon="pi pi-exclamation-triangle" color="red" trend="down" subtext="-2 solved" class="h-full" />
                </div>
            </div>
        </div>

        <AnalyticsCharts />

        <div class="grid mt-2">
            <div class="col-12 lg:col-8">
                <div class="surface-card shadow-2 border-round p-4 h-30rem flex flex-column">
                    <div class="text-xl font-medium text-900 mb-3">Live Heatmap</div>
                    <div class="flex-1 border-round overflow-hidden relative">
                         <LiveMap /> 
                    </div>
                </div>
            </div>

            <div class="col-12 lg:col-4">
                <div class="surface-card shadow-2 border-round h-30rem overflow-hidden flex flex-column px-3 py-2">
                     <ShiftCalendar />
                </div>
            </div>
        </div>

        <div class="grid mt-2">
            <div class="col-12 xl:col-6">
                <div class="surface-card shadow-2 border-round p-4 h-30rem flex flex-column">
                    <div class="flex justify-content-between align-items-center mb-4">
                        <span class="text-xl font-medium text-900">Recent Reports</span>
                        <Button label="View All" text size="small" />
                    </div>
                    <DataTable :value="incidents" scrollable scrollHeight="flex" :rows="5" size="small" stripedRows class="flex-1">
                        <Column field="id" header="ID"></Column>
                        <Column field="type" header="Type"></Column>
                        <Column header="Priority">
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.priority" :severity="getPrioritySeverity(slotProps.data.priority)" />
                            </template>
                        </Column>
                        <Column header="Status">
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)" icon="pi pi-circle-fill" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>

            <div class="col-12 xl:col-6">
                <div class="surface-card shadow-2 border-round p-4 h-30rem flex flex-column">
                    <span class="text-xl font-medium text-900 mb-4 block">Active Responders</span>
                    <DataTable :value="responders" scrollable scrollHeight="flex" :rows="5" size="small" class="flex-1">
                        <Column field="name" header="Name"></Column>
                        <Column field="role" header="Role"></Column>
                        <Column header="Status">
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.status" :severity="getResponderSeverity(slotProps.data.status)" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref } from 'vue';
import StatCard from '@/components/dashboard/StatCard.vue';
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts.vue'; // IMPORTED
import LiveMap from '@/components/dashboard/LiveMap.vue';
import ShiftCalendar from '@/components/dashboard/ShiftCalendar.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';

// --- DATA ---
const incidents = ref([
    { id: 101, type: 'Fire', priority: 'Severe', status: 'Pending' },
    { id: 102, type: 'Flood', priority: 'Moderate', status: 'Resolved' },
    { id: 103, type: 'Medical', priority: 'Mild', status: 'In Progress' },
    { id: 104, type: 'Accident', priority: 'Severe', status: 'Pending' },
    { id: 105, type: 'Theft', priority: 'Mild', status: 'Resolved' },
]);

const responders = ref([
    { name: 'Ofc. Santos', role: 'Fire', status: 'Available' },
    { name: 'Staff Lopez', role: 'Medical', status: 'Busy' },
    { name: 'Ofc. Cruz', role: 'Police', status: 'En Route' },
]);

// --- HELPERS ---
const getPrioritySeverity = (p) => {
    if (p === 'Severe') return 'danger';
    if (p === 'Moderate') return 'warn';
    return 'success';
};

const getStatusSeverity = (s) => {
    if (s === 'Pending') return 'secondary';
    if (s === 'Resolved') return 'success';
    return 'info';
};

const getResponderSeverity = (s) => {
    if (s === 'Available') return 'success';
    if (s === 'Busy') return 'danger';
    return 'warn';
};
</script>