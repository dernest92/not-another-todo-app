/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newTaskModal: {
      isOpen: false,
      selectedDate: ""
    },
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
    },
    SET_MODAL(state, openState) {
      state.newTaskModal.isOpen = openState;
    },
    SET_MODAL_DATE(state, date) {
      state.newTaskModal.selectedDate = date;
    },
    ADD_TASK(state, task) {
      state.events.push(task);
    }
  },
  actions: {
    setMonthStart({ commit }, start) {
      commit("SET_MONTH_START", start);
    },
    startNewTask({ commit }, date) {
      commit("SET_MODAL", true);
      commit("SET_MODAL_DATE", date);
    },
    closeModal({ commit }) {
      commit("SET_MODAL", false);
    },
    submitNewTask({ commit }, task) {
      commit("ADD_TASK", task);
    }
  },
  getters: {
    todaysEvents: state => date => {
      return state.events.filter(event => event.date === date);
    },
    newTaskModal: state => {
      return state.newTaskModal.isOpen;
    },
    newTaskDate: state => {
      return state.newTaskModal.selectedDate;
    }
  }
});
