<template>
    <div class="flex h-screen surface-ground">
        
        <aside 
            class="surface-card border-right-1 surface-border flex flex-column flex-shrink-0 transition-all transition-duration-200 overflow-hidden"
            :class="[isSidebarVisible ? 'w-18rem' : 'w-5rem']"
        >
            <div class="h-4rem flex align-items-center px-3 border-bottom-1 surface-border" :class="{'justify-content-center': !isSidebarVisible}">
                <i class="pi pi-shield text-red-600 text-3xl"></i>
                <span v-if="isSidebarVisible" class="text-xl font-bold text-900 ml-2 white-space-nowrap">iAlert</span>
            </div>

            <div class="flex-1 overflow-y-auto py-3 px-2">
                <template v-for="item in items" :key="item.label">
                    
                    <router-link 
                        v-if="item.action !== 'logout'"
                        :to="item.route"
                        class="flex align-items-center p-3 border-round cursor-pointer transition-colors transition-duration-150 text-700 hover:surface-100 mb-1 no-underline"
                        :class="{'justify-content-center': !isSidebarVisible, 'surface-100 text-primary font-bold': $route.path === item.route}"
                        :title="!isSidebarVisible ? item.label : ''"
                    >
                        <i :class="[item.icon, 'text-xl']"></i>
                        <span v-if="isSidebarVisible" class="font-medium ml-3 white-space-nowrap">{{ item.label }}</span>
                    </router-link>

                    <div 
                        v-else
                        @click="handleLogout"
                        class="flex align-items-center p-3 border-round cursor-pointer transition-colors transition-duration-150 text-red-600 hover:bg-red-50 mb-1"
                        :class="{'justify-content-center': !isSidebarVisible}"
                        :title="!isSidebarVisible ? item.label : ''"
                    >
                        <i :class="[item.icon, 'text-xl']"></i>
                        <span v-if="isSidebarVisible" class="font-medium ml-3 white-space-nowrap">{{ item.label }}</span>
                    </div>

                </template>
            </div>
            
            <div v-if="isSidebarVisible" class="p-3 text-center text-500 text-xs white-space-nowrap">
                v1.0.0 Admin Panel
            </div>
        </aside>

        <div class="flex-1 flex flex-column min-w-0">
            <header class="h-4rem surface-card border-bottom-1 surface-border flex align-items-center justify-content-between px-3 shadow-1 z-2">
                <div class="flex align-items-center gap-3">
                    <Button icon="pi pi-bars" text rounded @click="isSidebarVisible = !isSidebarVisible" />
                    <div class="flex flex-column">
                        <span class="text-lg font-bold text-900">Welcome, {{ adminName }}</span> </div>
                </div>
                <div class="flex align-items-center gap-3">
                    <Button text rounded severity="secondary" class="relative p-2">
                        <i class="pi pi-bell text-xl text-600"></i>
                        <span class="absolute top-0 right-0 w-1rem h-1rem bg-red-500 border-circle border-2 surface-card"></span>
                    </Button>
                    <div class="h-2rem w-1px surface-300 mx-2"></div>
                    <div class="flex align-items-center gap-2 cursor-pointer hover:surface-100 p-2 border-round">
                        <Avatar :label="adminInitials" shape="circle" class="bg-primary-100 text-primary-700" />
                        <div class="hidden md:block text-right">
                            <p class="text-sm font-semibold text-900 m-0">Administrator</p>
                        </div>
                    </div>
                </div>
            </header>

            <main class="flex-1 overflow-y-auto bg-surface-5 p-3">
                <router-view /> </main>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';

const router = useRouter();
const isSidebarVisible = ref(true);

const items = ref([
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' }, // Fixed route
    { label: 'Live Map', icon: 'pi pi-map', route: '/map' },
    { label: 'User Management', icon: 'pi pi-users', route: '/users' },
    { label: 'System Logs', icon: 'pi pi-list', route: '/logs' },
    { label: 'Logout', icon: 'pi pi-sign-out', action: 'logout' } // Added 'action' property
]);

// --- Dynamic Admin Name ---
const user = JSON.parse(localStorage.getItem('user') || '{}');
const adminName = user.name || 'Admin';
const adminInitials = computed(() => adminName.substring(0, 2).toUpperCase());

// --- Logout Logic ---
const handleLogout = () => {
    // 1. Clear Storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // 2. Redirect
    router.push('/login');
};
</script>

<style scoped>
aside {
    transition: width 0.2s ease-in-out;
}
</style>