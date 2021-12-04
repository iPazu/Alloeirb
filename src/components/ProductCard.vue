<template>
  <div class="product-card">
        <v-card width="500px" outlined>

          <v-card-title  class="flex justify-center" >{{productData.name}}</v-card-title>

          <v-img style="margin: auto" src="../assets/crepe.png" width="50px" height="50px"/>

          <v-card-title >Combien en veux tu</v-card-title>
          <v-chip-group style="padding-bottom: 10px">
            <v-chip @click="editNumber(1)" outlined> 1</v-chip>
            <v-chip @click="editNumber(5)" outlined> 5</v-chip>
            <v-chip @click="editNumber(20)" outlined> 20</v-chip>
          </v-chip-group>
          <v-divider style="padding-bottom: 20px"></v-divider>

          <v-row style="justify-content: center">
            <v-col cols="6"   ><v-text-field
                filled
                rounded
                dense
                :value="productData.amount.toString()"
                type="number"

            ></v-text-field></v-col>
          </v-row>

      </v-card>
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
    };
  },
  methods: {
    editNumber: function(n) {
      this.productData.amount += n;
    }
  }
}
</script>

<style lang="scss">
.product-card{
  margin-left: 25px;
  margin-right: 25px;
  justify-content: center;

}

.v-card__title{
  justify-content: center;
}
.v-slide-group__content{
  justify-content: center;
}
.v-text-field input{
  text-align: center;
}
</style>