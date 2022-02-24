<template>
  <div class="forbiden_content">
    <img src="../assets/forbiden.png" alt="time ticking">
    <h1>Vous n'avez pas accès à cette application</h1>
    <h2>L'accès est réservé aux éleves de l'Enseirb-Matmeca</h2>
    <h2>Si vous souhaitez obtenir tout de même un accès, contactez Alex Laboirie sur le reseau social de votre choix</h2>

  </div>
</template>

<script>
export default {
  name: "Forbiden"
}
</script>

<style lang="scss">
.forbiden_content >img{
  position: absolute;
  top: 20%;
  height: 100px;
}
.forbiden_content >h1{
  padding-bottom: 1em;
}
.forbiden_content{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}
</style>