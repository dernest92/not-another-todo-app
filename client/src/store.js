import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monthStart: {}
  },
  events: [
    {
      date: "2019-04-07T05:00:00.000Z",
      title: "Heyoo"
    }
  ],
  mutations: {
    SET_MONTH_START(state, start) {
      state.monthStart = start;
    }
  },
  actions: {
    setMonthStart({ commit }, start) {
      commit("SET_MONTH_START", start);
    }
  }
});
