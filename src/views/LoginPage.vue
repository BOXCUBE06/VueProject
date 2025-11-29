<script setup>
/* eslint-disable no-undef */
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const email = ref('');
const password = ref('');
const remember = ref(false);

const handleLogin = () => {
    // We will add API logic here later
    console.log('Login attempt:', email.value, password.value);
};
</script>

<template>
    <div class="min-h-screen flex bg-surface-0 dark:bg-surface-900">
        
        <div class="hidden lg:flex w-6 bg-surface-900 align-items-center justify-content-center relative overflow-hidden px-8 py-6">
            <div class="absolute inset-0 bg-primary-500 opacity-10" style="background-image: radial-gradient(circle at center, var(--primary-400) 0%, transparent 70%);"></div>
            
            <div class="relative z-2 text-center">
                <div class="inline-flex align-items-center justify-content-center bg-primary-500 text-white border-round-2xl p-4 mb-5 shadow-lg">
                    <i class="pi pi-shield text-5xl"></i>
                </div>
                <h1 class="text-5xl font-bold text-white mb-3">iAlert Admin</h1>
                <p class="text-xl text-primary-100 max-w-md mx-auto">
                    Secure Emergency Response & Incident Management System.
                </p>
            </div>
        </div>

        <div class="w-full lg:w-6 flex align-items-center justify-content-center p-6 sm:p-8">
            <div class="w-full max-w-md">
                
                <div class="lg:hidden text-center mb-6">
                    <i class="pi pi-shield text-primary-600 text-4xl mb-2"></i>
                    <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-0">iAlert Admin</h2>
                </div>

                <div class="mb-6">
                    <h2 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">Welcome back</h2>
                    <p class="text-surface-500 dark:text-surface-400 text-lg">Please sign in to your account.</p>
                </div>

                <div class="flex flex-column gap-4">
                    <div class="flex flex-column gap-2">
                        <label for="email" class="font-medium text-surface-900 dark:text-surface-0">Email</label>
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-envelope text-surface-500" />
                            <InputText id="email" v-model="email" type="email" placeholder="admin@ialert.com" class="w-full py-3 px-3" />
                        </IconField>
                    </div>

                    <div class="flex flex-column gap-2">
                        <label for="password" class="font-medium text-surface-900 dark:text-surface-0">Password</label>
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-lock text-surface-500" />
                            <InputText id="password" v-model="password" type="password" placeholder="••••••••" class="w-full py-3 px-3" />
                        </IconField>
                    </div>

                    <div class="flex align-items-center justify-content-between">
                        <div class="flex align-items-center gap-2">
                            <Checkbox v-model="remember" inputId="remember" :binary="true" />
                            <label for="remember" class="text-surface-900 dark:text-surface-0 cursor-pointer">Remember me</label>
                        </div>
                        <a href="#" class="text-primary-600 font-medium hover:text-primary-700 no-underline transition-colors">Forgot password?</a>
                    </div>

                    <Button label="Sign In" icon="pi pi-sign-in" @click="handleLogin" class="w-full py-3 text-lg font-bold mt-2 shadow-2" />
                </div>
                
                <p class="text-center text-surface-500 dark:text-surface-400 mt-6">
                    Need help accessing the system? <br>
                    Contact IT Support.
                </p>
            </div>
        </div>
    </div>
</template>