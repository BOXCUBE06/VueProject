<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        
        <div class="mb-5 flex justify-content-between align-items-center">
            <div>
                <h2 class="text-3xl font-bold text-900 mb-2">Live Incident Map</h2>
                <div class="text-500">Real-time situational awareness for ISU Echague</div>
            </div>
            <div class="flex gap-2">
                <Button label="Refresh Data" icon="pi pi-refresh" severity="secondary" outlined />
                <Button label="Dispatch Team" icon="pi pi-megaphone" severity="danger" />
            </div>
        </div>

        <div class="grid mb-5">
            <div class="col-12 md:col-3">
                <div class="surface-card shadow-2 p-3 border-round border-left-3 border-red-500 flex align-items-center justify-content-between">
                    <div>
                        <span class="block text-500 font-medium mb-1">Active Incidents</span>
                        <div class="text-900 font-bold text-2xl">6</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-red-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-exclamation-circle text-red-500 text-xl"></i>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-3">
                <div class="surface-card shadow-2 p-3 border-round border-left-3 border-orange-500 flex align-items-center justify-content-between">
                    <div>
                        <span class="block text-500 font-medium mb-1">Severe</span>
                        <div class="text-900 font-bold text-2xl">2</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-bolt text-orange-500 text-xl"></i>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-3">
                <div class="surface-card shadow-2 p-3 border-round border-left-3 border-yellow-500 flex align-items-center justify-content-between">
                    <div>
                        <span class="block text-500 font-medium mb-1">Moderate</span>
                        <div class="text-900 font-bold text-2xl">3</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-yellow-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-exclamation-triangle text-yellow-500 text-xl"></i>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-3">
                <div class="surface-card shadow-2 p-3 border-round border-left-3 border-green-500 flex align-items-center justify-content-between">
                    <div>
                        <span class="block text-500 font-medium mb-1">Mild</span>
                        <div class="text-900 font-bold text-2xl">1</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-check-circle text-green-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="surface-card shadow-2 border-round p-0 mb-5 overflow-hidden">
            <div class="bg-red-600 text-white font-bold p-3 flex align-items-center">
                <i class="pi pi-map-marker mr-2"></i> ISU Echague Command Map
            </div>
            <div id="fullMap" style="height: 500px; width: 100%; z-index: 1;"></div>
        </div>

        <div class="surface-card shadow-2 border-round p-4">
            <div class="flex align-items-center justify-content-between mb-3">
                <h3 class="text-xl font-bold m-0 text-900">Active Incident Reports</h3>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Search..." class="p-inputtext-sm" />
                </span>
            </div>

            <DataTable :value="incidents" :filters="filters" paginator :rows="5" size="small" stripedRows responsiveLayout="scroll">
                <Column field="id" header="ID" sortable></Column>
                
                <Column field="type" header="Type" sortable>
                     <template #body="slotProps">
                        <span class="font-bold">{{ slotProps.data.type }}</span>
                    </template>
                </Column>
                
                <Column field="priority" header="Priority" sortable>
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.priority" :severity="getPrioritySeverity(slotProps.data.priority)" />
                    </template>
                </Column>
                
                <Column field="reporter" header="Reporter" sortable></Column>
                
                <Column field="status" header="Status" sortable>
                     <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)" icon="pi pi-circle-fill" />
                    </template>
                </Column>
                
                <Column field="location" header="Location"></Column>
                
                <Column field="time" header="Time">
                    <template #body="slotProps">
                        <span class="text-500 text-sm"><i class="pi pi-clock mr-1"></i>{{ slotProps.data.time }}</span>
                    </template>
                </Column>

                 <Column header="Action">
                    <template #body>
                        <Button icon="pi pi-map" text rounded severity="danger" v-tooltip.top="'Locate'" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';

// --- Constants ---
const ISU_CENTER = [16.72075, 121.69128];

// --- State ---
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const incidents = ref([
    { id: 1, type: 'Fire', priority: 'Severe', reporter: 'John Cruz', status: 'Active', location: 'Admin Building', time: '2 mins ago', coords: [16.7208, 121.6913] },
    { id: 2, type: 'Flood', priority: 'Moderate', reporter: 'Maria Lopez', status: 'Responding', location: 'CSICT Dept', time: '10 mins ago', coords: [16.7212, 121.6908] },
    { id: 3, type: 'Medical', priority: 'Mild', reporter: 'Carlos Rosa', status: 'Resolved', location: 'Gymnasium', time: '30 mins ago', coords: [16.7198, 121.6915] },
    { id: 4, type: 'Theft', priority: 'Mild', reporter: 'Anna Lee', status: 'Active', location: 'Main Gate', time: '45 mins ago', coords: [16.7201, 121.6920] },
]);

// --- Map Logic ---
onMounted(() => {
    // 1. Initialize Map
    const map = L.map('fullMap', {
        center: ISU_CENTER,
        zoom: 17,
        minZoom: 15,        // CHANGED: Lowered from 16 to 15 to allow a wider view
        maxZoom: 19,
        zoomControl: false
    });

    // 2. Define Bounds (The "Lock") - WIDENED
    // Previous tight bounds: SW(16.715, 121.685), NE(16.725, 121.698)
    // New wider bounds (roughly +/- 2km radius around center):
    const southWest = L.latLng(16.700, 121.670);
    const northEast = L.latLng(16.740, 121.715);
    const bounds = L.latLngBounds(southWest, northEast);

    map.setMaxBounds(bounds);
    map.on('drag', function() {
        map.panInsideBounds(bounds, { animate: false });
    });

    // 3. Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    // 4. Custom Marker Icons
    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // 5. Add Markers
    incidents.value.forEach((inc) => {
        L.marker(inc.coords, { icon: redIcon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align:center">
                    <strong style="color: #d32f2f">${inc.type}</strong><br>
                    ${inc.location}<br>
                    <span style="color: #666; font-size: 0.8em">${inc.time}</span>
                </div>
            `);
    });

    // REMOVED: The L.circle code block has been deleted here.
});

// --- Helpers ---
const getPrioritySeverity = (p) => {
    if (p === 'Severe') return 'danger';
    if (p === 'Moderate') return 'warn';
    return 'success';
};

const getStatusSeverity = (s) => {
    if (s === 'Active') return 'danger';
    if (s === 'Responding') return 'info';
    return 'success';
};
</script>

<style scoped>
/* Ensure map stays below dropdowns if they exist */
#fullMap {
    z-index: 0; 
}
</style>