import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Order from '../views/Order.vue'
import Login from '../views/Login.vue'
import Cart from "@/views/Cart";
import Delivery from "@/views/Delivery";
import Admin from "@/views/Admin";
import Rewards from "@/views/Rewards";
import Forbiden from "@/views/Forbiden";
import Down from "@/views/Down";


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    props: true
  },
  {
    path: '/order/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/delivery/:orderid',
    name: 'Delivery',
    component: Delivery
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/rewards',
    name: 'Rewards',
    component: Rewards
  },
  {
    path: '/forbiden',
    name: 'Forbiden',
    component: Forbiden
  },
  {
    path: '/noaccess',
    name: 'Down',
    component: Down
  },
  {
    //
      path: '/login/token=:token&ticket=:ticket',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
