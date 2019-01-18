import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/layout/Login'
import AdminWrapper from '@/layout/AdminWrapper'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/cards',
      name: 'cards',
      component: AdminWrapper
    },
    {
      path: '/wallets',
      name: 'wallets',
      component: AdminWrapper
    },
    {
      path: '/fees-limits',
      name: 'fees-limits',
      component: AdminWrapper
    },
    {
      path: '/faq',
      name: 'faq',
      component: AdminWrapper
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: AdminWrapper
    },
  ]
})
