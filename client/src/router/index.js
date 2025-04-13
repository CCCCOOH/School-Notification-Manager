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
      component: () => import('../views/PanelView.vue'),
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
              component: () => import('../views/ClassViews/ClassCreate.vue')
            },
            {
              path: 'detail',
              name: 'classDetail',
              component: () => import('../views/ClassViews/ClassDetail.vue')
            },
            {
              path: 'manageClassNotify',
              name: 'manageClassNotify',
              component: () => import('../views/NotifyViews/ManageClassNotify.vue'),
              children: [
                {
                  path: 'manageNotifyList',
                  name: 'manageNotifyList',
                  component: () => import('../views/NotifyViews/ManageNotifyList.vue')
                },
                {
                  path: 'addNotify',
                  name: 'addNotify',
                  component: () => import('../views/NotifyViews/AddNotify.vue')
                },
                {
                  path: 'editNotify',
                  name: 'editNotify',
                  component: () => import('../views/NotifyViews/UpdateNotify.vue')
                },
              ]
            },
            {
              path: 'manageClassMember',
              name: 'manageClassMember',
              component: () => import('../views/MemberView.vue')
            },
            {
              path: 'joinClass',
              name: 'joinClass',
              component: () => import('../views/ClassViews/CLassJoin.vue')
            },

          ]
        },
        {
          path: 'userinfo',
          name: 'userinfo',
          component: () => import('../views/UserViews/InfoView.vue')
        },
      ]
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyPolicyView.vue')
    },
    {
      path: '/privacyCommunity',
      name: 'privacyCommunity',
      component: () => import('../views/CommunityPolicyView.vue')
    },
  ],
})

export default router
