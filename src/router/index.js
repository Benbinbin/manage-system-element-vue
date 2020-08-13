import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 使用动态路由（基于后端传回来的值）生成相应的路由组件映射关系
    // {
    //   path: '/',
    //   component: () => import('@/views/Main.vue'),
    //   children: [
    //     {
    //       path: '',
    //       name: 'home',
    //       component: () => import('@/views/Home/Home')
    //     },
    //     {
    //       path: 'video',
    //       name: 'video',
    //       component: () => import('@/views/VideoManage/VideoManage')
    //     },
    //     {
    //       path: 'user',
    //       name: 'user',
    //       component: () => import('@/views/UserManage/UserManage')
    //     },
    //     {
    //       path: 'setting',
    //       name: 'setting',
    //       component: () => import('@/views/Other/Setting')

    //     },
    //     {
    //       path: 'logout',
    //       name: 'logout',
    //       component: () => import('@/views/Other/Logout')
    //     },
    //   ]
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login.vue')
    }
  ]
})

export default router