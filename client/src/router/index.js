import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [
    // 首页（登陆页面）
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginView.vue'),
    },
    // 面板页面
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardViews/DashboardView.vue'),
      children: [
        // 通知查看页面
        {
          path: '/notify',
          name: 'notify',
          component: () => import('../views/DashboardViews/NotifyViews/ShowNotify.vue')
        },
        // 班级查看与管理页面
        {
          path: '/class',
          name: 'class',
          component: () => import('../views/DashboardViews/ClassViews/ClassView.vue'),
          children: [
            // 班级列表
            {
              path: 'classList',
              name: 'classList',
              component: () => import('../views/DashboardViews/ClassViews/ClassListViews/ClassList.vue'),
            },
            // 创建班级
            {
              path: 'createClass',
              name: 'createClass',
              component: () => import('../views/DashboardViews/ClassViews/ClassCreateViews/ClassCreateView.vue')
            },
            // 加入班级
            {
              path: 'joinClass',
              name: 'joinClass',
              component: () => import('../views/DashboardViews/ClassViews/ClassJoinViews/CLassJoin.vue')
            },
            // 编辑班级信息
            {
              path: 'classEdit',
              name: 'ClassEdit',
              component: () => import('../views/DashboardViews/ClassViews/ClassListViews/ClassEditViews/ClassEdit.vue')
            },
            // 管理班级通知
            {
              path: 'ManageClassNotify',
              name: 'ManageClassNotify',
              component: () => import('../views/DashboardViews/ClassViews/ClassListViews/ClassNotifyViews/ClassNotify.vue'),
              children: [
                {
                  path: 'manageNotifyList',
                  name: 'ManageNotifyList',
                  component: () => import('../views/DashboardViews/ClassViews/ClassListViews/ClassNotifyViews/ManageViews/NotifyManageView.vue')
                },
                {
                  path: 'addNotify',
                  name: 'AddNotify',
                  component: () => import('../views/DashboardViews/ClassViews/ClassListViews/ClassNotifyViews/AddViews/NotifyAddView.vue')
                },
                {
                  path: 'editNotify',
                  name: 'EditNotify',
                  component: () => import('../views/DashboardViews/ClassViews/ClassListViews/ClassNotifyViews/UpdateViews/UpdateNotify.vue')
                },
              ]
            },
            // 管理班级成员
            {
              path: '/ManageClassMember',
              name: 'ManageClassMember',
              component: () => import('../views/DashboardViews/ClassViews/ClassListViews/ClassMemberViews/MemberView.vue')
            },
          ]
        },
        // 用户详情页
        {
          path: 'userInfo',
          name: 'userInfo',
          component: () => import('../views/DashboardViews/PersonalViews/PersonalView.vue')
        },
      ]
    },
    // 隐私政策页面
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyViews/PrivacyPolicyView.vue')
    },
    {
      path: '/privacyCommunity',
      name: 'privacyCommunity',
      component: () => import('../views/PrivacyViews/CommunityPolicyView.vue')
    },
  ],
})

export default router