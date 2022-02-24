<template>
  <div class="down_content">
    <img src="../assets/sand-clock.png" alt="no access" >
    <h1>Les allos ne sont pas disponibles pour le moment</h1>
    <h2>Suivez les communications de Rams'eirb pour la prochaine réouverture des livraisons</h2>

  </div>

</template>

<script>
export default {
  name: "Forbiden",
  mounted() {
    if(process.env.VUE_APP_DISPONIBLE === 'true'){
      window.location.href = process.env.CLIENT_URL
    }
  }
}
</script>

<style lang="scss">
.down_content >img{
  position: absolute;
  top: 20%;
  height: 100px;
}
.down_content >h1{
  padding-bottom: 1em;
}
.down_content{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}
</style>