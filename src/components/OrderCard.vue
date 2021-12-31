<template>
  <div>
    <v-app>
      <v-card elevation="2" sm-height :height="height" class="mx-3 my-10 " color="grey lighten-5" @click="show = !show" >
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

              </v-card>

          </div>
        </v-expand-transition>
      </v-card>
    </v-app>
  </div>


</template>

<script>
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
      productData: null


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
  },
  created() {
    console.log(this.orderData)
    this.productData = JSON.parse(this.orderData.products)
  }
}
</script>

<style scoped>

</style>