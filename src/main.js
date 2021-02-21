import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios' //axios import
import VueAxios from 'vue-axios' //vue axios wrapper for axios integration with vue
import vuetify from './plugins/vuetify' //importing vuetify
import store from "./store" //global variables

Vue.config.productionTip = false

//component imports
const mainpage = () => import('./components/MainPage.vue')
const roulettepage = () => import('./components/RoulettePage.vue')
const gameBoardAndSpin = () => import('./components/GameBoardAndSpin.vue')
const statsAndAction = () => import('./components/StatsAndAction.vue')

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

 //vue router configuration
 let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: mainpage,
    },
    {
      path: '/mainpage',
      component: mainpage,
    },
    {
      path: '/statsAndAction', //statistics and actions log
      component: statsAndAction,
    },
    {
      path: '/gameBoardAndSpin', //gameboard and spin timer
      component: gameBoardAndSpin,
    },
    {
      path: '/roulettePage', //all components in one page
      component: roulettepage,
    }
  ]
})

new Vue({
  store,
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  vuetify
})