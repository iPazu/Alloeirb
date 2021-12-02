<template>
    <div class="command">
      <el-row>
        <el-col><h1>Salut {{$store.state.user_id}}</h1></el-col>
        <el-col ><h1>Prêt à passer à la vitesse supérieure ? <i class="el-icon-phone"></i></h1></el-col>
        <el-col><el-button @click="$router.push('order')" class="command-button">Commandez</el-button></el-col>

      </el-row>
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
        console.log('Trying connectionn');
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


<style>
.command{
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.el-icon-phone{
  font-size: 0.9em;

}
h1{
  padding-bottom: 1em;
}
.command-button{
  padding: 4em 8em;
}
</style>
