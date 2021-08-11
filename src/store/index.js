import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    productSelected: "",
    bag: {},
    bagCounter: 0
  },
  mutations:{
    setUser(state, payload) {
      state.user = payload;
    },
    setProduct(state, payload) {
      state.productSelected = payload;
    },
    setToShoppingCar(state, payload) {
      if(state.bag[payload.id] === undefined){
        state.bag[payload.id] = payload;
        state.bag[payload.id].cantidad = 1;
        state.bag = Object.assign({}, state.bag);
        this.commit("incrementBagCounter")
        return;
      }
      if (state.bag[payload.id] !== undefined) {
        state.bag[payload.id].cantidad++;
        state.bag = Object.assign({}, state.bag);
        this.commit("incrementBagCounter")
        return;
      }
    },
    unsetProduct(state, payload) {
      if (state.bag[payload.id].cantidad <= 1) return;
      state.bag[payload.id].cantidad--;
      state.bag = Object.assign({}, state.bag);
      this.commit("decrementBagCounter")
    },
    deleteProduct(state, payload) {
      const cantidad = state.bag[payload.id].cantidad;
      state.bagCounter -= cantidad;
      delete state.bag[payload.id];
      state.bag = Object.assign({}, state.bag);
    },
    resetBagCounter(state){
      state.bagCounter = 0
    },
    incrementBagCounter(state) {
      state.bagCounter = state.bagCounter + 1; 
    },
    decrementBagCounter(state) {
      state.bagCounter = state.bagCounter - 1; 
    },
    
  },
  actions: {
    aumentarProducto({ commit }, producto) {
      commit('setToShoppingCar', producto);
    },
    disminuirProducto({ commit }, payload) {
      commit('unsetProduct', payload);
    },
    eliminarProducto({ commit }, payload) {
      commit('deleteProduct', payload);
    },
  },
  modules: {
  }
})
