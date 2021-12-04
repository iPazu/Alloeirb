<template>
  <div>
    <v-container class="mx">
      <v-row>
        <v-col>
          <h1>Prêt à commander ?</h1>
        </v-col>
      </v-row>
      <v-row >
        <v-col md="4" sm="6" ><ProductCard :product-data="crepe"></ProductCard></v-col>
        <v-col md="4" sm="6" ><ProductCard :product-data="crepe"></ProductCard></v-col>
        <v-col md="4" sm="6" ><ProductCard :product-data="crepe"></ProductCard></v-col>
        </v-row>
      <v-row>
        <v-col>
          <v-btn x-large class="command-button" >Commander</v-btn>
        </v-col>
      </v-row>

    </v-container>
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
        name:"Crepe au nutella",
        unit_price:"0.10",
        amount1:"1",
        amount2:"5",
        amount3:"20",
        icon_url:"../assets/crepe.png"
      }
    }
  },
  mounted() {

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