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
      path: '/notify',
      name: 'notify',
      component: () => import('../views/NotifyView.vue'),
      children: [
        {
          path: 'class',
          name: 'class',
          component: () => import('../views/NotifyViews/ClassNotify.vue')
        },
        {
          path: 'school',
          name: 'school',
          component: () => import('../views/NotifyViews/SchoolNotify.vue')
        },
        {
          path: 'college',
          name: 'college',
          component: () => import('../views/NotifyViews/CollegeNotify.vue')
        },
      ]
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/ManageView.vue'),
    },
  ],
})

export default router
