import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/incidents',
    name: 'incidents',
    component: () => import('../views/IncidentPage.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/MapPage.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/UsersPage.vue')
  },
  {
    path: '/logs',
    name: 'logs',
    component: () => import('../views/LogsPage.vue')
  },
  // Added Login Route so you can test the "No Sidebar" layout
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
    meta: { layout: 'empty' } // This tells App.vue to hide the sidebar
  }
]

const router = createRouter({
  // If you are using Vite, use import.meta.env.BASE_URL
  // If you are using Webpack/Vue CLI, keep process.env.BASE_URL
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router