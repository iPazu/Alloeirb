<template>
<v-app>
  <h1></h1>
  <v-alert v-if="alertVisible === true" :type="alertType">
    {{this.alertText}}
  </v-alert>
  <h2>Vos codes:</h2>

  <v-card
      class="d-flex justify-center mb-6"
      color="transparent"
      flat
      tile>

    <v-card v-for="product in $store.state.codes" :key="product.id"
            class="pa-2 ma-3"
            outlined
            tile
    >
      {{ Object.keys(product).toString() }}
    </v-card>
  </v-card>

    <div class="code-container">
      <v-text-field class=" justify-center"  color="blue lighten-5"

                    v-model="code"
                    counter
                    maxlength="10"
                    hint="Entre un code"
                    label="code"
                    solo

      ></v-text-field>
      <v-btn large @click="sendCode" color="primary">Ajouter ce code</v-btn>
    </div>





</v-app>
</template>

<script>
import * as user from "@/script/User";
import store from "@/store";
import router from "@/router";


export default {
  name: "Rewards.vue",
  methods: {
    sendCode() {
      if (this.code !== "") {
        console.log("sending code")
        user.addCode(this.code.toLowerCase(), (status) => {
          console.log(status)
          this.alertVisible = true
          if (status === 200) {
            this.alertType = 'success'
            this.alertText = "Le code à été ajouté avec succes"
          } else {
            this.alertType = 'warning'
            if (status === 409) {
              this.alertText = "Vous possédez déjà ce code"
            } else if (status === 418) {
              this.alertText = "Ce code à expiré"
            } else if (status === 408) {
              this.alertText = "Ce code n'existe pas"
            }
          }
        });
      }
    }
    },
  mounted() {
    scroll(0,0)
    if(store.state.user_id === 'undefined'){
      router.push({name:'Home'});
      window.location.href = window.location.href.replace("/rewards","")
    }},
  data(){
    return{
      code: '',
      alertVisible: false,
      alertType: 'success',
      alertText: 'eeeee'

    }
  }
}
</script >

<style lang="scss">

.code{

  width: 30%;
}
.code-container{
  margin: 0;
  position: absolute;
  width: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  top: 30%;
  left: 50%;
@media(max-width: 600px) {
  width: 100%;
}
}
</style>