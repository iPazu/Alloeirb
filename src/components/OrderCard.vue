<template>
  <div>
      <v-card elevation="2" sm-height :height="height()" class="mx-3 my-10 " color="grey lighten-5" @click="show = !show" >
        <div class="header d-flex flex-row flex-wrap">


        <p class="flex justify-start ml-5 mt-2 pt-3 rounded-lg white elevation-4 number" e>{{orderData.user_id}}</p>
        <p class="flex justify-start ml-5  mt-2 pt-3 rounded-lg white elevation-4 number" e>{{orderData.adresse}}</p>
        <p class="flex justify-start mx-7 mt-2 pt-3 rounded-lg white elevation-4 number" e>{{orderData.total}} €</p>
        <v-btn class="my-4 mx-3" @click="acceptOrder(orderData.id)" v-if="orderData.status === 'validation'" large color="primary">Accepter la commande</v-btn>
        <v-btn class="my-4 mx-3" @click="selectCoursier(orderData.id)" v-if="orderData.status === 'preparing'" large color="primary">Livrer cette commande</v-btn>
        <v-btn class="my-4 mx-3" @click="delivered(orderData.id)" v-if="orderData.status === 'delivering'" large color="secondary">Valider la livraison</v-btn>
        <v-btn class="my-4 mx-3" v-if="orderData.status === 'ranking'" large color="secondary">Livrée</v-btn>
        <v-btn class="my-4 mx-3" v-if="orderData.status === 'delivered'" large color="secondary">Livrée et notée</v-btn>

        </div>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card elevation="1  "  class="d-flex flex-row flex-wrap" color="white" >
              <div   v-for="(p, index) in productData" :key="index" >
                <p  class="black--text mx-8"  >
                  {{index}} : {{p}}
                </p>
              </div>
              <div   v-for="(q,index) in qg" :key="index" >
                <p  class="black--text mx-8"  >
                  qg {{index}} :{{distance(q[0],orderData.latitude,q[1],orderData.longitude)}}
                </p>
              </div>
              <p>{{orderData.description}}</p>
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
    delivered: Function
  },
  data(){
    return{
      show: false,
      productData: null,
      qg: { pessac:[ -0.6303,44.8108]}

    }
  },
  methods:{
    height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 150
        case 'sm': return 150
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

</style>