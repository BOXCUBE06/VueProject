<template>
  <div class="container-fluid py-4">
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-1">User Management</h2>
        <p class="text-muted mb-0">Manage students and emergency responders</p>
      </div>
      <button class="btn btn-primary">
        <i class="bi bi-plus-lg"></i> Add New User
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="bg-primary bg-opacity-10 rounded p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-people-fill text-primary" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                  </svg>
                </div>
              </div>
              <div class="ms-3">
                <h6 class="text-muted mb-1 small">Total Students</h6>
                <h3 class="mb-0 fw-bold">{{ totalStudents }}</h3>
                <small class="text-success"><i class="bi bi-arrow-up"></i> 12% from last month</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="bg-success bg-opacity-10 rounded p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-shield-check text-success" viewBox="0 0 16 16">
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56"/>
                    <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                  </svg>
                </div>
              </div>
              <div class="ms-3">
                <h6 class="text-muted mb-1 small">Total Responders</h6>
                <h3 class="mb-0 fw-bold">{{ totalResponders }}</h3>
                <small class="text-success"><i class="bi bi-arrow-up"></i> 3 new this week</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="bg-warning bg-opacity-10 rounded p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-broadcast text-warning" viewBox="0 0 16 16">
                    <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
                  </svg>
                </div>
              </div>
              <div class="ms-3">
                <h6 class="text-muted mb-1 small">Active Users</h6>
                <h3 class="mb-0 fw-bold">{{ activeUsers }}</h3>
                <small class="text-muted">Currently online</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Students Section -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-header bg-white border-bottom">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h5 class="mb-0 fw-bold">Students</h5>
            <small class="text-muted">{{ students.length }} total</small>
          </div>
          <div class="d-flex gap-2">
            <div class="input-group" style="width: 300px;">
              <span class="input-group-text bg-light border-end-0">
                <i class="bi bi-search"></i>
              </span>
              <input type="text" class="form-control border-start-0" placeholder="Search students..." v-model="studentSearch">
            </div>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-funnel"></i> Filter
            </button>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th><input type="checkbox" class="form-check-input"></th>
                <th>Student</th>
                <th>Student ID</th>
                <th>Department</th>
                <th>Year Level</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in paginatedStudents" :key="student.id">
                <td><input type="checkbox" class="form-check-input"></td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white" 
                         :style="{ backgroundColor: student.color, width: '40px', height: '40px' }">
                      {{ student.initials }}
                    </div>
                    <div class="ms-3">
                      <div class="fw-semibold">{{ student.name }}</div>
                      <small class="text-muted">{{ student.email }}</small>
                    </div>
                  </div>
                </td>
                <td><span class="badge bg-light text-dark">{{ student.studentId }}</span></td>
                <td>{{ student.department }}</td>
                <td>{{ student.yearLevel }}</td>
                <td>{{ student.contact }}</td>
                <td>
                  <span :class="student.status === 'active' ? 'badge bg-success' : 'badge bg-secondary'">
                    {{ student.status }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" title="View">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-secondary" title="Edit">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger" title="Delete">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="p-3 border-top">
          <nav>
            <ul class="pagination justify-content-end mb-0">
              <li class="page-item" :class="{ disabled: studentPage === 1 }">
                <button class="page-link" @click="studentPage--" :disabled="studentPage === 1">Previous</button>
              </li>
              <li class="page-item" v-for="page in totalStudentPages" :key="page" :class="{ active: page === studentPage }">
                <button class="page-link" @click="studentPage = page">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: studentPage === totalStudentPages }">
                <button class="page-link" @click="studentPage++" :disabled="studentPage === totalStudentPages">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Responders Section -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-bottom">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h5 class="mb-0 fw-bold">Emergency Responders</h5>
            <small class="text-muted">{{ responders.length }} total</small>
          </div>
          <div class="d-flex gap-2">
            <div class="input-group" style="width: 300px;">
              <span class="input-group-text bg-light border-end-0">
                <i class="bi bi-search"></i>
              </span>
              <input type="text" class="form-control border-start-0" placeholder="Search responders..." v-model="responderSearch">
            </div>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-funnel"></i> Filter
            </button>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th><input type="checkbox" class="form-check-input"></th>
                <th>Responder</th>
                <th>Badge ID</th>
                <th>Role</th>
                <th>Specialization</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="responder in paginatedResponders" :key="responder.id">
                <td><input type="checkbox" class="form-check-input"></td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white" 
                         :style="{ backgroundColor: responder.color, width: '40px', height: '40px' }">
                      {{ responder.initials }}
                    </div>
                    <div class="ms-3">
                      <div class="fw-semibold">{{ responder.name }}</div>
                      <small class="text-muted">{{ responder.email }}</small>
                    </div>
                  </div>
                </td>
                <td><span class="badge bg-danger bg-opacity-25 text-danger">{{ responder.badgeId }}</span></td>
                <td><span class="badge bg-primary">{{ responder.role }}</span></td>
                <td>{{ responder.specialization }}</td>
                <td>{{ responder.contact }}</td>
                <td>
                  <span :class="getResponderStatusClass(responder.status)">
                    {{ responder.status }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" title="View">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-secondary" title="Edit">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger" title="Delete">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="p-3 border-top">
          <nav>
            <ul class="pagination justify-content-end mb-0">
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

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Search filters
const studentSearch = ref('')
const responderSearch = ref('')

// Pagination
const studentPage = ref(1)
const responderPage = ref(1)
const itemsPerPage = 5

// Stats
const totalStudents = ref(1247)
const totalResponders = ref(42)
const activeUsers = ref(89)

// Students data
const students = ref([
  { id: 1, name: 'Maria Santos', email: 'maria.santos@isu.edu', studentId: '2021-0145', department: 'CCSICT', yearLevel: '3rd Year', contact: '+63 912 345 6789', status: 'active', initials: 'MS', color: '#6366f1' },
  { id: 2, name: 'Juan Dela Cruz', email: 'juan.delacruz@isu.edu', studentId: '2020-0234', department: 'Engineering', yearLevel: '4th Year', contact: '+63 923 456 7890', status: 'active', initials: 'JD', color: '#8b5cf6' },
  { id: 3, name: 'Ana Reyes', email: 'ana.reyes@isu.edu', studentId: '2022-0087', department: 'Education', yearLevel: '2nd Year', contact: '+63 934 567 8901', status: 'inactive', initials: 'AR', color: '#ec4899' },
  { id: 4, name: 'Pedro Garcia', email: 'pedro.garcia@isu.edu', studentId: '2021-0298', department: 'CCSICT', yearLevel: '3rd Year', contact: '+63 945 678 9012', status: 'active', initials: 'PG', color: '#14b8a6' },
  { id: 5, name: 'Sofia Lopez', email: 'sofia.lopez@isu.edu', studentId: '2020-0156', department: 'Business', yearLevel: '4th Year', contact: '+63 956 789 0123', status: 'active', initials: 'SL', color: '#f59e0b' },
  { id: 6, name: 'Miguel Torres', email: 'miguel.torres@isu.edu', studentId: '2022-0412', department: 'Engineering', yearLevel: '2nd Year', contact: '+63 967 890 1234', status: 'active', initials: 'MT', color: '#3b82f6' },
  { id: 7, name: 'Isabella Cruz', email: 'isabella.cruz@isu.edu', studentId: '2021-0523', department: 'Arts', yearLevel: '3rd Year', contact: '+63 978 901 2345', status: 'inactive', initials: 'IC', color: '#ef4444' },
])

// Responders data
const responders = ref([
  { id: 1, name: 'Officer Ramon Santos', email: 'r.santos@isu.gov', badgeId: 'FR-2145', role: 'Fire Chief', specialization: 'Fire Response', contact: '+63 912 111 2222', status: 'available', initials: 'RS', color: '#dc2626' },
  { id: 2, name: 'Dr. Elena Martinez', email: 'e.martinez@isu.gov', badgeId: 'MD-3287', role: 'Medical Officer', specialization: 'Emergency Medicine', contact: '+63 923 222 3333', status: 'busy', initials: 'EM', color: '#059669' },
  { id: 3, name: 'Officer Carlos Reyes', email: 'c.reyes@isu.gov', badgeId: 'PO-4521', role: 'Police Officer', specialization: 'Security', contact: '+63 934 333 4444', status: 'available', initials: 'CR', color: '#1e40af' },
  { id: 4, name: 'Nurse Patricia Gomez', email: 'p.gomez@isu.gov', badgeId: 'RN-5673', role: 'Nurse', specialization: 'First Aid', contact: '+63 945 444 5555', status: 'on-route', initials: 'PG', color: '#7c3aed' },
  { id: 5, name: 'Engineer Mark Lopez', email: 'm.lopez@isu.gov', badgeId: 'EN-6789', role: 'Safety Engineer', specialization: 'Structural Safety', contact: '+63 956 555 6666', status: 'available', initials: 'ML', color: '#ea580c' },
  { id: 6, name: 'Officer Lisa Tan', email: 'l.tan@isu.gov', badgeId: 'FR-7891', role: 'Firefighter', specialization: 'Rescue Operations', contact: '+63 967 666 7777', status: 'busy', initials: 'LT', color: '#dc2626' },
])

// Computed
const totalStudentPages = computed(() => Math.ceil(students.value.length / itemsPerPage))
const totalResponderPages = computed(() => Math.ceil(responders.value.length / itemsPerPage))

const paginatedStudents = computed(() => {
  const start = (studentPage.value - 1) * itemsPerPage
  return students.value.slice(start, start + itemsPerPage)
})

const paginatedResponders = computed(() => {
  const start = (responderPage.value - 1) * itemsPerPage
  return responders.value.slice(start, start + itemsPerPage)
})

// Helper function
const getResponderStatusClass = (status) => {
  if (status === 'available') return 'badge bg-success'
  if (status === 'busy') return 'badge bg-danger'
  if (status === 'on-route') return 'badge bg-warning text-dark'
  return 'badge bg-secondary'
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');

.card {
  border-radius: 10px;
}

.page-link {
  cursor: pointer;
}
</style>