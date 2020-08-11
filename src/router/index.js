import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = []

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/views/Main.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/Home')
        },
        {
          path: 'video',
          name: 'video',
          component: () => import('@/views/VideoManage/VideoManage')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('@/views/UserManage/UserManage')
        },
        {
          path: 'setting',
          name: 'setting',
          component: () => import('@/views/Other/Setting')

        },
        {
          path: 'logout',
          name: 'logout',
          component: () => import('@/views/Other/Logout')
        },
      ]
    }
  ]
})

export default router
