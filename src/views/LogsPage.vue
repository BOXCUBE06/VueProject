<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        
        <div class="mb-5">
            <h2 class="text-3xl font-medium text-900 mb-2">System Audit Logs</h2>
            <div class="text-500">Track all system activities, security events, and data changes.</div>
        </div>

        <div class="surface-card shadow-2 border-round p-4">
            
            <div class="flex justify-content-between align-items-center mb-4">
                <span class="p-input-icon-left w-full md:w-20rem">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Search logs..." class="w-full" />
                </span>
                
                <div class="hidden md:flex gap-2">
                    <Button label="All" text size="small" :class="{'bg-primary-50': filterType === 'all'}" @click="filterType = 'all'" />
                    
                    <Button label="Users" icon="pi pi-user" text size="small" severity="info" :class="{'bg-blue-50': filterType === 'users'}" @click="filterType = 'users'" />
                    
                    <Button label="Alerts" icon="pi pi-bell" text size="small" severity="warning" :class="{'bg-orange-50': filterType === 'alerts'}" @click="filterType = 'alerts'" />
                </div>
            </div>

            <DataTable 
                :value="filteredLogs" 
                :filters="filters" 
                paginator 
                :rows="10" 
                responsiveLayout="scroll"
                stripedRows
                size="small"
                sortField="timestamp" 
                :sortOrder="-1"
            >
                <Column field="timestamp" header="Timestamp" sortable style="width: 200px">
                    <template #body="slotProps">
                        <span class="text-500 text-sm font-mono">{{ formatDate(slotProps.data.timestamp) }}</span>
                    </template>
                </Column>

                <Column field="action" header="Action" sortable style="width: 200px">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.action" :severity="getActionSeverity(slotProps.data.action)" />
                    </template>
                </Column>

                <Column field="user" header="User" sortable style="width: 250px">
                    <template #body="slotProps">
                        <div class="flex align-items-center gap-2">
                            <Avatar :label="slotProps.data.user[0]" shape="circle" size="small" :style="{ 'background-color': '#e0e7ff', 'color': '#3730a3' }" />
                            <div class="flex flex-column">
                                <span class="font-medium text-sm">{{ slotProps.data.user }}</span>
                                <span class="text-xs text-500">{{ slotProps.data.role }}</span>
                            </div>
                        </div>
                    </template>
                </Column>

                <Column field="details" header="Details">
                    <template #body="slotProps">
                        <span class="text-900">{{ slotProps.data.details }}</span>
                    </template>
                </Column>

            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import Avatar from 'primevue/avatar';
import { FilterMatchMode } from '@primevue/core/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const filterType = ref('all');

// dummy data only
const logs = ref([
    { id: 1, timestamp: '2025-12-03T14:30:00', action: 'LOGIN', user: 'Maria Santos', role: 'Student', details: 'User logged in via Mobile App' },
    { id: 2, timestamp: '2025-12-03T14:32:15', action: 'ALERT_CREATED', user: 'Maria Santos', role: 'Student', details: 'Created new Medical Alert (ID #1024)' },
    { id: 3, timestamp: '2025-12-03T14:32:20', action: 'AUTO_TRIGGER', user: 'System', role: 'Database', details: 'Trigger: Alert #1024 marked as PENDING' },
    { id: 4, timestamp: '2025-12-03T14:35:00', action: 'LOGIN', user: 'Off. Ramon', role: 'Responder', details: 'User logged in via Mobile App' },
    { id: 5, timestamp: '2025-12-03T14:35:45', action: 'ALERT_ACCEPTED', user: 'Off. Ramon', role: 'Responder', details: 'Accepted Alert #1024' },
    { id: 6, timestamp: '2025-12-03T15:00:00', action: 'LOGIN', user: 'Admin User', role: 'Admin', details: 'Admin logged in via Web Portal' },
    { id: 7, timestamp: '2025-12-03T15:05:22', action: 'USER_BANNED', user: 'Admin User', role: 'Admin', details: 'Updated status for user [John Doe] to BANNED' },
    { id: 8, timestamp: '2025-12-03T15:10:11', action: 'USER_CREATED', user: 'Admin User', role: 'Admin', details: 'Created new Responder account: Nurse Joy' },
    { id: 9, timestamp: '2025-12-03T15:45:00', action: 'ALERT_RESOLVED', user: 'Off. Ramon', role: 'Responder', details: 'Alert #1024 marked as RESOLVED' },
    { id: 10, timestamp: '2025-12-03T15:45:01', action: 'AUTO_LOG', user: 'System', role: 'Database', details: 'Trigger: Resolution Log saved for #1024' },
]);

const filteredLogs = computed(() => {
    if (filterType.value === 'users') {
        return logs.value.filter(l => 
            ['LOGIN', 'USER_CREATED', 'USER_BANNED', 'USER_UPDATED', 'USER_DELETED'].includes(l.action)
        );
    }
    if (filterType.value === 'alerts') {
        return logs.value.filter(l => 
            ['ALERT_CREATED', 'ALERT_ACCEPTED', 'ALERT_RESOLVED', 'AUTO_TRIGGER', 'AUTO_LOG'].includes(l.action)
        );
    }
    return logs.value;
});

const getActionSeverity = (action) => {
    switch (action) {
        case 'LOGIN': return 'info'; 
        case 'ALERT_CREATED': return 'warning'; 
        case 'ALERT_ACCEPTED': return 'info';
        case 'ALERT_RESOLVED': return 'success'; 
        case 'USER_CREATED': return 'success';
        case 'USER_BANNED': return 'danger'; 
        case 'AUTO_TRIGGER': return 'secondary'; 
        default: return 'info';
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });
};
</script>