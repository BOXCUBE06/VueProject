<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        
        <div class="flex justify-content-between align-items-center mb-5">
            <div>
                <h2 class="text-3xl font-medium text-900 mb-2">User Management</h2>
                <div class="text-500">Manage students and emergency responders</div>
            </div>
            <Button label="Add New User" icon="pi pi-plus" class="p-button-primary" @click="openNewUserDialog" />
        </div>

        <div class="grid mb-5">
            <div class="col-12 md:col-4">
                <StatCard title="Total Students" :value="totalStudents" icon="pi pi-users" color="blue" trend="up" subtext="12% from last month" />
            </div>
            <div class="col-12 md:col-4">
                <StatCard title="Total Responders" :value="totalResponders" icon="pi pi-shield" color="green" trend="up" subtext="3 new this week" />
            </div>
            <div class="col-12 md:col-4">
                <StatCard title="Active Users" :value="activeUsers" icon="pi pi-wifi" color="orange" subtext="Currently online" />
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
                            <Avatar :label="slotProps.data.initials" class="mr-2" size="large" shape="circle" :style="{ 'background-color': slotProps.data.color, 'color': '#ffffff' }" />
                            <div><span class="font-medium block">{{ slotProps.data.name }}</span><span class="text-500 text-sm">{{ slotProps.data.email }}</span></div>
                        </div>
                    </template>
                </Column>
                <Column field="studentId" header="ID"><template #body="slotProps"><span class="surface-100 p-1 border-round text-sm font-medium">{{ slotProps.data.studentId }}</span></template></Column>
                <Column field="department" header="Department"></Column>
                <Column field="yearLevel" header="Year"></Column>
                <Column field="contact" header="Contact"></Column>
                <Column field="status" header="Status"><template #body="slotProps"><Tag :value="slotProps.data.status" :severity="slotProps.data.status === 'active' ? 'success' : 'secondary'" /></template></Column>
                <Column header="Actions" style="width: 120px"><template #body><div class="flex gap-2"><Button icon="pi pi-pencil" text rounded severity="secondary" /><Button icon="pi pi-trash" text rounded severity="danger" /></div></template></Column>
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
                            <Avatar :label="slotProps.data.initials" class="mr-2" size="large" shape="circle" :style="{ 'background-color': slotProps.data.color, 'color': '#ffffff' }" />
                            <div><span class="font-medium block">{{ slotProps.data.name }}</span><span class="text-500 text-sm">{{ slotProps.data.role }}</span></div>
                        </div>
                    </template>
                </Column>
                <Column field="badgeId" header="Badge ID"><template #body="slotProps"><span class="bg-red-50 text-red-600 px-2 py-1 border-round text-xs font-bold">{{ slotProps.data.badgeId }}</span></template></Column>
                <Column field="specialization" header="Specialization"></Column>
                <Column field="contact" header="Contact"></Column>
                <Column field="status" header="Status"><template #body="slotProps"><Tag :value="slotProps.data.status" :severity="getResponderSeverity(slotProps.data.status)" /></template></Column>
                <Column header="Actions" style="width: 120px"><template #body><div class="flex gap-2"><Button icon="pi pi-pencil" text rounded severity="secondary" /><Button icon="pi pi-trash" text rounded severity="danger" /></div></template></Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="newUserDialog" :style="{width: '600px'}" header="Add New User" :modal="true" class="p-fluid">
            
            <div class="px-2">
                <div class="field grid align-items-center mb-4">
                    <label for="userType" class="col-12 mb-2 md:col-4 md:mb-0 font-medium text-900">User Type</label>
                    <div class="col-12 md:col-8">
                        <Dropdown id="userType" v-model="newUser.type" :options="userTypes" optionLabel="label" optionValue="value" placeholder="Select User Type" class="w-full" />
                    </div>
                </div>

                <div class="surface-card p-4 border-round-lg border-1 surface-border mb-4">
                    <div class="text-500 font-medium mb-3 text-sm uppercase">Basic Information</div>
                    
                    <div class="field grid align-items-center">
                        <label for="name" class="col-12 mb-2 md:col-4 md:mb-0">Full Name</label>
                        <div class="col-12 md:col-8">
                            <InputText id="name" v-model.trim="newUser.name" required="true" autofocus :class="{'p-invalid': submitted && !newUser.name}" />
                            <small class="p-error block" v-if="submitted && !newUser.name">Name is required.</small>
                        </div>
                    </div>

                    <div class="field grid align-items-center">
                        <label for="email" class="col-12 mb-2 md:col-4 md:mb-0">Email Address</label>
                        <div class="col-12 md:col-8">
                            <InputText id="email" v-model.trim="newUser.email" />
                        </div>
                    </div>

                    <div class="field grid align-items-center">
                        <label for="contact" class="col-12 mb-2 md:col-4 md:mb-0">Contact Number</label>
                        <div class="col-12 md:col-8">
                            <InputText id="contact" v-model.trim="newUser.contact" placeholder="+63 9xx xxx xxxx" />
                        </div>
                    </div>
                </div>

                <div v-if="newUser.type === 'student'" class="surface-card p-4 border-round-lg border-1 surface-border">
                    <div class="text-500 font-medium mb-3 text-sm uppercase">Student Details</div>
                    
                    <div class="field grid align-items-center">
                        <label for="studentId" class="col-12 mb-2 md:col-4 md:mb-0">Student ID</label>
                        <div class="col-12 md:col-8">
                            <InputText id="studentId" v-model.trim="newUser.studentId" placeholder="2021-XXXX" />
                        </div>
                    </div>

                    <div class="field grid align-items-center">
                        <label for="department" class="col-12 mb-2 md:col-4 md:mb-0">Department</label>
                        <div class="col-12 md:col-8">
                            <Dropdown id="department" v-model="newUser.department" :options="departments" placeholder="Select Dept" class="w-full" />
                        </div>
                    </div>

                    <div class="field grid align-items-center">
                        <label for="yearLevel" class="col-12 mb-2 md:col-4 md:mb-0">Year Level</label>
                        <div class="col-12 md:col-8">
                            <Dropdown id="yearLevel" v-model="newUser.yearLevel" :options="yearLevels" placeholder="Select Year" class="w-full" />
                        </div>
                    </div>
                </div>

                <div v-if="newUser.type === 'responder'" class="surface-card p-4 border-round-lg border-1 surface-border">
                    <div class="text-500 font-medium mb-3 text-sm uppercase">Responder Details</div>
                    
                    <div class="field grid align-items-center">
                        <label for="badgeId" class="col-12 mb-2 md:col-4 md:mb-0">Badge ID</label>
                        <div class="col-12 md:col-8">
                            <InputText id="badgeId" v-model.trim="newUser.badgeId" placeholder="FR-123" />
                        </div>
                    </div>

                    <div class="field grid align-items-center">
                        <label for="role" class="col-12 mb-2 md:col-4 md:mb-0">Role</label>
                        <div class="col-12 md:col-8">
                            <Dropdown id="role" v-model="newUser.role" :options="responderRoles" placeholder="Select Role" class="w-full" />
                        </div>
                    </div>

                    <div class="field grid align-items-center">
                        <label for="specialization" class="col-12 mb-2 md:col-4 md:mb-0">Specialization</label>
                        <div class="col-12 md:col-8">
                            <InputText id="specialization" v-model.trim="newUser.specialization" placeholder="e.g. Fire Safety" />
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-content-end gap-2 pt-3">
                    <Button label="Cancel" icon="pi pi-times" text class="p-button-secondary" @click="hideDialog" />
                    <Button label="Save User" icon="pi pi-check" class="p-button-primary" @click="saveUser" />
                </div>
            </template>
        </Dialog>

    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import StatCard from '@/components/dashboard/StatCard.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';     
import Dropdown from 'primevue/dropdown'; 

const studentSearch = ref('');
const responderSearch = ref('');
const selectedStudents = ref([]);
const selectedResponders = ref([]);
const totalStudents = ref(1247);
const totalResponders = ref(42);
const activeUsers = ref(89);


const newUserDialog = ref(false);
const submitted = ref(false);

const newUser = reactive({
    type: 'student', 
    name: '',
    email: '',
    contact: '',
    // for student fields
    studentId: '',
    department: '',
    yearLevel: '',
    // for responder fields
    badgeId: '',
    role: '',
    specialization: ''
});

const userTypes = [
    { label: 'Student', value: 'student' },
    { label: 'Responder', value: 'responder' }
];

const departments = ['CCSICT', 'Engineering', 'Education', 'Business', 'Arts', 'Nursing'];
const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const responderRoles = ['Fire Chief', 'Police Officer', 'Medical Officer', 'Nurse', 'Safety Engineer', 'Volunteer'];

const openNewUserDialog = () => {
    newUser.name = '';
    newUser.email = '';
    newUser.contact = '';
    submitted.value = false;
    newUserDialog.value = true;
};

const hideDialog = () => {
    newUserDialog.value = false;
    submitted.value = false;
};

const saveUser = () => {
    submitted.value = true;

    if (newUser.name && newUser.email) {
        // Here you would normally call your API
        // axios.post('/api/users', newUser)...

        console.log('Saving User:', newUser);

        if (newUser.type === 'student') {
            students.value.unshift({
                id: Math.random(),
                name: newUser.name,
                email: newUser.email,
                studentId: newUser.studentId || 'N/A',
                department: newUser.department || 'N/A',
                yearLevel: newUser.yearLevel || 'N/A',
                contact: newUser.contact,
                status: 'active',
                initials: newUser.name.substring(0,2).toUpperCase(),
                color: '#6366f1'
            });
        } else {
            responders.value.unshift({
                id: Math.random(),
                name: newUser.name,
                email: newUser.email,
                badgeId: newUser.badgeId || 'N/A',
                role: newUser.role || 'N/A',
                specialization: newUser.specialization || 'General',
                contact: newUser.contact,
                status: 'available',
                initials: newUser.name.substring(0,2).toUpperCase(),
                color: '#ef4444'
            });
        }

        newUserDialog.value = false;
        newUser.name = ''; 
    }
};


const students = ref([
  { id: 1, name: 'Maria Santos', email: 'maria.santos@isu.edu', studentId: '2021-0145', department: 'CCSICT', yearLevel: '3rd Year', contact: '+63 912 345 6789', status: 'active', initials: 'MS', color: '#6366f1' },
  { id: 2, name: 'Juan Dela Cruz', email: 'juan.delacruz@isu.edu', studentId: '2020-0234', department: 'Engineering', yearLevel: '4th Year', contact: '+63 923 456 7890', status: 'active', initials: 'JD', color: '#8b5cf6' },
  { id: 3, name: 'Ana Reyes', email: 'ana.reyes@isu.edu', studentId: '2022-0087', department: 'Education', yearLevel: '2nd Year', contact: '+63 934 567 8901', status: 'inactive', initials: 'AR', color: '#ec4899' },
]);

const responders = ref([
  { id: 1, name: 'Off. Ramon Santos', email: 'r.santos@isu.gov', badgeId: 'FR-2145', role: 'Fire Chief', specialization: 'Fire Response', contact: '+63 912 111 2222', status: 'available', initials: 'RS', color: '#dc2626' },
  { id: 2, name: 'Dr. Elena Martinez', email: 'e.martinez@isu.gov', badgeId: 'MD-3287', role: 'Medical Officer', specialization: 'Emergency Medicine', contact: '+63 923 222 3333', status: 'busy', initials: 'EM', color: '#059669' },
]);

const getResponderSeverity = (status) => {
    if (status === 'available') return 'success';
    if (status === 'busy') return 'danger';
    if (status === 'on-route') return 'warn';
    return 'secondary';
};
</script>