<template>
  <div class="incident-page">
    <h1 class="page-title">📊 Incident Reports Dashboard</h1>
    <p class="subtitle">Overview of ongoing and past emergency incidents</p>

    <!-- 📦 Top Stat Widgets -->
    <div class="stats-grid">
      <div class="stat-card total">
        <h2>{{ totalIncidents }}</h2>
        <p>Total Incidents</p>
      </div>
      <div class="stat-card active">
        <h2>{{ activeIncidents }}</h2>
        <p>Active Incidents</p>
      </div>
      <div class="stat-card resolved">
        <h2>{{ resolvedIncidents }}</h2>
        <p>Resolved Incidents</p>
      </div>
      <div class="stat-card responders">
        <h2>{{ availableResponders }}</h2>
        <p>Available Responders</p>
      </div>
    </div>

    <!-- 📈 Recent Incidents Table -->
    <div class="recent-table">
      <h3>🕒 Recent Incident Reports</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
            <th>Reported At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="incident in recentIncidents" :key="incident.id">
            <td>{{ incident.id }}</td>
            <td>{{ incident.description }}</td>
            <td>{{ incident.location }}</td>
            <td>
              <span :class="['status', incident.status.toLowerCase()]">{{ incident.status }}</span>
            </td>
            <td>{{ incident.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Mock data (replace with API calls later)
const totalIncidents = ref(125)
const activeIncidents = ref(8)
const resolvedIncidents = ref(110)
const availableResponders = ref(15)

const recentIncidents = ref([
  { id: 1, description: 'Fire at Barangay 5', location: 'Santiago City', status: 'Active', date: 'Nov 3, 2025' },
  { id: 2, description: 'Road Accident', location: 'Roxas, Isabela', status: 'Resolved', date: 'Nov 2, 2025' },
  { id: 3, description: 'Flooded Area', location: 'Cauayan City', status: 'Active', date: 'Nov 2, 2025' },
  { id: 4, description: 'Medical Emergency', location: 'Ilagan City', status: 'Resolved', date: 'Nov 1, 2025' }
])
</script>

<style scoped>
.incident-page {
  padding: 30px;
  background-color: #f5f6fa;
  font-family: "Segoe UI", sans-serif;
}

.page-title {
  font-size: 26px;
  margin-bottom: 5px;
}

.subtitle {
  color: #666;
  margin-bottom: 25px;
}

/* ===== STAT CARDS ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h2 {
  font-size: 32px;
  margin: 0;
}

.stat-card p {
  color: #666;
  margin: 8px 0 0;
}

.stat-card.total { border-left: 6px solid #3498db; }
.stat-card.active { border-left: 6px solid #e67e22; }
.stat-card.resolved { border-left: 6px solid #2ecc71; }
.stat-card.responders { border-left: 6px solid #9b59b6; }

/* ===== TABLE ===== */
.recent-table {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.recent-table h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #2c3e50;
  color: white;
}

th, td {
  padding: 12px 15px;
  text-align: left;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* ===== STATUS TAGS ===== */
.status {
  padding: 5px 10px;
  border-radius: 8px;
  font-weight: bold;
  color: white;
}

.status.active { background-color: #e67e22; }
.status.resolved { background-color: #2ecc71; }
.status.pending { background-color: #f39c12; }
</style>
