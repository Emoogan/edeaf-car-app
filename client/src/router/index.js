import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import CarRequest from '@/components/CarRequest'
import Request from '@/components/Request'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: CarRequest
    },
    {
      path: '/car-request',
      name: 'CarRequest',
      component: CarRequest
    },
    {
      path: '/requests',
      name: 'Request',
      component: Request
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: 'Login'
    }
  ]
})
