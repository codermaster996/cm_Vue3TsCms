import { createRouter, createWebHashHistory } from 'vue-router'

import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue'),
      children: [
        {
          path: '/main',
          redirect: '/main/analysis/overview'
        },
        // 系统总览
        {
          path: '/main/analysis/overview',
          component: () => import('@/views/main/analysis/overview/overview.vue')
        },
        {
          path: '/main/analysis/dashboard',
          component: () =>
            import('@/views/main/analysis/dashboard/dashboard.vue')
        },
        // 系统管理
        {
          path: '/main/system/user',
          component: () => import('@/views/main/system/user/user.vue')
        },
        {
          path: '/main/system/department',
          component: () =>
            import('@/views/main/system/department/department.vue')
        },
        {
          path: '/main/system/menu',
          component: () => import('@/views/main/system/menu/menu.vue')
        },
        {
          path: '/main/system/role',
          component: () => import('@/views/main/system/role/role.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
})

export default router
