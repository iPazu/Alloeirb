<template>
  <v-app>
    <div>
      <h1 class="text-h3 my-9">Pannel d'administrateur</h1>
      <v-divider class="my-9"></v-divider>

      <v-row>
        <v-col sm="8" md="10" offset-md="1"  class="my-15 flex align-center">
          <v-sheet elevation="2" height="80px" class="mx-3 my-10 d-flex flex-row" color="grey lighten-5" v-for="order in orders " :key="order.orderid">
            <p class="flex justify-start ml-5 mt-2 pt-3 rounded-lg white elevation-4 number" e>{{order.user_id}}</p>
            <p class="flex justify-start ml-5  mt-2 pt-3 rounded-lg white elevation-4 number" e>{{order.adresse}}</p>
            <p class="flex justify-start mx-7 mt-2 pt-3 rounded-lg white elevation-4 number" e>{{order.total}} €</p>
            <v-btn class="my-4 mx-3" @click="acceptOrder(order.id)" v-if="order.status === 'validation'" large color="primary">Accepter la commande</v-btn>
            <v-btn class="my-4 mx-3" @click="selectCoursier(order.id)" v-if="order.status === 'preparing'" large color="primary">Livrer cette commande</v-btn>
            <v-btn class="my-4 mx-3" @click="delivered(order.id)" v-if="order.status === 'delivering'" large color="secondary">Valider la livraison</v-btn>
            <v-btn class="my-4 mx-3" v-if="order.status === 'ranking'" large color="secondary">Livrée</v-btn>
            <v-btn class="my-4 mx-3" v-if="order.status === 'delivered'" large color="secondary">Livrée et notée</v-btn>

          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import store from "@/store";
import router from "@/router";
import * as order from "@/script/Order";


export default {
  name: "Admin",
  data(){
    return{
      orders: '',
      intervalOrders: '',
      intervalLocation: '',
      pusher:''
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
    this.intervalLocation = setInterval(this.refreshLocation, 5000);


  },
  methods: {
    refreshOrders(){
      console.log("Refreshing orders")
      order.fetchOrders((products) => {
        console.log(products)
        this.orders = [...products].reverse()
      })
    },
    refreshLocation(){
      console.log("Refreshing location")
      if ("geolocation" in navigator) {
        console.log("Geoloc activated")

        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);
          order.sendLocation({latitude:position.coords.latitude,longitude:position.coords.longitude});
        });
      }

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
  beforeDestroy() {
    clearInterval(this.intervalOrders);
    clearInterval(this.intervalLocation);
  }
}
</script>

<style scoped>

</style>