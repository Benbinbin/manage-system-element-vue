import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = []

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/views/Main.vue')
    }
  ]
})

export default router
