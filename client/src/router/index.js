import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      children: [
        {
          path: 'notify',
          name: 'notify',
          component: () => import('../views/NotifyViews/ShowNotify.vue')
        },
        {
          path: 'class',
          name: 'class',
          component: () => import('../views/ClassView.vue'),
          children: [
            {
              path: 'list',
              name: 'classList',
              component: () => import('../views/ClassViews/ClassList.vue')
            },
            {
              path: 'create',
              name: 'createClass',
              component: () => import('../views/ClassViews/Create.vue')
            },
          ]
        },
      ]
    },
  ],
})

export default router
