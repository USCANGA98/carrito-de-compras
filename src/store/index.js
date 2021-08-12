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
        state.bag[payload.id] = { ...payload }; 
        console.log(state.bag)
        state.bag[payload.id].cantidad = 1;
        this.commit("incrementBagCounter")
        return;
      }
      if (state.bag[payload.id] !== undefined) {
        state.bag[payload.id].cantidad++;
        state.bag = Object.assign({}, state.bag);
        state.bag[payload.id].status = 'carrito';
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
    resetProduct(state){
      state.bag = {}
      state.bagCounter = 0;
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
    comprarProducto({ commit }, payload) {
      commit('setToShoppingCar', payload);
    },
    vaciarProducto({ commit }, payload) {
      commit('resetProduct', payload);
    },
    
  },
  modules: {
  }
})
