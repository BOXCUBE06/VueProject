<template>
    <div class="min-h-screen flex bg-surface-0 dark:bg-surface-900">
        <Toast /> 
        
        <div class="hidden lg:flex w-6 bg-surface-900 align-items-center justify-content-center relative overflow-hidden px-8 py-6">
            <div class="absolute inset-0 bg-primary-500 opacity-10" style="background-image: radial-gradient(circle at center, var(--primary-400) 0%, transparent 70%);"></div>
            
            <div class="relative z-2 text-center">
                <div class="inline-flex align-items-center justify-content-center bg-primary-500 text-white border-round-2xl p-4 mb-5 shadow-lg">
                    <i class="pi pi-shield text-5xl"></i>
                </div>
                <h1 class="text-5xl font-bold text-black mb-3">iAlert Admin</h1>
                <p class="text-xl text-black-100 max-w-md mx-auto">
                    Secure Emergency Response & Incident Management System.
                </p>
            </div>
        </div>

        <div class="w-full lg:w-6 flex align-items-center justify-content-center p-6 sm:p-8">
            <div class="w-full max-w-md">
                
                <div class="lg:hidden text-center mb-6">
                    <i class="pi pi-shield text-primary-600 text-4xl mb-2"></i>
                    <h2 class="text-2xl font-bold text-900">iAlert Admin</h2>
                </div>

                <div class="mb-6">
                    <h2 class="text-3xl font-bold text-900 mb-2">Welcome back</h2>
                    <p class="text-500 text-lg">Please sign in to your account.</p>
                </div>

                <div class="flex flex-column gap-4">
                    <div class="flex flex-column gap-2">
                        <label for="email" class="font-medium text-900">Email</label>
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-envelope text-500" />
                            <InputText id="email" v-model="email" type="email" placeholder="admin@ialert.com" class="w-full" @keyup.enter="handleLogin" />
                        </IconField>
                    </div>

                    <div class="flex flex-column gap-2">
                        <label for="password" class="font-medium text-900">Password</label>
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-lock text-500" />
                            <InputText id="password" v-model="password" type="password" placeholder="••••••••" class="w-full" @keyup.enter="handleLogin" />
                        </IconField>
                    </div>

                    <div class="flex align-items-center justify-content-between">
                        <div class="flex align-items-center gap-2">
                            <Checkbox v-model="remember" inputId="remember" :binary="true" />
                            <label for="remember" class="text-900 cursor-pointer">Remember me</label>
                        </div>
                        <a href="#" class="text-primary-600 font-medium hover:text-primary-700 no-underline transition-colors">Forgot password?</a>
                    </div>

                    <Button label="Log In" icon="pi pi-sign-in" :loading="loading" @click="handleLogin" class="w-full py-3 text-lg font-bold mt-2 shadow-2" />
                </div>
                
                <p class="text-center text-500 mt-6">
                    Need help accessing the system? <br>
                    Contact IT Support.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Toast from 'primevue/toast';

const router = useRouter();
const toast = useToast();

const email = ref('');
const password = ref('');
const remember = ref(false);
const loading = ref(false);

const API_URL = 'http://127.0.0.1:8000/api'; 

const handleLogin = async () => {
    if (!email.value || !password.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all fields.', life: 3000 });
        return;
    }

    loading.value = true;

    try {
        const response = await axios.post(`${API_URL}/login`, {
            id: email.value, 
            password: password.value
        });

        const { token, role, user } = response.data;

        if (role !== 'admin') {
            toast.add({ severity: 'error', summary: 'Access Denied', detail: 'This portal is for Admins only.', life: 4000 });
            loading.value = false;
            return;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        toast.add({ severity: 'success', summary: 'Welcome', detail: `Hello, ${user.name}!`, life: 3000 });

        setTimeout(() => {
            router.push('/dashboard'); 
        }, 1000);

    } catch (error) {
        console.error('Login Error:', error);
        
        let msg = 'Login failed. Please check your credentials.';
        if (error.response && error.response.data && error.response.data.message) {
            msg = error.response.data.message;
        }

        toast.add({ severity: 'error', summary: 'Error', detail: msg, life: 4000 });
    } finally {
        loading.value = false;
    }
};
</script>