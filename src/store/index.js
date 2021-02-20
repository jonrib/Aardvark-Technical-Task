import Vue from "vue";
import Vuex from "vuex"; //vuex for global variable handling
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      apiURL: "https://dev-games-backend.advbet.com/v1/ab-roulette/1", //backend API url
      event: [], //spin history events
      log: [], //log events
      spinResult: false, //result from spin to highlight on gameboard
  },
  getters: {},
  mutations: {
      changeAPIUrl(state, payload){
          state.apiURL = payload
      },
      addEvent(state, payload){
        state.event.push(payload)
      },
      log(state, payload){
        state.log.push({time: new Date(), msg: payload, id: state.log.length++})
      },
      addSpinResult(state, payload){
        state.spinResult = payload
      }
  },
  actions: {}
 });