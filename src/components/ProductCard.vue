<template>
  <div class="product-card">
    <template>

      <v-card max-width="250">
        <v-card-title class="flex justify-center" >{{productData.name}}</v-card-title>

        <v-img max-height="100"
               max-width="100" align="center" src="../assets/crepe.png"></v-img>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>Combien en veux tu</v-card-title>

        <v-card-text>
          <v-chip-group
              align="center"
              active-class="deep-purple accent-4 white--text"
              column
          >
            <v-chip>{{productData.amount1}}</v-chip>

            <v-chip>{{productData.amount2}}</v-chip>

            <v-chip>{{productData.amount3}}</v-chip>
          </v-chip-group>
        </v-card-text>
      </v-card>
    </template>

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

<style lang="scss">
.product-card{
  margin-right: auto;
  margin-left: auto;

  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  background-color: whitesmoke;
  width: 25%;
  height: 25%;

}
.v-card__title {

  justify-content: center;
}
.v-slide-group__content{
  justify-content: center;
}


</style>