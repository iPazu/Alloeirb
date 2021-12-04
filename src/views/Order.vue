<template>
  <div>
    <v-container class="mx">
      <v-row>
        <v-col>
          <h1>Prêt à commander ?</h1>
        </v-col>
      </v-row>
      <v-row >
        <v-col md="4" sm="6" ><ProductCard :product-data="crepesucre"></ProductCard></v-col>
        <v-col md="4" sm="6" ><ProductCard :product-data="crepenut"></ProductCard></v-col>
        <v-col md="4" sm="6" ><ProductCard :product-data="crepeconf"></ProductCard></v-col>
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
      crepenut : {
        name:"Crepe au nutella",
        unit_price:"0.15",
        amount:0,
        icon_url:"../assets/crepe.png"
      },
      crepesucre : {
        name:"Crepe au sucre",
        unit_price:"0.10",
        amount:0,
        icon_url:"../assets/crepe.png"
      },
      crepeconf : {
        name:"Crepe à la confiture",
        unit_price:"0.15",
        amount:0,
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