<template>
    <div class="flex h-screen surface-ground">
        
        <aside class="w-18rem surface-card border-right-1 surface-border flex flex-column flex-shrink-0 transition-all transition-duration-200">
            
            <div class="h-4rem flex align-items-center px-4 border-bottom-1 surface-border">
                <i class="pi pi-shield text-red-600 text-2xl mr-2"></i>
                <span class="text-xl font-bold text-900">iAlert</span>
            </div>

            <div class="flex-1 overflow-y-auto py-3 px-2">
                <Menu :model="items" class="w-full border-none surface-overlay">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate, isActive }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate" 
                               class="flex align-items-center p-3 border-round cursor-pointer transition-colors transition-duration-150 p-ripple text-700 hover:surface-100"
                               :class="{ 'surface-100 text-primary font-bold': isActive }"
                            >
                                <span :class="[item.icon, 'text-lg mr-2']" />
                                <span class="font-medium">{{ item.label }}</span>
                            </a>
                        </router-link>
                    </template>
                </Menu>
            </div>
            
            <div class="p-3 text-center text-500 text-xs">
                v1.0.0 Admin Panel
            </div>
        </aside>

        <div class="flex-1 flex flex-column min-w-0">
            
            <header class="h-4rem surface-card border-bottom-1 surface-border flex align-items-center justify-content-between px-4 lg:px-6 shadow-1 z-2">
                
                <div class="flex flex-column">
                    <span class="text-lg font-bold text-900">Welcome, Admin</span>
                    <span class="text-xs text-500">Have a nice day at work!</span>
                </div>

                <div class="flex align-items-center gap-3">
                    
                    <Button text rounded severity="secondary" class="relative p-2">
                        <i class="pi pi-bell text-xl text-600"></i>
                        <span class="absolute top-0 right-0 w-1rem h-1rem bg-red-500 border-circle border-2 surface-card"></span>
                    </Button>

                    <div class="h-2rem w-1px surface-300 mx-2"></div>

                    <div class="flex align-items-center gap-2 cursor-pointer hover:surface-100 p-2 border-round transition-colors transition-duration-150">
                        <Avatar label="AD" shape="circle" class="bg-primary-100 text-primary-700" />
                        <div class="hidden md:block text-right">
                            <p class="text-sm font-semibold text-900 m-0">Administrator</p>
                            <p class="text-xs text-500 m-0">Super Admin</p>
                        </div>
                        <i class="pi pi-angle-down text-500 text-sm"></i>
                    </div>

                </div>
            </header>

            <main class="flex-1 overflow-y-auto bg-surface-50">
                <slot></slot>
            </main>

        </div>
    </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref } from 'vue';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';

const items = ref([
    { label: 'Dashboard', icon: 'pi pi-home', route: '/' },
    { label: 'Live Map', icon: 'pi pi-map', route: '/map' },
    { label: 'Incident Reports', icon: 'pi pi-exclamation-circle', route: '/incidents' },
    { label: 'User Management', icon: 'pi pi-users', route: '/users' },
    { label: 'System Logs', icon: 'pi pi-list', route: '/logs' },
    { separator: true },
    { label: 'Settings', icon: 'pi pi-cog', route: '/settings' },
    { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' }
]);
</script>

<style scoped>
/* Ensure the layout takes full height */
html, body {
    margin: 0;
    height: 100%;
    overflow: hidden;
}
</style>