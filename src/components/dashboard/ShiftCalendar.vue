<template>
    <div class="h-full w-full calendar-wrapper">
        <FullCalendar :options="calendarOptions" />
    </div>
</template>

<script setup>
/* eslint-disable no-undef */
// FIXED: Removed 'ref' from the import list since we only use 'reactive'
import { reactive } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

const calendarOptions = reactive({
    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
    initialView: 'dayGridMonth',
    headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,listWeek' // Switch between Month view and List view
    },
    height: '100%', // Critical for filling the dashboard card
    selectable: true,
    editable: true,
    dayMaxEvents: true, // Allow "more" link when too many events
    
    // Custom Events Data (Responder Shifts)
    events: [
        { title: 'Alpha Team (Day)', start: new Date().toISOString().split('T')[0], color: '#3b82f6' },
        { title: 'Bravo Team (Night)', start: new Date().toISOString().split('T')[0], color: '#ef4444' },
        { title: 'Training', start: new Date(new Date().setDate(new Date().getDate() + 2)), color: '#f59e0b' },
        { title: 'Alpha Team (Day)', start: new Date(new Date().setDate(new Date().getDate() + 1)), color: '#3b82f6' },
        { title: 'System Maint.', start: new Date(new Date().setDate(new Date().getDate() + 5)), color: '#10b981' }
    ],

    // Click Handlers
    dateClick: (arg) => {
        console.log('Date clicked:', arg.dateStr);
    },
    eventClick: (arg) => {
        alert('Event: ' + arg.event.title);
    }
});
</script>

<style>
/* === CUSTOM STYLES TO MODERNIZE FULLCALENDAR === */

/* Remove default heavy borders */
.fc {
    font-family: var(--font-family);
    --fc-border-color: #e2e8f0;
    --fc-button-text-color: #475569;
    --fc-button-bg-color: white;
    --fc-button-border-color: #e2e8f0;
    --fc-button-hover-bg-color: #f8fafc;
    --fc-button-hover-border-color: #cbd5e1;
    --fc-button-active-bg-color: #e2e8f0;
    --fc-today-bg-color: #eff6ff;
}

/* Header Toolbar Styling */
.fc .fc-toolbar-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1e293b;
}

.fc .fc-button {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.4rem 0.8rem;
    box-shadow: none !important;
    text-transform: capitalize;
}

/* Day Headers (Mon, Tue...) */
.fc .fc-col-header-cell-cushion {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #64748b;
    padding: 8px 0;
}

/* Events Styling */
.fc-event {
    border: none;
    border-radius: 4px;
    font-size: 0.75rem;
    padding: 1px 4px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Day Cell Styling */
.fc-daygrid-day-number {
    font-size: 0.85rem;
    color: #334155;
    font-weight: 500;
    padding: 4px 8px;
}

/* List View Styling */
.fc-list-event-dot {
    border-width: 4px;
}
</style>