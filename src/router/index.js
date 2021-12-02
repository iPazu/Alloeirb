import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Order from '../views/Order.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/order',
    order: 'Order',
    component: Order
  },
  {
    path: '/login/token=:token&ticket=:ticket',
    login: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
