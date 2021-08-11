import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from "../store/index";

Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
  if (Vuex.state.user != "") {
    next();
  } else {
    next({name: 'Home'});
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import(/* webpackChunkName: "about" */ '../views/Store.vue'),
    beforeEnter: ifAuthenticated
    
  },
  {
    path: '/reset-password',
    name: 'Reset-Password',
    component: () => import(/* webpackChunkName: "home" */ "../views/ResetPassword.vue")
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: () => import(/* webpackChunkName: "home" */ "../views/CreateAccount.vue")
  },
  {
    path: '/product-view',
    name: 'ProductView',
    component: () => import(/* webpackChunkName: "home" */ "../views/ProductView.vue"),
    beforeEnter: ifAuthenticated
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
