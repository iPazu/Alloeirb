<template>
  <div class="error_message">
    <h1>Si vous voyez cette page un petit reload devrait résoudre le problème</h1>
    <h2>Ticket: {{$route.params.ticket}}</h2>
    <h2>Token: {{$route.params.token}}</h2>
  </div>
</template>

<script>
import * as user from '../script/User'

export default {
  name: "Login",
  created() {
    let token = this.$route.params.token
    let ticket = this.$route.params.ticket
    console.log("ticket: "+ticket)
    console.log("token: "+token)
    user.login(token,ticket);
    console.log("Trying to fetch products");
    
  }
}

</script>

<style scoped>

</style>