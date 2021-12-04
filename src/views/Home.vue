<template>
  <v-app>
    <div class="command">
        <h1 class="text-h3">Salut {{$store.state.user_id}}</h1>
        <h1 class="text-h4">Prêt à passer à la vitesse supérieure ? </h1>
        <v-btn color="primary" x-large @click="$router.push('order')" class="command-button">Commander</v-btn>
    </div>
  </v-app>

</template>

<script>
import * as user from '../script/User'
import store from "@/store";

export default {
  name: 'Home',
  components: {
  },
  mounted() {
    let user_id = undefined;
    user.getUserId((uid) => {
      console.log('Trying connection');
      if(uid === 'undefined') {
        console.log("user not defined attempting cas auth")
        window.location.href = "https://cas.bordeaux-inp.fr/login?service=https://alaboirie.vvv.enseirb-matmeca.fr/redirect?token=local";
      }
      if(store.state.user_id === 'undefined'){
        store.commit("setUserID",uid);
      }
      user_id = uid;
      console.log('Connected as '+ user_id);
    });
  }
}

</script>

<style lang="scss">

.command {
  margin: 0;
  position: absolute;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  @media(max-width: 600px) {
    width: 100%;
  }
}
.command > h1:first-child{
  padding-bottom: 5%;
  font-size: 3em;
}
.command > h1{
  padding-bottom: 5%;
}

</style>
