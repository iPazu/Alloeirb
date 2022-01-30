<template>
  <div>
    <v-app>
    <v-container class="mx">
      <v-row>
        <v-col>
          <h1  style="margin-bottom: 25px">Choissisez votre commande</h1>
          <v-divider style="margin-bottom: 20px"></v-divider>

        </v-col>
      </v-row>

      <v-row >
          <v-col v-for="product in $store.state.products" :key="product.id" md="4" sm="6" >
          <ProductCard :product-data="product"></ProductCard>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" v-if="!error" @click="goToCart" x-large class="command-button" >Voir le panier</v-btn>
          <v-btn color="error" v-if="error" @click="goToCart" x-large class="command-button" >Voir le panier</v-btn>

        </v-col>
      </v-row>

    </v-container>
    </v-app>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
import store from "@/store";
import router from "@/router";
import * as order from "@/script/Order";

export default {
  name: "Order",
  components: {
    ProductCard,
  },
  data(){
    return{
      error: false
    }
  }
  ,
  methods: {
    goToCart: function () {
      store.state.products.map((p) => {
        if(isNaN(p.amount)){
          this.error = true;
          scroll(0,0)
        }
      })
      if(!this.error){
        router.push('order/cart')
      }
    }
  },
  mounted() {
    scroll(0,0)
    if(store.state.user_id === 'undefined'){
      router.push({name:'Home'});
      window.location.href = window.location.href.replace("/order","")
    }
    if(store.state.order_id !== 'undefined'){
      router.push({name:'Home'});
      window.location.href = window.location.href.replace("/order","")
    }
    order.getProducts((products) => {
      console.log(JSON.stringify(products))
      store.commit("setProducts",[...products]);
    })
  }
}
</script>

<style scoped>

.command-button{
  margin-top: 60px;

}
h1{
  margin-top: 30px;
  margin-bottom: 50px;

}
</style>
