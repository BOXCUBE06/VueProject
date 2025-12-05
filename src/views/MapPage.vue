<template>
    <div class="surface-ground px-3 py-4">
        
        <div class="mb-4">
            <div class="text-2xl font-bold text-900">Live Incident Map</div>
            <div class="text-500 text-sm">Real-time situational awareness for ISU Echague.</div>
        </div>

        <div class="grid">
            <div class="col-12 md:col-6 lg:col-3">
                <div class="h-9rem">
                    <div class="surface-card shadow-2 p-3 border-round border-left-3 border-red-500 flex align-items-center justify-content-between h-full">
                        <div>
                            <span class="block text-500 font-medium mb-1">Active Incidents</span>
                            <div class="text-900 font-bold text-2xl">6</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-red-100 border-round" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-exclamation-circle text-red-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="h-9rem">
                    <div class="surface-card shadow-2 p-3 border-round border-left-3 border-orange-500 flex align-items-center justify-content-between h-full">
                        <div>
                            <span class="block text-500 font-medium mb-1">Severe</span>
                            <div class="text-900 font-bold text-2xl">2</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-bolt text-orange-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="h-9rem">
                    <div class="surface-card shadow-2 p-3 border-round border-left-3 border-yellow-500 flex align-items-center justify-content-between h-full">
                        <div>
                            <span class="block text-500 font-medium mb-1">Moderate</span>
                            <div class="text-900 font-bold text-2xl">3</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-yellow-100 border-round" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-exclamation-triangle text-yellow-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="h-9rem">
                    <div class="surface-card shadow-2 p-3 border-round border-left-3 border-green-500 flex align-items-center justify-content-between h-full">
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
        </div>

        <div class="grid mt-2">
            
            <div class="col-12 lg:col-8">
                <div class="surface-card shadow-2 border-round p-4 h-30rem flex flex-column">
                    <div class="text-xl font-medium text-900 mb-3 flex justify-content-between align-items-center">
                        <span>ISU Echague Map</span>
                        <div class="bg-green-100 text-green-700 px-2 py-1 border-round text-sm font-bold flex align-items-center">
                        </div>
                    </div>
                    <div class="flex-1 border-round overflow-hidden relative">
                        <div id="fullMap" style="height: 100%; width: 100%; z-index: 1;"></div>
                    </div>
                </div>
            </div>

            <div class="col-12 lg:col-4">
                <div class="surface-card shadow-2 border-round h-30rem overflow-hidden flex flex-column p-4">
                    <div class="flex justify-content-between align-items-center mb-3">
                        <span class="text-xl font-medium text-900">Active Reports</span>
                        <Button icon="pi pi-refresh" text rounded severity="secondary" size="small" v-tooltip.top="'Refresh'" />
                    </div>
                    
                    <div class="mb-3">
                        <span class="p-input-icon-left w-full">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." class="w-full p-inputtext-sm" />
                        </span>
                    </div>

                    <DataTable 
                        :value="incidents" 
                        :filters="filters" 
                        scrollable 
                        scrollHeight="flex" 
                        size="small" 
                        stripedRows 
                        class="flex-1 cursor-pointer"
                        selectionMode="single"
                        @rowSelect="onRowSelect"
                    >
                        <Column field="type" header="Incident">
                             <template #body="slotProps">
                                <div class="flex flex-column">
                                    <span class="font-bold">{{ slotProps.data.type }}</span>
                                    <span class="text-500 text-xs"><i class="pi pi-clock text-xs mr-1"></i>{{ slotProps.data.time }}</span>
                                </div>
                            </template>
                        </Column>

                        <Column field="status" header="Status">
                             <template #body="slotProps">
                                <div class="flex flex-column gap-1">
                                    <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)" class="text-xs w-min" />
                                    <span v-if="slotProps.data.priority === 'Severe'" class="text-red-500 text-xs font-bold">
                                        <i class="pi pi-exclamation-circle"></i> Severe
                                    </span>
                                </div>
                            </template>
                        </Column>

                        <Column header="Navigate">
                            <template #body="slotProps">
                                <Button 
                                    icon="pi pi-map-marker" 
                                    text 
                                    rounded 
                                    severity="success" 
                                    size="small" 
                                    @click.stop="flyToLocation(slotProps.data)" 
                                    v-tooltip.left="'Focus Map'"
                                />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>

        <Dialog v-model:visible="detailsVisible" header="Incident Details" :style="{ width: '450px' }" :modal="true" class="p-fluid">
            <div v-if="selectedIncident" class="flex flex-column gap-3">
                
                <div class="flex align-items-center justify-content-between">
                    <span class="text-xl font-bold">{{ selectedIncident.type }} Alert</span>
                    <Tag :value="selectedIncident.priority" :severity="getPrioritySeverity(selectedIncident.priority)" />
                </div>

                <Divider />

                <div class="grid">
                    <div class="col-6">
                        <div class="text-500 text-sm">Reporter</div>
                        <div class="font-medium">{{ selectedIncident.reporter }}</div>
                    </div>
                    <div class="col-6">
                        <div class="text-500 text-sm">Time Reported</div>
                        <div class="font-medium">{{ selectedIncident.time }}</div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="text-500 text-sm">Location</div>
                        <div class="font-medium">{{ selectedIncident.location }}</div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="text-500 text-sm">Status</div>
                        <Tag :value="selectedIncident.status" :severity="getStatusSeverity(selectedIncident.status)" />
                    </div>
                </div>

                <div class="surface-100 p-3 border-round mt-2">
                    <div class="text-500 text-sm mb-1">Description</div>
                    <div class="line-height-3 text-sm">
                        {{ selectedIncident.description || 'No additional description provided by the reporter.' }}
                    </div>
                </div>

                <div class="text-xs text-500 text-right mt-1">
                    GPS: {{ selectedIncident.coords[0] }}, {{ selectedIncident.coords[1] }}
                </div>
            </div>

            <template #footer>
                <Button label="Close" icon="pi pi-times" text @click="detailsVisible = false" />
                <Button label="Take Action" icon="pi pi-check" severity="danger" autofocus />
            </template>
        </Dialog>

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
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import { FilterMatchMode } from '@primevue/core/api';

// --- State ---
const ISU_CENTER = [16.72075, 121.69128];
let map = null; // Store map instance globally

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const detailsVisible = ref(false);
const selectedIncident = ref(null);

const incidents = ref([
    { id: 1, type: 'Fire', priority: 'Severe', reporter: 'John Cruz', status: 'Active', location: 'Admin Building', time: '2 mins ago', coords: [16.7208, 121.6913], description: 'Smoke detected on 2nd floor hallway.' },
    { id: 2, type: 'Flood', priority: 'Moderate', reporter: 'Maria Lopez', status: 'Responding', location: 'CSICT Dept', time: '10 mins ago', coords: [16.7212, 121.6908], description: 'Drainage overflow near the computer lab.' },
    { id: 3, type: 'Medical', priority: 'Mild', reporter: 'Carlos Rosa', status: 'Resolved', location: 'Gymnasium', time: '30 mins ago', coords: [16.7198, 121.6915], description: 'Student fainted during PE class.' },
    { id: 4, type: 'Theft', priority: 'Mild', reporter: 'Anna Lee', status: 'Active', location: 'Main Gate', time: '45 mins ago', coords: [16.7201, 121.6920], description: 'Bicycle missing from the parking rack.' },
]);

// --- Actions ---

// 1. Open Details (Row Click)
const onRowSelect = (event) => {
    selectedIncident.value = event.data;
    detailsVisible.value = true;
};

// 2. Navigate Map (Button Click)
const flyToLocation = (incident) => {
    if (map) {
        map.flyTo(incident.coords, 19, {
            animate: true,
            duration: 1.5
        });
        
        // Open the popup on the map marker automatically
        // (Note: In a real app, you'd link the marker object to the ID to find it. 
        // For simplicity, we just move the view here).
    }
};

// --- Map Logic ---
onMounted(() => {
    map = L.map('fullMap', {
        center: ISU_CENTER,
        zoom: 17,
        minZoom: 15,
        maxZoom: 19,
        zoomControl: false
    });

    const southWest = L.latLng(16.700, 121.670);
    const northEast = L.latLng(16.740, 121.715);
    const bounds = L.latLngBounds(southWest, northEast);

    map.setMaxBounds(bounds);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    const greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    incidents.value.forEach((inc) => {
        L.marker(inc.coords, { icon: greenIcon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align:center">
                    <strong style="color: #10b981">${inc.type}</strong><br>
                    ${inc.location}<br>
                    <span style="color: #666; font-size: 0.8em">${inc.time}</span>
                </div>
            `);
    });
    
    setTimeout(() => { map.invalidateSize(); }, 100);
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
#fullMap { z-index: 0; }
</style>