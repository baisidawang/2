import { createRouter, createWebHistory } from 'vue-router'
// 定义路由
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/layout/Login.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../view/layout/Layout.vue'),
    children: [
      {
        path: '/student',
        name: 'student',
        component: () => import('../view/pages/Student.vue')
      }
    ]
  },
]
// 创建路由对象
const router = createRouter({
  // 设置历史记录模式
  history: createWebHistory(),
  // routes: routes的缩写
  routes,
})
export default router 