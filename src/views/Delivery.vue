<template>
<div class="page">
<v-app>
  <v-row>
    <v-col><h1 class="my-9 delivery_title">Merci pour votre commande</h1>
      <v-progress-linear
          class="my-9"
          :color="getStatusColor()"
          buffer-value="0"
          :value="getStatusInt()"
          stream
      ></v-progress-linear>
      <div v-if="orderData.status === 'validation'">
        <h2 class="delivery_subtitle">Votre commande est en attente de validation</h2>
        <h3 class="delivery_desc">Nous allons vous trouver un coursier dés que possible</h3>
        <div class="gif_surround">
        <img src="../assets/camel_running.gif" alt="camel gif" class="cooking-gif"  width="500" />
        </div>
      </div>
      <div v-if="orderData.status === 'preparing'">
        <h2 class="delivery_subtitle">Votre commande est dans nos fourneaux</h2>
        <h3 class="delivery_desc">Nous allons vous trouver un coursier dés que possible</h3>
        <div class="gif_surround">
          <img src="../assets/cooking.gif" alt="cooking gif" class="cooking-gif"  width="500" />
        </div>

      </div>

      <div v-if="orderData.status === 'delivering'">
        <v-img class="coursierimg" style="margin: auto" :src="require(`@/assets/team/`+orderData.coursier+`.jpeg`)" width="150px" height="150px"/>
        <h2  class="mt-2 delivery_subtitle">{{this.cousierName[orderData.coursier]}} livre votre commande</h2>
        <h3 class="delivery_desc">Suivez en direct la localisation de notre livreur</h3>
      </div>
      <div v-if="orderData.status === 'ranking'">
        <h2 class="delivery_subtitle">Votre commande à été livrée</h2>
        <h3 class="delivery_desc">Donnez nous votre ressenti sur cette commande</h3>
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
              background-color="blue lighten-5"
              outlined
              name="rating-message"
              label="Laissez nous un petit message"
              v-model="message"
          ></v-textarea>
        </div>

        <v-btn @click="sendRating" color="primary">Envoyer</v-btn>
      </div>
      <Map  class="mt-10" :position="[orderData.longitude,orderData.latitude]" :path="getPath()" v-if="orderData.status === 'delivering'"></Map>
      <h3 class="pt-6" v-if="orderData.status === 'delivering'">Ils sont beau nos liveurs non ?</h3>
    </v-col>
  </v-row>


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
import store from "@/store";
import Map from '../components/Map'
import router from "@/router";


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
      message: '',
      cousierName: {alaboirie:'Alex',tfacen:'Théo',tlemestre: 'Théo',aclochard:'Amaury',dwalther:'Dimitri',alaurent026:'Alban',
      alducq:'Alexiane',iboukhars:'Ines',mhellias004:'Margot',mreinert:'Mathis',mrozec001: 'Marion',mmezencev:'Marin',nkegltourne:"Hamza",
      tgainard001:'Thomas',zbachellier:'Zoé',aaugerat:"Alice",sraguenessc:"Segal",alhonora:"Antoine",eroncin:"Elisa",dbritelle:"Diane",
        csammou:'Chadi',cdu:"Camille",aboucher007:"Antoine",plarue:"Paul",vvicier:"Valentin",saserres:"Sabrina",llefebvre011:"Louis",ivasseur:"Inès",
        gbaratange:"Guillaume",luchaussat:"Lucas"}
    }
  },
  methods: {

    getPath(){
      console.log("from path")
      console.log(this.orderData.geojsonPath)
      return this.orderData.geojsonPath
    },
    orderCanceled() {
      store.commit("setOrderID", "undefined")
      router.push({name: 'Home'});
    },
      cancelOrder() {
      console.log("canceling order")
      order.cancelOrder(this.$route.params.orderid, () => {
        store.commit("setOrderID", "undefined")
        router.push({name: 'Home'});

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
        window.location.href = process.env.CLIENT_URL

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
      if(this.orderData.status === 'ranking' ){
        return
      }
        order.getOrder(this.$route.params.orderid, (data) => {
          this.orderData = data;
          console.log(data);
          if(data.status === 'canceled' || data.status === 'delivered'){
            this.orderCanceled();
          }
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
    scroll(0,0)
    if(process.env.VUE_APP_DISPONIBLE === 'false'){
      router.push({name: 'Down'});
      return
    }
    let orderid = this.$route.params.orderid
    console.log("orderid: " + orderid)

    order.getOrder(orderid, (data) => {
      this.orderData = data;
      if(data.status === 'canceled' || data.status === 'delivered' ){
        this.orderCanceled();
      }

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
.gif_surround{
  margin: auto;
  width: 500px;
  border-radius: 50%;
  @media only screen and (max-width: 767px) {
    width: 60%;
    height: 60%;
  }
}
.delivery_title{
  font-weight: bold;
  font-size: xxx-large;
}
.delivery_subtitle{
  margin-top: 50px;
}
.delivery_desc{
  margin-top: 20px;
  opacity: 0.8;
}
.page{
  height: 1150px;
}
.coursierimg{
  border-radius: 50%;
}
.cooking-gif{
  border-radius: 50%;
  backdrop-filter: blur(10px);
  @media only screen and (max-width: 767px) {
    width: 60%;
    height: 60%;
  }
}
</style>
