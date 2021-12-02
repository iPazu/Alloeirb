<template>
  <div class="error_message">
    <h1>Unable to login, please contact Alex Laboirie for more information</h1>
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
  }
}

</script>

<style scoped>

</style>