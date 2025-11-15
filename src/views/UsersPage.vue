<template>
  <div class="users-page">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <div>
          <h1 class="page-title">User Management</h1>
          <p class="page-subtitle">Manage students and emergency responders</p>
        </div>
        <button class="btn-add">
          <span class="plus-icon">+</span>
          Add New User
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card stat-primary">
        <div class="stat-icon-wrapper blue">
          <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Total Students</div>
          <div class="stat-value">{{ totalStudents }}</div>
          <div class="stat-change positive">
            <span class="arrow">↑</span> 12% from last month
          </div>
        </div>
      </div>

      <div class="stat-card stat-success">
        <div class="stat-icon-wrapper green">
          <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Total Responders</div>
          <div class="stat-value">{{ totalResponders }}</div>
          <div class="stat-change positive">
            <span class="arrow">↑</span> 3 new this week
          </div>
        </div>
      </div>

      <div class="stat-card stat-warning">
        <div class="stat-icon-wrapper purple">
          <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Active Users</div>
          <div class="stat-value">{{ activeUsers }}</div>
          <div class="stat-change neutral">
            Currently online
          </div>
        </div>
      </div>
    </div>

    <!-- Students Section -->
    <div class="table-section">
      <div class="section-header">
        <div class="section-title-wrapper">
          <h2 class="section-title">Students</h2>
          <span class="section-count">{{ students.length }} total</span>
        </div>
        <div class="section-actions">
          <div class="search-box">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search students..." v-model="studentSearch" />
          </div>
          <button class="btn-filter">
            <svg class="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div class="modern-table">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" class="checkbox" />
              </th>
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
            <tr v-for="student in paginatedStudents" :key="student.id" class="table-row">
              <td>
                <input type="checkbox" class="checkbox" />
              </td>
              <td>
                <div class="user-cell">
                  <div class="avatar" :style="{ backgroundColor: student.color }">
                    {{ student.initials }}
                  </div>
                  <div class="user-info">
                    <div class="user-name">{{ student.name }}</div>
                    <div class="user-email">{{ student.email }}</div>
                  </div>
                </div>
              </td>
              <td><span class="id-badge">{{ student.studentId }}</span></td>
              <td>{{ student.department }}</td>
              <td>{{ student.yearLevel }}</td>
              <td>{{ student.contact }}</td>
              <td>
                <span :class="['status-badge', student.status]">
                  <span class="status-dot"></span>
                  {{ student.status }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="btn-action" title="View">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button class="btn-action" title="Edit">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="btn-action danger" title="Delete">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button class="pagination-btn" @click="studentPage--" :disabled="studentPage === 1">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <div class="pagination-numbers">
          <button 
            v-for="page in totalStudentPages" 
            :key="page"
            :class="['pagination-number', { active: page === studentPage }]"
            @click="studentPage = page"
          >
            {{ page }}
          </button>
        </div>
        <button class="pagination-btn" @click="studentPage++" :disabled="studentPage === totalStudentPages">
          Next
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Responders Section -->
    <div class="table-section">
      <div class="section-header">
        <div class="section-title-wrapper">
          <h2 class="section-title">Emergency Responders</h2>
          <span class="section-count">{{ responders.length }} total</span>
        </div>
        <div class="section-actions">
          <div class="search-box">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search responders..." v-model="responderSearch" />
          </div>
          <button class="btn-filter">
            <svg class="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div class="modern-table">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" class="checkbox" />
              </th>
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
            <tr v-for="responder in paginatedResponders" :key="responder.id" class="table-row">
              <td>
                <input type="checkbox" class="checkbox" />
              </td>
              <td>
                <div class="user-cell">
                  <div class="avatar" :style="{ backgroundColor: responder.color }">
                    {{ responder.initials }}
                  </div>
                  <div class="user-info">
                    <div class="user-name">{{ responder.name }}</div>
                    <div class="user-email">{{ responder.email }}</div>
                  </div>
                </div>
              </td>
              <td><span class="id-badge badge-responder">{{ responder.badgeId }}</span></td>
              <td>
                <span class="role-badge">{{ responder.role }}</span>
              </td>
              <td>{{ responder.specialization }}</td>
              <td>{{ responder.contact }}</td>
              <td>
                <span :class="['status-badge', responder.status]">
                  <span class="status-dot"></span>
                  {{ responder.status }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="btn-action" title="View">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button class="btn-action" title="Edit">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="btn-action danger" title="Delete">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button class="pagination-btn" @click="responderPage--" :disabled="responderPage === 1">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <div class="pagination-numbers">
          <button 
            v-for="page in totalResponderPages" 
            :key="page"
            :class="['pagination-number', { active: page === responderPage }]"
            @click="responderPage = page"
          >
            {{ page }}
          </button>
        </div>
        <button class="pagination-btn" @click="responderPage++" :disabled="responderPage === totalResponderPages">
          Next
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
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
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.users-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Header */
.page-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.page-subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

.btn-add {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

.plus-icon {
  font-size: 1.25rem;
  font-weight: 700;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: white;
  border-radius: 1.25rem;
  padding: 1.75rem;
  display: flex;
  gap: 1.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
}

.stat-card.stat-success::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

.stat-card.stat-warning::before {
  background: linear-gradient(90deg, #8b5cf6, #a855f7);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.1);
}

.stat-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-wrapper.blue {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
}

.stat-icon-wrapper.green {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #047857;
}

.stat-icon-wrapper.purple {
  background: linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%);
  color: #7c3aed;
}

.stat-icon {
  width: 28px;
  height: 28px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-change {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.neutral {
  color: #64748b;
}

.arrow {
  font-weight: 700;
}

/* Table Section */
.table-section {
  background: white;
  border-radius: 1.25rem;
  padding: 1.75rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.section-count {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.section-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 18px;
  height: 18px;
  color: #94a3b8;
}

.search-box input {
  padding: 0.625rem 1rem 0.625rem 2.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  width: 280px;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.search-box input:focus {
  outline: none;
  border-color: #6366f1;
  background: white;
}

.btn-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-filter:hover {
  border-color: #cbd5e1;
  background: white;
}

.filter-icon {
  width: 16px;
  height: 16px;
}

/* Modern Table */
.modern-table {
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f8fafc;
}

thead th {
  padding: 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #e2e8f0;
}

tbody tr {
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
}

tbody tr:hover {
  background: #f8fafc;
}

tbody td {
  padding: 1rem;
  font-size: 0.875rem;
  color: #334155;
}

.checkbox {
  width: 18px;
  height: 18px;
  border-radius: 0.375rem;
  border: 2px solid #cbd5e1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkbox:checked {
  background: #6366f1;
  border-color: #6366f1;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.user-name {
  font-weight: 600;
  color: #0f172a;
}

.user-email {
  font-size: 0.8rem;
  color: #94a3b8;
}

.id-badge {
  background: #f1f5f9;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.8rem;
  color: #475569;
  font-family: 'Courier New', monospace;
}

.badge-responder {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
}

.role-badge {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
  padding: 0.375rem 0.875rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.8rem;
  display: inline-block;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: capitalize;
}

.status-badge.active {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.inactive {
  background: #f1f5f9;
  color: #475569;
}

.status-badge.available {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.busy {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.on-route {
  background: #fef3c7;
  color: #92400e;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  width: 32px;
  height: 32px;
  border: none;
  background: #f1f5f9;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
}

.btn-action:hover {
  background: #e2e8f0;
  color: #334155;
  transform: translateY(-2px);
}

.btn-action.danger:hover {
  background: #fee2e2;
  color: #dc2626;
}

.btn-action svg {
  width: 16px;
  height: 16px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.125rem;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #6366f1;
  color: #6366f1;
  background: #f8fafc;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn svg {
  width: 16px;
  height: 16px;
}

.pagination-numbers {
  display: flex;
  gap: 0.5rem;
}

.pagination-number {
  width: 36px;
  height: 36px;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-number:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.pagination-number.active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-color: #6366f1;
  color: white;
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
  
  .search-box input {
    width: 220px;
  }
}

@media (max-width: 768px) {
  .users-page {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .section-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .search-box input {
    width: 100%;
  }
  
  .btn-filter {
    width: 100%;
    justify-content: center;
  }
  
  .pagination {
    flex-direction: column;
    gap: 1rem;
  }
  
  .modern-table {
    font-size: 0.8rem;
  }
  
  tbody td {
    padding: 0.75rem 0.5rem;
  }
  
  .avatar {
    width: 36px;
    height: 36px;
    font-size: 0.75rem;
  }
}
</style>