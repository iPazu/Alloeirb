<template>
  <div class="product-card">
    <el-row><h1>{{productData.name}}</h1></el-row>
    <el-row><img class='icon' src="../assets/crepe.png" alt="Crepe image"></el-row>
    <el-input-number class="input" v-model="number" @change="handleChange" :min="1" :max="50"></el-input-number>

  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    productData: Object
  },
  data() {
    return {
      radio1: 1,
      number: 1
    };
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },

  }
}
</script>

<style scoped>
.product-card{
  margin-right: auto;
  margin-left: auto;

  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  background-color: whitesmoke;
  width: 25%;
  height: 25%;

}
.icon{
  align-items: center;
  width: 25%;
  padding-bottom: 15%;
  height: 25%;

}
.input{
  padding-bottom: 10%;
}
</style>