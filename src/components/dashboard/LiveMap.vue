<template>
    <div id="mapContainer" class="h-96 w-full rounded-xl z-0"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues in Vue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

onMounted(() => {
    const map = L.map('mapContainer').setView([16.929, 121.769], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Mock Data Markers
    const incidents = [
        { lat: 16.929, lng: 121.769, title: 'Fire', color: 'red' },
        { lat: 16.930, lng: 121.770, title: 'Flood', color: 'blue' },
        { lat: 16.928, lng: 121.768, title: 'Medical', color: 'green' }
    ];

    incidents.forEach(inc => {
        // Simple circle marker for admin view
        L.circleMarker([inc.lat, inc.lng], {
            color: inc.color,
            fillColor: inc.color,
            fillOpacity: 0.5,
            radius: 10
        }).addTo(map).bindPopup(inc.title);
    });
});
</script>