import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const routes = [
  // 1. redirect
  {
    path: '/',
    redirect: '/login'
  },
  
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
    meta: { layout: 'empty' } // No Sidebar
  },

  // 3. dashboard)
  {
    path: '/dashboard', // Changed from '/' to '/dashboard'
    name: 'home',
    component: HomePage
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//  check if user is logged in
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if (to.path === '/login' && loggedIn) {
    return next('/dashboard');
  }

  next();
});

export default router