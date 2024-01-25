// Composables
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/TheLogin.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/TheRegister.vue'),
      },
      {
        path: '/quotation',
        name: 'Quotation',
        component: () => import('@/views/TheQuotation.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API_BASE_URL),
  routes,
})

export default router
