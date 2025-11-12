<template>
  <div class="container-fluid py-4">
    <!-- Title -->
    <div class="mb-4">
      <h2 class="fw-bold">Live Incident Map</h2>
      <p class="text-muted">View real-time incidents across ISU Echague</p>
    </div>

    <!-- Summary Cards -->
    <div class="row g-3 mb-4">
      <div
        v-for="(card, index) in summaryCards"
        :key="index"
        class="col-md-3 col-sm-6"
      >
        <div class="card text-center shadow-sm border-0">
          <div
            class="card-body"
            :class="card.bg"
            style="border-radius: 10px; color: white;"
          >
            <h6 class="text-uppercase fw-bold small">{{ card.title }}</h6>
            <h3 class="fw-bold">{{ card.value }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Map -->
    <div class="card shadow-sm border-0 mb-4">
      <div class="card-header bg-primary text-white fw-bold">
        ISU Echague Live Map
      </div>
      <div class="card-body p-0">
        <div id="liveMap" style="height: 500px; width: 100%;"></div>
      </div>
    </div>

    <!-- Incident Reports Table -->
    <div class="card shadow-sm border-0">
      <div class="card-header bg-dark text-white fw-bold">
        Active Incident Reports
      </div>
      <div class="card-body table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-secondary">
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Reporter</th>
              <th>Status</th>
              <th>Location</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="incident in incidents" :key="incident.id">
              <td>{{ incident.id }}</td>
              <td>{{ incident.type }}</td>
              <td>
                <span :class="priorityClass(incident.priority)" class="badge">
                  {{ incident.priority }}
                </span>
              </td>
              <td>{{ incident.reporter }}</td>
              <td>
                <span :class="statusClass(incident.status)" class="badge">
                  {{ incident.status }}
                </span>
              </td>
              <td>{{ incident.location }}</td>
              <td>{{ incident.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// === Summary Cards ===
const summaryCards = ref([
  { title: 'Active Incidents', value: 6, bg: 'bg-primary' },
  { title: 'Severe', value: 2, bg: 'bg-danger' },
  { title: 'Moderate', value: 3, bg: 'bg-warning text-dark' },
  { title: 'Mild', value: 1, bg: 'bg-success' },
])

// === Dummy Incident Data ===
const incidents = ref([
  {
    id: 1,
    type: 'Fire',
    priority: 'Severe',
    reporter: 'John Cruz',
    status: 'Active',
    location: 'ISU Gymnasium',
    time: '2 mins ago',
    coords: [16.7055, 121.6581],
  },
  {
    id: 2,
    type: 'Flood',
    priority: 'Moderate',
    reporter: 'Maria Lopez',
    status: 'Responding',
    location: 'Engineering Building',
    time: '10 mins ago',
    coords: [16.7078, 121.6542],
  },
  {
    id: 3,
    type: 'Medical Emergency',
    priority: 'Mild',
    reporter: 'Carlos Dela Rosa',
    status: 'Resolved',
    location: 'IT Department',
    time: '30 mins ago',
    coords: [16.7069, 121.6598],
  },
])

// === Leaflet Map Setup ===
onMounted(() => {
  const map = L.map('liveMap').setView([16.707, 121.657], 16)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  // Add dummy markers
  incidents.value.forEach((incident) => {
    const marker = L.marker(incident.coords).addTo(map)
    marker.bindPopup(
      `<b>${incident.type}</b><br>
      Priority: ${incident.priority}<br>
      Location: ${incident.location}<br>
      Status: ${incident.status}`
    )
  })
})

// === Helper Functions ===
const priorityClass = (priority) => ({
  'bg-danger text-white': priority === 'Severe',
  'bg-warning text-dark': priority === 'Moderate',
  'bg-success text-white': priority === 'Mild',
})

const statusClass = (status) => ({
  'bg-danger text-white': status === 'Active',
  'bg-info text-white': status === 'Responding',
  'bg-success text-white': status === 'Resolved',
})
</script>

<style scoped>
.card {
  border-radius: 10px;
}
#liveMap {
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.badge {
  font-size: 0.8rem;
}
</style>
