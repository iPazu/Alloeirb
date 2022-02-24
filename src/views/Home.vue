<template>
  <div class="body">

  <v-app>
    <div class="banner">
      <a class="logo_rms" href="https://rams.eirb.fr">
        <img src="../assets/logo_rms.png" alt="Logo Rams'eirb">
      </a>
      <h1>AlloEirb</h1>
    </div>
    <div>
        <v-btn color="light-blue"
                  x-large @click="$router.push({ path: `/rewards/`})" class="command-button mt-5 mx-8">Récompenses</v-btn>

          <v-btn color="light-blue" v-if="$store.state.privilege === 'coursier' ||$store.state.privilege === 'admin'"
                 x-large @click="$router.push({ path: `/admin/`})" class="command-button mt-5 mx-8">Pannel administrateur</v-btn>

    </div>

    <div class="message">

      <h1 style="font-size: xxx-large">Salut {{$store.state.firstname}}</h1>

      <div class="order" v-if="$store.state.order_id === 'undefined'">
        <h3 >Prêt à passer à la vitesse supérieure ? </h3>
        <v-btn color="primary" x-large @click="$router.push('order')" class="command-button mt-5">Commander</v-btn>
      </div>

      <div class="view" v-else>
        <h2 >Vous avez déja une commande en cours</h2>
        <v-btn color="primary"  x-large @click="$router.push({ path: `/delivery/${$store.state.order_id}`})" class="command-button mt-5">Voir la commande</v-btn>
      </div>
      <div>
      <v-btn  color="error" v-if="$store.state.user_id !== 'undefined'"
               @click="disconnect" class="command-button mt-5 mx-8 disconect">Se déconnecter</v-btn>
      </div>

    </div>

  </v-app>


  </div>

</template>

<script>
import * as user from '../script/User'
import store from "@/store";
import router from "@/router";

export default {
  name: 'Home',
  components: {
  },
  methods: {
    disconnect(){
      localStorage.setItem('accessToken', '');
      localStorage.setItem('vuex', '');
      location.reload()

    }
  },
  mounted() {
    let user_id = undefined;
    console.log(process.env.VUE_APP_DISPONIBLE)
    if(process.env.VUE_APP_DISPONIBLE === 'false'){
      console.log("not disponible")
      router.push("noaccess")
      return
    }

    user.getUserId((uid) => {
      console.log('Trying connection');
      console.log(process.env.VUE_APP_CLIENT_URL)
      console.log(process.env.VUE_APP_API_URL)

      if(uid === 'undefined') {
        console.log("user not defined attempting cas auth")
            //window.location.href = process.env.CLIENT_URL + "/#/login";
            window.location.href = "https://cas.bordeaux-inp.fr/login?service=https://alaboirie.vvv.enseirb-matmeca.fr/redirectprod?token=local";
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


.message {
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
.message > h1:first-child{
  padding-bottom: 5%;
  font-size: 3em;
}
.message > h1{
  padding-bottom: 5%;
}
.logo_rms > img{
  position: absolute;
  left: 2%;
  top: 10px;
  border-style: solid;
  border-color: rgba(255, 204, 0, 0.24);
  padding: 4px 4px 4px 4px;
  width: 9vh;
  height: 9vh;
  border-radius: 50%;
}
</style>
