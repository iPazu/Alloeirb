<template>
  <div id="app">

    <router-view/>

  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-color: #fffafc;
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
</style>
