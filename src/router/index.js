import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import category from '@/components/category'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'*',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path:'/category',
      name:'category',
      component:category
    }
  ]
})
