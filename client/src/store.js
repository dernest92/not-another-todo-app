/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import TaskService from "./services/TaskService";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newTaskModal: {
      isOpen: false,
      selectedDate: ""
    },
    monthStart: {},
    tasks: []
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
      state.tasks.push(task);
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
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
    },
    async fetchTasks({ commit }) {
      const res = await TaskService.getTasks();
      const tasks = await res.data;
      commit("SET_TASKS", tasks);
      console.log(tasks);
    }
  },
  getters: {
    todaysTasks: state => date => {
      return state.tasks.filter(event => event.date === date);
    },
    newTaskModal: state => {
      return state.newTaskModal.isOpen;
    },
    newTaskDate: state => {
      return state.newTaskModal.selectedDate;
    }
  }
});
