import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/layout/Login'
import AdminWrapper from '@/layout/AdminWrapper'
import axios from 'axios'

const ifNotAuthenticated = (to, from, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    next('/cards')
    return
  }
  next()
}

const ifAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('token')) {
    next('/')
    return
  }
  next()
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/cards',
      name: 'cards',
      component: AdminWrapper,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/wallets',
      name: 'wallets',
      component: AdminWrapper,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/fees-limits',
      name: 'fees-limits',
      component: AdminWrapper,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/faq',
      name: 'faq',
      component: AdminWrapper,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: AdminWrapper,
      beforeEnter: ifAuthenticated
    },
  ]
})

export default router