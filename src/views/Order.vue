<template>
  <div>
    <h1>Commandez ce que vous voulez {{$store.state.user_id}}</h1>
    <ProductCard  v-bind:productData="crepe" ></ProductCard>
    <v-btn class="command-button">Lancer votre commande</v-btn>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
  name: "Order",
  components: {
    ProductCard,
  },
  data(){
    return {
      crepe : {
        name:"Crepe",
        unit_price:"0.10",
        amount1:"1",
        amount2:"5",
        amount3:"20",
        icon_url:"../assets/crepe.png"}
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
  .command-button{
    margin-top: 5%;
  }
</style>