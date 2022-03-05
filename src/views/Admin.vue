<template>
  <v-app>
    <div>
        <h1 class=" my-9">Panel d'administrateur</h1>
      <v-divider class="my-9"></v-divider>

      <v-row>
        <v-col sm="8" md="10" offset-md="1"  class="my-15 "  v-for="order in orders " :key="order.orderid" >


          <OrderCard v-if="order.status !== 'delivering' || (order.status === 'delivering' && order.coursier === $store
.state.user_id)" :delivered="delivered" :select-coursier="selectCoursier" :accept-order="acceptOrder"
                      :order-data="order" :color="order.coursier === $store.state.user_id"/>

        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import store from "@/store";
import router from "@/router";
import * as order from "@/script/Order";
import OrderCard from '../components/OrderCard'


export default {
  name: "Admin",
  components:{
    OrderCard,
  },
  data(){
    return{
      orders: '',
      intervalOrders: '',
      intervalLocation: '',
      pusher:'',
    }
  },
  methods: {

    refreshOrders(){
      console.log("Refreshing orders")

      order.fetchOrders((products) => {
        console.log(products)

        this.orders = [...products].reverse()

      })
    },
    acceptOrder(orderid){
      console.log("Accepting order")
      order.acceptOrder(orderid,() => {
        console.log("Order accepted")
        this.refreshOrders()
      })

    },
    selectCoursier(orderid){
      console.log("Select coursier")
      order.acceptCoursier(orderid,() => {
        console.log("Coursier selectred")
        this.refreshOrders()
      })
    },
    delivered(orderid){
      console.log("Select coursier")
      order.delivered(orderid,() => {
        console.log("Delivered")
        this.refreshOrders()
      })
    }
  },
  created() {
    if(store.state.user_id === 'undefined'){
      router.push({name:'Home'});
      window.location.href = window.location.href.replace("/order/cart","")
    }
    if(store.state.privilege !== 'admin' && store.state.privilege !== 'coursier'){
      router.push({name:'Home'});
      window.location.href = window.location.href.replace("/order","")
    }
    order.fetchOrders((products) => {
      console.log(products)
      this.orders = [...products].reverse()

    })
    this.intervalOrders = setInterval(this.refreshOrders, 5000);


  },
  beforeDestroy() {
    clearInterval(this.intervalOrders);
  }
}
</script>

<style scoped>

</style>