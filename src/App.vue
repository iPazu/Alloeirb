<template>
  <div id="app">
    <router-view/>
    <div class="footer">
      <div class="content">
        <p>A VueJS / NodeJS app created by <span style="font-weight: bold"> Alex Laboirie</span></p>

      </div>

    </div>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: "ROMANUS";
  src: url("./assets/romanus.otf") format("opentype")
}
#app {
  font-family: ROMANUS, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100% ;
  background-color: #fffafc;
  background-image: url("./assets/pyramid_background.jpg");
  background-size: cover;
}

.banner{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #2c3e50;
  margin-bottom: 10px;
}
.banner > h1{
  color: white;
}
.footer{

  position:absolute;

  bottom:-80;

  width:100%;

  padding-top:35px;

  height: 80px;
  background-color: #2c3e50;
  color: white;

}

</style>
