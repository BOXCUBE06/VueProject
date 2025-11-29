<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        
        <div class="mb-5">
            <div class="text-3xl font-medium text-900 mb-2">iAlert Dashboard</div>
            <div class="text-500">System overview and activity monitoring.</div>
        </div>

        <div class="grid">
            <div class="col-12 md:col-6 lg:col-3">
                <StatCard title="Pending" value="37" icon="pi pi-clock" color="orange" trend="up" subtext="+5 since last hour" />
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <StatCard title="Mild Incidents" value="148" icon="pi pi-info-circle" color="green" />
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <StatCard title="Moderate" value="85" icon="pi pi-exclamation-circle" color="yellow" />
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <StatCard title="Severe" value="12" icon="pi pi-exclamation-triangle" color="red" trend="down" subtext="-2 solved" />
            </div>
        </div>

        <div class="grid mt-2">
            <div class="col-12 lg:col-8">
                <div class="surface-card shadow-2 border-round p-4 h-full">
                    <div class="text-xl font-medium text-900 mb-3">Live Incident Map</div>
                    <LiveMap /> 
                </div>
            </div>

            <div class="col-12 lg:col-4">
                <div class="surface-card shadow-2 border-round p-4 h-full flex flex-column align-items-center">
                    <div class="text-xl font-medium text-900 mb-3 align-self-start">Event Calendar</div>
                    <DatePicker v-model="date" inline class="w-full border-none" />
                </div>
            </div>
        </div>

        <div class="grid mt-2">
            <div class="col-12 xl:col-6">
                <div class="surface-card shadow-2 border-round p-4">
                    <div class="flex justify-content-between align-items-center mb-4">
                        <span class="text-xl font-medium text-900">Recent Reports</span>
                        <Button label="View All" text size="small" />
                    </div>
                    
                    <DataTable :value="incidents" paginator :rows="4" size="small" stripedRows responsiveLayout="scroll">
                        <Column field="id" header="ID"></Column>
                        <Column field="reporter" header="Reporter"></Column>
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
                <div class="surface-card shadow-2 border-round p-4 h-full">
                    <span class="text-xl font-medium text-900 mb-4 block">Active Responders</span>
                    <DataTable :value="responders" paginator :rows="3" size="small" responsiveLayout="scroll">
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
import LiveMap from '@/components/dashboard/LiveMap.vue';
import DatePicker from 'primevue/datepicker';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';

// --- Date ---
const date = ref(new Date());

// --- Table Data ---
const incidents = ref([
    { id: 101, reporter: 'John Doe', type: 'Fire', priority: 'Severe', status: 'Pending' },
    { id: 102, reporter: 'Maria R', type: 'Flood', priority: 'Moderate', status: 'Resolved' },
    { id: 103, reporter: 'Pedro S', type: 'Medical', priority: 'Mild', status: 'In Progress' },
    { id: 104, reporter: 'Ana G', type: 'Accident', priority: 'Severe', status: 'Pending' },
    { id: 105, reporter: 'Lucas K', type: 'Theft', priority: 'Mild', status: 'Resolved' },
]);

const responders = ref([
    { name: 'Ofc. Santos', role: 'Fire', status: 'Available' },
    { name: 'Staff Lopez', role: 'Medical', status: 'Busy' },
    { name: 'Ofc. Cruz', role: 'Police', status: 'En Route' },
]);

// --- Helpers for Tags ---
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