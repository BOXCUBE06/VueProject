<template>
    <div class="surface-card p-3 shadow-2 border-round flex justify-content-between align-items-center h-full">
        <div>
            <span class="block text-500 font-medium mb-3">{{ title }}</span>
            <div class="text-900 font-medium text-xl">{{ value }}</div>
            <div v-if="subtext" class="text-xs mt-2" :class="trendColor">
                <i :class="trendIcon"></i>
                <span class="ml-1">{{ subtext }}</span>
            </div>
        </div>
        <div class="flex align-items-center justify-content-center border-round" 
             style="width: 2.5rem; height: 2.5rem" 
             :class="iconBgColor">
            <i :class="[icon, 'text-xl', iconColor]"></i>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { computed } from 'vue';

const props = defineProps({
    title: String,
    value: [String, Number],
    subtext: String,
    icon: String,
    color: { type: String, default: 'blue' },
    trend: { type: String, default: 'neutral' }
});

// PrimeFlex colors (e.g., bg-blue-100, text-blue-500)
const iconBgColor = computed(() => `bg-${props.color}-100`);
const iconColor = computed(() => `text-${props.color}-500`);

const trendColor = computed(() => {
    if (props.trend === 'up') return 'text-green-500';
    if (props.trend === 'down') return 'text-red-500';
    return 'text-500';
});
const trendIcon = computed(() => {
    if (props.trend === 'up') return 'pi pi-arrow-up';
    if (props.trend === 'down') return 'pi pi-arrow-down';
    return '';
});
</script>