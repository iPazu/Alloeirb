import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      user_id: 'undefined',
      order_id: 'undefined',
      products: 'undefined',
      privilege: 'customer',
      map: '',
      codes: [],
      deliveryTime: 0,
      coursierLocation: null,
  },
  mutations: {
      setUserID (state,newuser_id) {
        state.user_id = newuser_id;
      },
      setOrderID (state,orderid) {
          state.order_id = orderid;
      },
      setProducts (state,products) {
          state.products = products;
      },
      setPrivilege (state,privilege) {
          state.privilege = privilege;
      },
      setMap (state,map) {
          state.map = map;
      },
      setCoursierLocation (state,location) {
          state.coursierLocation = location;
      },
      setDeliveryTime (state,time) {
          state.deliveryTime = time;
      },
      addCode (state,code) {
          console.log("adding code")
          console.log(code)
          alert(code)

          state.codes.push(code)
      },

      resetProductAmount(state){
          state.products.map(p => {
              p.amount = 0
          })
      }

  },
  getters: {
        getTotalCheckout: state => {
            let total = 0;
            state.products.map(product =>{
                total += product.amount*product.unit_price;
            })
            return total;
        },
      getPromotion: state => {
          let promotion = 0
          state.codes.map((c) => {
              let cp = Object.values(c)[0]
              if(cp > promotion){
                  promotion = cp
              }
          })
          console.log(promotion)
          return promotion
      },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]

})
