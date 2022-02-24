<template>
<div class="forbiden_content">
  <img src="../assets/sand-clock.png" alt="no access" >
  <h1>Les allos ne sont pas disponibles pour le moment</h1>
  <h2>Suivez les communications de Rams'eirb pour la prochaine réouverture des livraisons</h2>

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