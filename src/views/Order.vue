<template>
  <div>
    <v-app>
    <v-container class="mx">
      <v-row>
        <v-col>
          <h1 class="text-h3" style="margin-bottom: 25px">Choissisez votre commande</h1>
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
          <v-btn color="primary" @click="$router.push('order/cart')" x-large class="command-button" >Voir le panier</v-btn>
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
    if(store.state.products === 'undefined'){
      console.log("products undefined");
      order.getProducts((products) => {
        console.log(JSON.stringify(products))
        store.commit("setProducts",[...products]);
      })
    }
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
