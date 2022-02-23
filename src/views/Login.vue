<template>
  <div class="error_message">

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