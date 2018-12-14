import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import category from '@/components/category'
import editeArticle from '@/components/editeArticle'
import tagList from '@/components/tagList'
import articleList from '@/components/articleList'

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
    },
    {
      path:'/editeArticle',
      name:'editeArticle',
      component:editeArticle
    },
    {
      path:'/tagList',
      name:'tagList',
      component:tagList
    },
    {
      path:'/articleList',
      name:'articleList',
      component:articleList
    }
  ]
})
