<template>
<div class="page">
<v-app>
  <v-row>
    <v-col><h1 class="my-9">Merci pour votre commande</h1>
      <v-progress-linear
          class="my-9"
          :color="getStatusColor()"
          buffer-value="0"
          :value="getStatusInt()"
          stream
      ></v-progress-linear>
      <div v-if="orderData.status === 'validation'">
        <h2 >Votre commande est en attente de validation</h2>
        <h3>Nous allons vous trouver un coursier dés que possible</h3>
      </div>
      <div v-if="orderData.status === 'preparing'">
        <h2 >Votre commande est dans nos fourneaux</h2>
        <h3>Nous allons vous trouver un coursier dés que possible</h3>
        <img src="../assets/cooking.gif" alt="cooking gif"  width="500" />

      </div>

      <div v-if="orderData.status === 'delivering'">
        <v-img class="coursierimg" style="margin: auto" :src="require(`../assets/alaboirie.png`)"  width="150px" height="150px"/>
        <h2 class="mt-2">{{orderData.coursier}} livre votre commande</h2>
        <h3>Suivez en direct la localisation de notre livreur</h3>
      </div>
      <div v-if="orderData.status === 'ranking'">
        <h2>Votre commande à été livrée</h2>
        <h3>Donnez nous votre ressenti sur cette commande</h3>
        <v-rating
            v-model="rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            hover
            large
        ></v-rating>
        <div>
          <v-textarea
              class="mx-16 my-4"
              outlined
              name="input-7-4"
              label="Laissez nous un petit message"
              v-model="message"
          ></v-textarea>
        </div>

        <v-btn @click="sendRating" color="primary">Envoyer</v-btn>
      </div>

    </v-col>
  </v-row>
  <Map   :position="[orderData.longitude,orderData.latitude]" :path="getPath()" v-if="orderData.status === 'delivering'"></Map>

  <v-row v-if="orderData.status === 'validation'">
    <v-col>
      <v-btn  x-large color="error" @click="cancelOrder" lass="align-center">Annuler</v-btn>
    </v-col>
  </v-row>

</v-app>

</div>
</template>

<script>
import * as order from "@/script/Order";
import router from "@/router";
import store from "@/store";
import Map from '../components/Map'


export default {
  name: "Delivery",
  components: {
    Map,
  },
  data() {
    return {
      orderData: '',
      interval: '',
      rating: 5,
      message: ''
    }
  },
  methods: {
    getPath(){
      console.log("from path")
      console.log(this.orderData.geojsonPath)
      return this.orderData.geojsonPath
    },
    cancelOrder() {
      console.log("canceling order")
      order.cancelOrder(this.$route.params.orderid, () => {
        store.commit("setOrderID", "undefined")

        router.push({name: 'Home'});
        window.location.href = "https://alloeirbclient.vercel.app/#/"

      });
    },

    sendRating() {
      console.log("send rating")
      let obj = {ranking: this.rating,message: this.message};
      order.setRanking(obj,this.$route.params.orderid, (response) => {
        store.commit("setOrderID", "undefined")
        store.commit("setDeliveryTime", 0)

        console.log("ranking sent")
        console.log(response)
        router.push({name: 'Home'});
        window.location.href = "https://alloeirbclient.vercel.app/#/"

      });
    },
    getStatusInt() {
      switch (this.orderData.status) {
        case 'validation':
          return "20";
        case 'preparing':
          return "40";
        case 'delivering':
          return "60";
        case 'ranking':
          return "80";
        case 'delivered':
          return "100";
        default:
          return "0";
      }
    },
    getStatusColor() {
      switch (this.orderData.status) {
        case 'validation':
          return "orange";
        case 'preparing':
          return "green";
        case 'delivering':
          return "blue";
        case 'ranking':
          return "yellow";
        case 'delivered':
          return "grey";
        default:
          return "grey";
      }
    },
    fetchOrder() {
        console.log("refreshing orderr delivery")
        order.getOrder(this.$route.params.orderid, (data) => {
          this.orderData = data;
          console.log(data);
          if(data.status === 'delivering'){
            store.commit("setCoursierLocation", [data.coursierpos[0].latitude,data.coursierpos[0].longitude])
            if(this.$store.state.deliveryTime <= 0){
              let esimatedDeliveryTime = Math.floor(data.deliveryTime/60) +2
              store.commit("setDeliveryTime", esimatedDeliveryTime)

            }
          }
        });
    },
  },
  created() {
    let orderid = this.$route.params.orderid
    console.log("orderid: " + orderid)

    order.getOrder(orderid, (data) => {
      this.orderData = data;
      if(data.status === 'delivering'){
        console.log("update coursier loc")
        console.log(data.coursierpos)
        store.commit("setCoursierLocation", [data.coursierpos[0].latitude,data.coursierpos[0].longitude])
        let esimatedDeliveryTime = Math.floor(data.deliveryTime/60) +2
        if(this.$store.state.deliveryTime <= 0){
          store.commit("setDeliveryTime", esimatedDeliveryTime)

        }
      }
      console.log(data);
    });
    this.interval = setInterval(this.fetchOrder, 5000);

  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<style lang="scss">
h1{
  font-weight: bold;
  font-size: xxx-large;
}
h2{
  margin-top: 50px;
}
h3{
  margin-top: 20px;
  opacity: 80%;
}
.page{
  height: 1000px;
}
.coursierimg{
  border-radius: 50%;
}
</style>
