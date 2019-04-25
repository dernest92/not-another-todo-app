import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monthStart: {},
    events: [
      {
        date: "2019-04-07T05:00:00.000Z",
        title: "Heyoo"
      },
      {
        date: "2019-04-07T05:00:00.000Z",
        title: "another one"
      },
      {
        date: "2019-04-07T05:00:00.000Z",
        title: "birthday"
      },
      {
        date: "2019-04-07T05:00:00.000Z",
        title: "bird day"
      },
      {
        date: "2019-04-07T05:00:00.000Z",
        title: "too many"
      },
      {
        date: "2019-04-07T05:00:00.000Z",
        title: "too many"
      },
      {
        date: "2019-04-07T05:00:00.000Z",
        title: "too many"
      },
      {
        date: "2019-04-07T05:00:00.000Z",
        title: "too many"
      },
      {
        date: "2019-04-07T05:00:00.000Z",
        title: "wtf"
      }
    ]
  },

  mutations: {
    SET_MONTH_START(state, start) {
      state.monthStart = start;
    }
  },
  actions: {
    setMonthStart({ commit }, start) {
      commit("SET_MONTH_START", start);
    }
  },
  getters: {
    todaysEvents: state => date => {
      return state.events.filter(event => event.date === date);
      // return date;
      // return state.events;
    }
  }
});
