<template>
  <div class="command">
      <h1>Salut {{$store.state.user_id}}</h1>
      <h1>Prêt à passer à la vitesse supérieure ? <i class="el-icon-phone"></i></h1>
      <v-btn x-large @click="$router.push('order')" class="command-button">Commandez</v-btn>
  </div>
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
