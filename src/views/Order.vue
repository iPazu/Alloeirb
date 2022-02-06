<template>
    <v-app>
    <v-container class="mx">
      <v-row>
        <v-col>
          <h1  class="command-title" style="margin-bottom: 25px">Choissisez votre commande</h1>
          <h2>Faites vous plaisir avec les produits de notre bazar</h2>
          <v-divider style="margin-bottom: 20px"></v-divider>

        </v-col>
      </v-row>
            <h2>Boissons</h2>
            <v-divider style="margin-bottom: 20px"></v-divider>
            <v-row >
              <div v-for="product in $store.state.products" :key="product.id" >
                <v-col v-if="product.category === 'bevrage'"  md="4" sm="6" >
                  <ProductCard  :product-data="product" ></ProductCard>
                </v-col>
              </div>
            </v-row>


            <h2>Nourriture</h2>
            <v-divider style="margin-bottom: 20px"></v-divider>
            <v-row >
              <div v-for="product in $store.state.products" :key="product.id" >
                  <v-col v-if="product.category === 'food'"  md="4" sm="6" >
                    <ProductCard  :product-data="product" ></ProductCard>
                  </v-col>
              </div>
            </v-row>


              <h2>Services</h2>
              <v-divider style="margin-bottom: 20px"></v-divider>
              <v-row >
                <div v-for="product in $store.state.products" :key="product.id" >
                  <v-col v-if="product.category === 'serrvice'"  md="4" sm="6" >
                    <ProductCard  :product-data="product" ></ProductCard>
                  </v-col>
                </div>
              </v-row>

              <h2>Autres</h2>
              <v-divider style="margin-bottom: 20px"></v-divider>
              <v-row >
                <div v-for="product in $store.state.products" :key="product.id" >
                  <v-col v-if="product.category === 'other'"  md="4" sm="6" >
                    <ProductCard  :product-data="product" ></ProductCard>
                  </v-col>
                </div>
              </v-row>

      <v-row>
        <v-col>
          <v-btn color="primary" v-if="!error" @click="goToCart" x-large class="command-button mb-3" >Voir le panier</v-btn>
          <v-btn color="error" v-if="error" @click="goToCart" x-large class="command-button mb-3" >Voir le panier</v-btn>

        </v-col>
      </v-row>

    </v-container>
    </v-app>
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
  },
  props: {
    updatemap: Boolean,
  },
  methods: {
    goToCart: function () {
      store.state.products.map((p,index) => {
        if(isNaN(p.amount)){
          this.error = true;
          scroll(0,0)
        }
        else if (!p.amount > 1 && p.unit_price === 0) {
          store.state.products[index].amount = 1
        }
      })
      if(!this.error){
        router.push('order/cart')
      }
    }
  },
  mounted: function () {
    scroll(0, 0)
    if (store.state.user_id === 'undefined') {
      router.push({name: 'Home'});
      window.location.href = window.location.href.replace("/order", "")
    }
    if (store.state.order_id !== 'undefined') {
      router.push({name: 'Home'});
      window.location.href = window.location.href.replace("/order", "")
    }
    if (this.$route.params.updateproducts !== 'false') {
      order.getProducts((products) => {
        console.log(JSON.stringify(products))
        store.commit("setProducts", [...products]);
      })
    }

  }
}
</script>

<style scoped>

.command-button{
  margin-top: 60px;

}
.command-title{
  margin-top: 30px;
  margin-bottom: 50px;

}
</style>
