<template>
  <div>
      <v-card elevation="2" sm-height :height="height()" class="mx-3 paddingcard" :color="getColor()" @click="show = !show" >
        <div class="header d-flex flex-row flex-wrap">


        <p class="flex justify-start ml-5 mt-2 pt-3 rounded-lg white elevation-4 number" >{{orderData.firstname}} {{orderData.lastname}}</p>
        <p class="flex justify-start ml-5  mt-2 pt-3 rounded-lg white elevation-4 number" >{{orderData.adresse}}</p>
        <p class="flex justify-start mx-7 mt-2 pt-3 rounded-lg white elevation-4 number" >{{Math.round(orderData.total*100)/100}} €</p>
        <v-btn class="my-4 mx-3" @click="acceptOrder(orderData.id)" v-if="orderData.status === 'validation'" large color="primary">Accepter la commande</v-btn>
        <v-btn class="my-4 mx-3" @click="selectCoursier(orderData.id)" v-if="orderData.status === 'preparing'" large color="primary">Livrer cette commande</v-btn>
        <v-btn class="my-4 mx-3" @click="delivered(orderData.id)" v-if="orderData.status === 'delivering'" large color="secondary">Valider la livraison</v-btn>
        <v-btn class="my-4 mx-3" v-if="orderData.status === 'ranking'" large color="secondary">Livrée</v-btn>
        <v-btn class="my-4 mx-3" v-if="orderData.status === 'delivered'" large color="secondary">Livrée et notée</v-btn>
          <p class="flex justify-start mx-7 mt-2 pt-3 rounded-lg white elevation-4 number" >Il y a: {{getStringDate}}</p>

        </div>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card elevation="1  "  class="d-flex flex-row flex-wrap" color="white" >
              <div   v-for="(p, index) in productData" :key="index" >
                <p  v-if="p !== 0" class="black--text mx-8"  >
                  {{index}} : {{p}}
                </p>
              </div>
              <div   v-for="(q,index) in qg" :key="index" >
                <p  class="black--text mx-8"  >
                  qg {{index}} : {{ Math.round(distance(q[1],orderData.latitude,q[0],orderData.longitude) * 100) / 100 }}km
                </p>
              </div>
              <p class="ml-3">description: {{orderData.description}}</p>
              <p class="ml-3">telephone: {{orderData.phone}}</p>
              <v-btn class="my-4 mx-3" @click="cancelOrder" large color="error">Annuler la commande</v-btn>
            </v-card>

          </div>
        </v-expand-transition>
      </v-card>
  </div>


</template>

<script>
import * as order from "@/script/Order";


export default {
  name: "OrderCard",

  props: {
    orderData: Object,
    acceptOrder: Function,
    selectCoursier: Function,
    delivered: Function,
  },
  data(){
    return{
      show: false,
      productData: null,
      qg: { alex:[ -0.6303,44.8108],noemie:[-0.5802,44.8056],dimitri:[ -0.5788,44.8234],antoinelh:[-0.6015,44.8215],theolm:[  -0.6031,44.8071],amaux:[ -0.5996,44.8156]},
    }
  },
  methods:{
    height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 200
        case 'sm': return 200
        case 'md': return 80
        case 'lg': return 80
        case 'xl': return 80
      }
    },
     distance(lat1, lat2, lon1, lon2) {

        // The math module contains a function
        // named toRadians which converts from
        // degrees to radians.
        lon1 =  lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;

        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.pow(Math.sin(dlon / 2),2);

        let c = 2 * Math.asin(Math.sqrt(a));

        // Radius of earth in kilometers. Use 3956
        // for miles
        let r = 6371;

        // calculate the result
        return(c * r);
      }
    ,
    cancelOrder() {
      console.log("canceling order")
      order.cancelOrder(this.orderData.id, () => {
        location.reload()
      });
  },
    getColor(){
      if(this.orderData.status === "delivering"){
        return "green"
      }
      if(this.orderData.status === "validation"){
        return "orange"
      }
      if(this.orderData.status === "preparing"){
        return "yellow "
      }
    },
    getStringDate(){
      let lastdate = this.orderData.date
      lastdate[10] = ''
      console.log(lastdate)
      let now = Date.now()
      let last = Date.parse(lastdate)
      console.log(now)
      console.log(last)
      let date =Date(now-last)
      console.log(lastdate)
    }
    ,
  },


  created() {
    console.log(this.orderData)
    console.log("eee")
    console.log(this.orderData.products)
    this.productData = JSON.parse(this.orderData.products)
  }

}
</script>

<style scoped>
.paddingcard{
  margin-bottom: 30em;
}
</style>