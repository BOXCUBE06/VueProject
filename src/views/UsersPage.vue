<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        
        <div class="flex justify-content-between align-items-center mb-5">
            <div>
                <h2 class="text-3xl font-medium text-900 mb-2">User Management</h2>
                <div class="text-500">Manage students and emergency responders</div>
            </div>
            <Button label="Add New User" icon="pi pi-plus" class="p-button-primary" />
        </div>

        <div class="grid mb-5">
            <div class="col-12 md:col-4">
                <StatCard 
                    title="Total Students" 
                    :value="totalStudents" 
                    icon="pi pi-users" 
                    color="blue" 
                    trend="up" 
                    subtext="12% from last month" 
                />
            </div>
            <div class="col-12 md:col-4">
                <StatCard 
                    title="Total Responders" 
                    :value="totalResponders" 
                    icon="pi pi-shield" 
                    color="green" 
                    trend="up" 
                    subtext="3 new this week" 
                />
            </div>
            <div class="col-12 md:col-4">
                <StatCard 
                    title="Active Users" 
                    :value="activeUsers" 
                    icon="pi pi-wifi" 
                    color="orange" 
                    subtext="Currently online" 
                />
            </div>
        </div>

        <div class="surface-card shadow-2 border-round p-4 mb-5">
            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4 gap-3">
                <span class="text-xl font-medium text-900">Students <span class="text-500 text-base">({{ students.length }} total)</span></span>
                <div class="p-input-icon-left w-full md:w-auto">
                    <i class="pi pi-search" />
                    <InputText v-model="studentSearch" placeholder="Search students..." class="w-full" />
                </div>
            </div>

            <DataTable :value="students" :paginator="true" :rows="5" v-model:selection="selectedStudents" selectionMode="multiple" dataKey="id" 
                       :globalFilterFields="['name', 'studentId', 'department']" responsiveLayout="scroll" size="small">
                
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                
                <Column field="name" header="Student" style="min-width: 200px">
                    <template #body="slotProps">
                        <div class="flex align-items-center">
                            <Avatar :label="slotProps.data.initials" class="mr-2" size="large" shape="circle" 
                                    :style="{ 'background-color': slotProps.data.color, 'color': '#ffffff' }" />
                            <div>
                                <span class="font-medium block">{{ slotProps.data.name }}</span>
                                <span class="text-500 text-sm">{{ slotProps.data.email }}</span>
                            </div>
                        </div>
                    </template>
                </Column>
                
                <Column field="studentId" header="ID">
                    <template #body="slotProps">
                        <span class="surface-100 p-1 border-round text-sm font-medium">{{ slotProps.data.studentId }}</span>
                    </template>
                </Column>
                
                <Column field="department" header="Department"></Column>
                <Column field="yearLevel" header="Year"></Column>
                <Column field="contact" header="Contact"></Column>
                
                <Column field="status" header="Status">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="slotProps.data.status === 'active' ? 'success' : 'secondary'" />
                    </template>
                </Column>

                <Column header="Actions" style="width: 120px">
                    <template #body>
                        <div class="flex gap-2">
                            <Button icon="pi pi-pencil" text rounded severity="secondary" />
                            <Button icon="pi pi-trash" text rounded severity="danger" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <div class="surface-card shadow-2 border-round p-4">
            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4 gap-3">
                <span class="text-xl font-medium text-900">Emergency Responders <span class="text-500 text-base">({{ responders.length }} total)</span></span>
                <div class="p-input-icon-left w-full md:w-auto">
                    <i class="pi pi-search" />
                    <InputText v-model="responderSearch" placeholder="Search responders..." class="w-full" />
                </div>
            </div>

            <DataTable :value="responders" :paginator="true" :rows="5" v-model:selection="selectedResponders" selectionMode="multiple" dataKey="id" responsiveLayout="scroll" size="small">
                
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                
                <Column field="name" header="Responder" style="min-width: 200px">
                    <template #body="slotProps">
                        <div class="flex align-items-center">
                            <Avatar :label="slotProps.data.initials" class="mr-2" size="large" shape="circle" 
                                    :style="{ 'background-color': slotProps.data.color, 'color': '#ffffff' }" />
                            <div>
                                <span class="font-medium block">{{ slotProps.data.name }}</span>
                                <span class="text-500 text-sm">{{ slotProps.data.role }}</span>
                            </div>
                        </div>
                    </template>
                </Column>
                
                <Column field="badgeId" header="Badge ID">
                    <template #body="slotProps">
                        <span class="bg-red-50 text-red-600 px-2 py-1 border-round text-xs font-bold">{{ slotProps.data.badgeId }}</span>
                    </template>
                </Column>

                <Column field="specialization" header="Specialization"></Column>
                <Column field="contact" header="Contact"></Column>

                <Column field="status" header="Status">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getResponderSeverity(slotProps.data.status)" />
                    </template>
                </Column>

                <Column header="Actions" style="width: 120px">
                    <template #body>
                        <div class="flex gap-2">
                            <Button icon="pi pi-pencil" text rounded severity="secondary" />
                            <Button icon="pi pi-trash" text rounded severity="danger" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

    </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref } from 'vue';
import StatCard from '@/components/dashboard/StatCard.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';

// --- State ---
const studentSearch = ref('');
const responderSearch = ref('');
const selectedStudents = ref([]);
const selectedResponders = ref([]);

const totalStudents = ref(1247);
const totalResponders = ref(42);
const activeUsers = ref(89);

// --- Data ---
const students = ref([
  { id: 1, name: 'Maria Santos', email: 'maria.santos@isu.edu', studentId: '2021-0145', department: 'CCSICT', yearLevel: '3rd Year', contact: '+63 912 345 6789', status: 'active', initials: 'MS', color: '#6366f1' },
  { id: 2, name: 'Juan Dela Cruz', email: 'juan.delacruz@isu.edu', studentId: '2020-0234', department: 'Engineering', yearLevel: '4th Year', contact: '+63 923 456 7890', status: 'active', initials: 'JD', color: '#8b5cf6' },
  { id: 3, name: 'Ana Reyes', email: 'ana.reyes@isu.edu', studentId: '2022-0087', department: 'Education', yearLevel: '2nd Year', contact: '+63 934 567 8901', status: 'inactive', initials: 'AR', color: '#ec4899' },
  { id: 4, name: 'Pedro Garcia', email: 'pedro.garcia@isu.edu', studentId: '2021-0298', department: 'CCSICT', yearLevel: '3rd Year', contact: '+63 945 678 9012', status: 'active', initials: 'PG', color: '#14b8a6' },
  { id: 5, name: 'Sofia Lopez', email: 'sofia.lopez@isu.edu', studentId: '2020-0156', department: 'Business', yearLevel: '4th Year', contact: '+63 956 789 0123', status: 'active', initials: 'SL', color: '#f59e0b' },
]);

const responders = ref([
  { id: 1, name: 'Off. Ramon Santos', email: 'r.santos@isu.gov', badgeId: 'FR-2145', role: 'Fire Chief', specialization: 'Fire Response', contact: '+63 912 111 2222', status: 'available', initials: 'RS', color: '#dc2626' },
  { id: 2, name: 'Dr. Elena Martinez', email: 'e.martinez@isu.gov', badgeId: 'MD-3287', role: 'Medical Officer', specialization: 'Emergency Medicine', contact: '+63 923 222 3333', status: 'busy', initials: 'EM', color: '#059669' },
  { id: 3, name: 'Off. Carlos Reyes', email: 'c.reyes@isu.gov', badgeId: 'PO-4521', role: 'Police Officer', specialization: 'Security', contact: '+63 934 333 4444', status: 'available', initials: 'CR', color: '#1e40af' },
  { id: 4, name: 'Nurse Patricia', email: 'p.gomez@isu.gov', badgeId: 'RN-5673', role: 'Nurse', specialization: 'First Aid', contact: '+63 945 444 5555', status: 'on-route', initials: 'PG', color: '#7c3aed' },
]);

// --- Helpers ---
const getResponderSeverity = (status) => {
    if (status === 'available') return 'success';
    if (status === 'busy') return 'danger';
    if (status === 'on-route') return 'warn';
    return 'secondary';
};
</script>