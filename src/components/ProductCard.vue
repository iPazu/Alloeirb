<template>
  <div class="product-card">
        <v-card width="500px" elevation="6" rounded="xl"  color="blue lighten-5" outlined>

          <v-card-title  class="flex justify-center" >{{productData.display_name.toString()}}</v-card-title>
          <v-divider style="padding-bottom: 20px"></v-divider>

          <v-img style="margin: auto" :src="require(`../assets/${productData.icon_url.toString()}`)" width="50px" height="50px"/>
          <p style="font-weight: bold" class="price">{{productData.unit_price }} €</p>
          <p style="padding-bottom: 5px">Combien en veux-tu</p>
          <v-chip-group style="padding-bottom: 10px">
            <v-chip @click="editNumber(-1)" outlined> -</v-chip>
            <v-chip @click="editNumber(1)" outlined> +</v-chip>
          </v-chip-group>
          <v-divider style="padding-bottom: 20px"></v-divider>

          <v-row style="justify-content: center">
            <v-col cols="6"   >
              <v-text-field
                  :rules="validNumber"
                filled
                rounded
                dense
                  maxlength="2"
                v-model="productData.amount"

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
      validNumber: [v =>  !isNaN(v) || 'Entrez un nombre valide'],
    };
  },
  methods: {
    editNumber: function(n) {
      if(parseInt(this.productData.amount) === 0 && n === -1){
        return
      }
        this.productData.amount = parseInt(this.productData.amount) +n;
        console.log(this.productData.amount)
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


.v-slide-group__content{
  justify-content: center;
}
.v-text-field input{
  text-align: center;
}
p{
  padding-top: 20px;
  font-size: 1.2em;
}
</style>
