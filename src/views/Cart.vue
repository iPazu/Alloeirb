<template>
<div>
  <v-app>

    <h1 class="checkout-title ">Votre panier</h1>
    <v-divider style="margin-bottom: 20px"></v-divider>

    <v-row>
    <v-col sm="8" md="5" offset-md="1"  class="my-15 flex align-center">
    <v-sheet   rounded="xl" elevation="6" height="80px" class="mx-3 my-10 d-flex flex-row" color="blue lighten-5" v-for="product in $store.state.products" :key="product.id">
        <v-img class="ml-3 mt-4" :src="require(`../assets/${product.icon_url}`)" max-width="50px" max-height="50px"/>
       <p class="flex justify-start ml-5 mt-2 pt-3 rounded-lg white elevation-4 number" e>{{product.amount}}</p>
      <p class="flex justify-start ml-2 text-center">{{ product.display_name}}</p>
      <p class="flex justify-start mx-7 mt-2 pt-3 rounded-lg white elevation-4 number" e>{{Math.round(product.amount*product.unit_price * 100) / 100 }} €</p>
    </v-sheet>
    </v-col>
    <v-col sm="4" md="4" offset-md="1" order="first" order-sm="last">
      <v-textarea class="mt-10" background-color="blue lighten-5"
          solo
                  elevation="6"
          name="description"
          label="Décris nous au mieux ta commande"
                  v-model="description"
      ></v-textarea>
      <div class="checkout-box " >
        <v-card class=" mt-5" width="500px" height="400px" elevation="6" color="blue lighten-5">
          <v-card-title class="flex justify-center">Détails de livraison</v-card-title>
          <v-card-text>
            <v-text-field
                v-model="phone"
                :rules="validPhoneNumber"
                counter
                maxlength="10"
                  hint="Entre ton numéro pour qu'on puisse t'appeler si nécessaire"
                label="télephone"
            ></v-text-field>
            <v-text-field
                v-model="adresse"
                :rules="validAdress"
                counter
                maxlength="50"
                hint="Donne nous ton adresse pour qu'on te livre"
                label="adresse"
            ></v-text-field>
            <v-text-field
                v-model="postal"
                :rules="validPostalCode"
                counter
                maxlength="5"
                hint="Donne nous le code postal de ton adresse"
                label="code postal"
            ></v-text-field>

            <v-card-title class="flex justify-center pt-0 pb-0">
<span v-if="oldpricestriked" class="oldprice">{{Math.round($store.getters.getTotalCheckout * 100) / 100 +"€"}}</span>
             <p class="pt-3 pr-2" v-if="oldpricestriked">→ </p>

              {{  getTotalString()}}
            </v-card-title>

            <v-btn large @click="sendJsonOrder" color="primary">Commander</v-btn>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
  </v-app>
</div>
</template>

<script>

import store from "@/store";
import router from "@/router";
import * as order from '../script/Order'

export default {
  name: "Cart",
  methods: {
    getJsonOrder(){
      let obj = {description: this.description,phone: this.phone,adress: this.adresse+ " " +this.postal};
      const product_id = store.state.products.map(product => {
        return product.id;
      });
      const amount = store.state.products.map(product => {
        return product.amount;
      });
      let tmpobj = {};
      for (let i = 0; i < amount.length; i++) {
        tmpobj[product_id[i]] = amount[i];
      }
      obj["products"] = tmpobj
      return obj;
    },
    checkIfCorrectInput(){
      return !(isNaN(this.phone) || this.phone.length !== 10 || this.adresse.length < 10 || this.postal.length !== 5 );
    },
    sendJsonOrder(){
      console.log(this.checkIfCorrectInput())
      console.log(this.getJsonOrder())
      if(this.checkIfCorrectInput()){
        console.log("sending json order");
        order.sendOrder(this.getJsonOrder(),(orderid) => {
          console.log(orderid)
          store.commit("setOrderID",orderid.data)
          store.commit("resetProductAmount")

          router.push({ path: `/delivery/${store.state.order_id}`});
        });
      }
    },
    getTotalString(){
      let promotion = store.getters.getPromotion
      let total =  Math.round(store.getters.getTotalCheckout * 100) / 100

      if(promotion > 0){
        this.oldpricestriked = true
        console.log("promotion" +promotion)
       let newtotal = total - total*(promotion/100)
        return newtotal + " €"
      }
     return total + " €"

    }
  },
  data(){
    return{
      phone: '',
      adresse: '',
      validPhoneNumber: [v => (v.length === 10 && !isNaN(v)) || 'Entrez un numéro valide'],
      validAdress: [v => v.length > 10 || 'Entrez une adresse valide'],
      apiKey: 'pk.eyJ1IjoiaXBhenUiLCJhIjoiY2t4b25rYTdoMXprbjJ4cWs4Zjc4Z24waSJ9.maHkMBz8VRxaRZxbfLNfuA',
      postal: '',
      oldpricestriked: false,
      validPostalCode: [v => (v.length === 5 && !isNaN(v)) || 'Entrez un numéro valide'],
      description: ''


    }
  },
  mounted() {
    scroll(0,0)
    if(store.state.user_id === 'undefined'){
      router.push({name:'Home'});
      window.location.href = window.location.href.replace("/order/cart","")
    }
    if(store.state.order_id !== 'undefined'){
      router.push({name:'Home'});
      window.location.href = window.location.href.replace("/order","")
    }
  }

}
</script>

<style scoped>
.oldprice{
  color: red;
  text-decoration: line-through;
  padding-right: 10px;
}
  .checkout-title{
    padding-top: 50px;
  }
.number{
  background-color: white;
  height: 50px;
  width: 60px;
}

</style>
