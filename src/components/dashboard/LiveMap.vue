<template>
    <div ref="mapRef" class="h-full w-full z-0" style="min-height: 200px;"></div>
</template>

<script setup>
/* eslint-disable no-undef */
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat'; // Import the plugin

// Fix for icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const mapRef = ref(null);

onMounted(() => {
    if (mapRef.value) {
        // 1. Init Map
        const map = L.map(mapRef.value).setView([16.72075, 121.69128], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // 2. Heatmap Data (Lat, Long, Intensity 0.0-1.0)
        // Intensity: 1.0 = Fire/Severe, 0.5 = Medical, 0.2 = Minor
        const heatPoints = [
            [16.7208, 121.6913, 1.0], // Admin Bldg (High Heat)
            [16.7212, 121.6908, 0.5], 
            [16.7198, 121.6915, 0.8], 
            [16.7205, 121.6925, 0.3],
            [16.7220, 121.6900, 0.6],
            [16.7208, 121.6913, 1.0]  // Overlapping point increases heat
        ];

        // 3. Add Heat Layer
        L.heatLayer(heatPoints, {
            radius: 25,
            blur: 15,
            maxZoom: 17,
            gradient: {
                0.4: 'blue',   // Safe
                0.65: 'lime',  // Caution
                1.0: 'red'     // Danger
            }
        }).addTo(map);

        // 4. Add Markers (Optional: Keep markers on top)
        const incidents = [
            { lat: 16.7208, lng: 121.6913, title: 'Fire Incident' },
            { lat: 16.7212, lng: 121.6908, title: 'Flood Warning' }
        ];

        incidents.forEach(inc => {
            L.circleMarker([inc.lat, inc.lng], {
                color: 'white',
                fillColor: '#ef4444',
                fillOpacity: 1,
                weight: 2,
                radius: 6
            }).addTo(map).bindPopup(inc.title);
        });

        setTimeout(() => { map.invalidateSize(); }, 100);
    }
});
</script>