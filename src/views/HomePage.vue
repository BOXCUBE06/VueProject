<template>
  <div class="container-fluid py-4">
    <!-- Page Title -->
    <div class="mb-4">
      <h2 class="fw-bold">iAlert Admin Dashboard</h2>
      <p class="text-muted">Monitor incidents, responders, and system activity</p>
    </div>

    <!-- Summary Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-2 col-sm-6" v-for="(card, index) in summaryCards" :key="index">
        <div class="card text-center shadow-sm border-0">
          <div class="card-body">
            <h6 class="text-uppercase fw-bold text-muted small">{{ card.title }}</h6>
            <h3 class="fw-bold text-primary">{{ card.value }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
<div class="row g-3 mb-4">
  <!-- Pie Chart -->
  <div class="col-lg-4 col-md-12">
    <div class="card shadow-sm border-0 h-100 d-flex flex-column align-items-center justify-content-center">
      <div class="card-header bg-success text-white fw-bold w-100 text-center">
        Incident Priority Breakdown
      </div>
      <div class="card-body d-flex justify-content-center align-items-center">
        <canvas id="priorityChart" style="max-width: 320px; max-height: 220px;"></canvas>
      </div>
    </div>
  </div>

  <!-- Line Chart -->
  <div class="col-lg-8 col-md-12">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-header bg-warning text-dark fw-bold w-100 text-center">
        Reports Over Time
      </div>
      <div class="card-body">
        <canvas id="reportsChart" style="max-height: 320px;"></canvas>
      </div>
    </div>
  </div>
</div>


    <!-- Recent Incidents Table -->
    <div class="card shadow-sm border-0 mb-4">
      <div class="card-header bg-dark text-white fw-bold">Recent Incident Reports</div>
      <div class="card-body table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-secondary">
            <tr>
              <th>ID</th>
              <th>Reporter</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="incident in paginatedIncidents" :key="incident.id">
              <td>{{ incident.id }}</td>
              <td>{{ incident.reporter }}</td>
              <td>{{ incident.type }}</td>
              <td>
                <span :class="priorityClass(incident.priority)" class="badge">{{ incident.priority }}</span>
              </td>
              <td>
                <span :class="statusClass(incident.status)" class="badge">{{ incident.status }}</span>
              </td>
              <td>{{ incident.date }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <nav>
          <ul class="pagination justify-content-end">
            <li class="page-item" :class="{ disabled: incidentPage === 1 }">
              <button class="page-link" @click="incidentPage--" :disabled="incidentPage === 1">Previous</button>
            </li>
            <li class="page-item" v-for="page in totalIncidentPages" :key="page" :class="{ active: page === incidentPage }">
              <button class="page-link" @click="incidentPage = page">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: incidentPage === totalIncidentPages }">
              <button class="page-link" @click="incidentPage++" :disabled="incidentPage === totalIncidentPages">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Responders & Notifications -->
    <div class="row g-3">
      <!-- Responders -->
      <div class="col-md-6">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-header bg-info text-white fw-bold">Active Responders</div>
          <div class="card-body table-responsive">
            <table class="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="responder in paginatedResponders" :key="responder.name">
                  <td>{{ responder.name }}</td>
                  <td>{{ responder.role }}</td>
                  <td>
                    <span :class="responderStatus(responder.status)" class="badge">{{ responder.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Pagination -->
            <nav>
              <ul class="pagination justify-content-end">
                <li class="page-item" :class="{ disabled: responderPage === 1 }">
                  <button class="page-link" @click="responderPage--" :disabled="responderPage === 1">Previous</button>
                </li>
                <li class="page-item" v-for="page in totalResponderPages" :key="page" :class="{ active: page === responderPage }">
                  <button class="page-link" @click="responderPage = page">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: responderPage === totalResponderPages }">
                  <button class="page-link" @click="responderPage++" :disabled="responderPage === totalResponderPages">Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="col-md-6">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-header bg-danger text-white fw-bold">Recent Notifications</div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li v-for="notif in paginatedNotifications" :key="notif.message" class="list-group-item">
                🔔 {{ notif.message }}
                <small class="text-muted float-end">{{ notif.time }}</small>
              </li>
            </ul>

            <!-- Pagination -->
            <nav>
              <ul class="pagination justify-content-end mt-2">
                <li class="page-item" :class="{ disabled: notifPage === 1 }">
                  <button class="page-link" @click="notifPage--" :disabled="notifPage === 1">Previous</button>
                </li>
                <li class="page-item" v-for="page in totalNotifPages" :key="page" :class="{ active: page === notifPage }">
                  <button class="page-link" @click="notifPage = page">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: notifPage === totalNotifPages }">
                  <button class="page-link" @click="notifPage++" :disabled="notifPage === totalNotifPages">Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title
} from 'chart.js'

// Register chart.js components
Chart.register(
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title
)

// === Dashboard Data ===

// === Summary Cards ===
const summaryCards = ref([
  { title: 'Total Reports', value: 245 },
  { title: 'Pending', value: 37 },
  { title: 'Resolved', value: 198 },
  { title: 'Severe', value: 12 },
  { title: 'Active Responders', value: 8 },
])

// === Incident Reports ===
const recentIncidents = ref([
  { id: 101, reporter: 'John Dela Cruz', type: 'Fire', priority: 'Severe', status: 'Pending', date: '2025-11-01' },
  { id: 102, reporter: 'Maria Reyes', type: 'Flood', priority: 'Moderate', status: 'Resolved', date: '2025-10-30' },
])

const incidentPage = ref(1)
const itemsPerPage = 2
const totalIncidentPages = computed(() => Math.ceil(recentIncidents.value.length / itemsPerPage))
const paginatedIncidents = computed(() => {
  const start = (incidentPage.value - 1) * itemsPerPage
  return recentIncidents.value.slice(start, start + itemsPerPage)
})

// === Responders ===
const responders = ref([
  { name: 'Officer Santos', role: 'Fire Responder', status: 'Available' },
  { name: 'Staff Lopez', role: 'Medical', status: 'Busy' },
])

const responderPage = ref(1)
const totalResponderPages = computed(() => Math.ceil(responders.value.length / itemsPerPage))
const paginatedResponders = computed(() => {
  const start = (responderPage.value - 1) * itemsPerPage
  return responders.value.slice(start, start + itemsPerPage)
})

// === Notifications ===
const notifications = ref([
  { message: 'New severe fire reported near Main Building.', time: '2m ago' },
  { message: 'Incident #102 has been resolved by Team B.', time: '15m ago' },
])

const notifPage = ref(1)
const totalNotifPages = computed(() => Math.ceil(notifications.value.length / itemsPerPage))
const paginatedNotifications = computed(() => {
  const start = (notifPage.value - 1) * itemsPerPage
  return notifications.value.slice(start, start + itemsPerPage)
})

// === Styling Helpers ===
const priorityClass = (priority) => ({
  'bg-danger': priority === 'Severe',
  'bg-warning': priority === 'Moderate',
  'bg-success': priority === 'Mild'
})

const statusClass = (status) => ({
  'bg-secondary': status === 'Pending',
  'bg-primary': status === 'In Progress',
  'bg-success': status === 'Resolved'
})

const responderStatus = (status) => ({
  'bg-success': status === 'Available',
  'bg-danger': status === 'Busy',
  'bg-warning': status === 'En Route'
})

// === CHART INITIALIZATION ===
onMounted(() => {
  // === Pie Chart (Incident Priority Breakdown) ===
  const ctxPie = document.getElementById('priorityChart')
  new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: ['Severe', 'Moderate', 'Mild'],
      datasets: [{
        label: 'Incident Priority',
        data: [12, 25, 8], // Dummy data
        backgroundColor: ['#dc3545', '#ffc107', '#28a745'],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Incident Priority Distribution' }
      }
    }
  })

  // === Line Chart (Reports Over Time) ===
  const ctxLine = document.getElementById('reportsChart')
  new Chart(ctxLine, {
    type: 'line',
    data: {
      labels: ['July', 'August', 'September', 'October', 'November'],
      datasets: [{
        label: 'Reports per Month',
        data: [30, 45, 60, 40, 55], // Dummy data
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#007bff',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Number of Reports' }
        },
        x: {
          title: { display: true, text: 'Month' }
        }
      },
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  })
})
</script>


<style scoped>
.card {
  border-radius: 10px;
}
.badge {
  font-size: 0.8rem;
}
.page-link {
  cursor: pointer;
}
#incidentMap {
  width: 100%;
  z-index: 0;
}
.card-body canvas {
  width: 100% !important;
  height: auto !important;
  display: block;
  margin: 0 auto;
}

@media (max-width: 768px) {
  #priorityChart, #reportsChart {
    max-width: 250px !important;
    max-height: 180px !important;
  }
}

</style>