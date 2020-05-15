import Vue from 'vue'
import Vuex from 'vuex'
//使用vuex-persistedstate持久化vuex状态
import createPersistedState   from 'vuex-persistedstate'
import user from "./user";
import step from "./step";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    step
  },
  // plugins:[createPersistedState ()], //把VUEX中的所有数据存到localStorage中
  plugins:[createPersistedState({ storage: window.sessionStorage })]
})
