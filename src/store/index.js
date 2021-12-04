import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id: 'undefined',
    products: [
       {
        id: "crepenut",
        display_name: "Crepe au nutella",
        unit_price:"0.15",
        amount:0,
        icon_url:"crepe-nutella.png"
      },
      {
          id: "crepsucre",
          display_name:"Crepe au sucre",
          unit_price:"0.10",
          amount:0,
          icon_url:"crepe-sucre.png"
      },
       {   id: "crepeconf",
           display_name:"Crepe à la confiture",
           unit_price:"0.15",
           amount:0,
           icon_url:"crepe-confiture.png"
      },
    ],
  },
  mutations: {
    setUserID (state,newuser_id) {
      state.user_id = newuser_id;
    }
  },
  getters: {
        getTotalCheckout: state => {
            let total = 0;
            state.products.map(product =>{
                total += product.amount*product.unit_price;
            })
            return total;
        }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]

})
