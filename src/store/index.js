import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id: 'undefined'
  },
  mutations: {
    setUserID (state,newuser_id) {
      state.user_id = newuser_id;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]

})
