import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/today',
      name: 'today',
      component: () => import('../views/TodayView.vue')
    },
    {
      path: '/week',
      name: 'week',
      component: () => import('../views/WeekView.vue')
    },
    {
      path: '/month',
      name: 'month',
      component: () => import('../views/MonthView.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/HIstoryView.vue')
    },
  ],
})

export default router
