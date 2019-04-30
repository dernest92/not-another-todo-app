/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    priorities: ["high", "medium", "low"],
    newTaskModal: {
      isOpen: false,
      selectedDate: ""
    },
    editTaskModal: {
      isOpen: false,
      selectedTask: {}
    },
    monthStart: {},
    tasks: [],
    dragTask: "",
    dragDay: ""
  },

  mutations: {
    SET_EDIT_MODAL(state, modalStatus) {
      state.editTaskModal.isOpen = modalStatus;
    },
    SET_EDIT_TASK(state, task) {
      state.editTaskModal.selectedTask = task;
    },
    SET_DRAG_TASK(state, task) {
      state.dragTask = task;
    },
    SET_DRAG_DAY(state, day) {
      state.dragDay = day;
    },
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
    },
    REMOVE_TASK(state, id) {
      const tasks = state.tasks.filter(task => task.id !== id);
      state.tasks = tasks;
    }
  },
  actions: {
    startEditTask({ commit, state }, id) {
      const task = state.tasks.find(tsk => tsk.id === id);
      commit("SET_EDIT_MODAL", true);
      commit("SET_EDIT_TASK", task);
    },
    async finishDrag({ commit, state }) {
      const selectedTask = state.tasks.find(task => task.id === state.dragTask);
      selectedTask.date = state.dragDay;
      commit("REMOVE_TASK", selectedTask.id);
      commit("ADD_TASK", selectedTask);
      commit("SET_DRAG_TASK", "");
      commit("SET_DRAG_DAY", "");
    },
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
      task.id = Math.ceil(Math.random() * 10000);
      commit("ADD_TASK", task);
    },
    fetchTasks({ commit }) {
      const tasks = [
        {
          title: "no date, important",
          priority: "high",
          date: false,
          notes: "this task has not been assigned a date",
          completed: false,
          id: 1
        },
        {
          title: "no date less important",
          priority: "medium",
          date: false,
          notes: "this task has not been assigned a date",
          completed: false,
          id: 4
        },
        {
          title: "task for today",
          priority: "low",
          date: moment()
            .startOf("day")
            .toISOString(),
          notes: "this is a task for today",
          completed: false,
          id: 2
        },
        {
          title: "task for yesterday",
          priority: "low",
          date: moment()
            .startOf("day")
            .add(-1, "days")
            .toISOString(),
          notes: "this is a task for yesterday. it is complete",
          completed: true,
          id: 3
        }
      ];

      commit("SET_TASKS", tasks);
    },
    deleteTask({ commit }, id) {
      commit("REMOVE_TASK", id);
    },
    setDragTask({ commit }, task) {
      commit("SET_DRAG_TASK", task);
    },
    setDragDay({ commit }, day) {
      commit("SET_DRAG_DAY", day);
    },
    editModalClose({ commit }) {
      commit("SET_EDIT_MODAL", false);
    },
    updateTask({ commit, state }, task) {
      commit("REMOVE_TASK", task.id);
      commit("ADD_TASK", task);
    }
  },
  getters: {
    unassignedTasks: state => {
      return state.tasks.filter(task => task.date === false);
    },
    todaysTasks: state => date => {
      return state.tasks.filter(event => event.date === date);
    },
    newTaskModal: state => {
      return state.newTaskModal.isOpen;
    },
    editTaskModal: state => {
      return state.editTaskModal;
    },
    newTaskDate: state => {
      return state.newTaskModal.selectedDate;
    },
    dragDay: state => {
      return state.dragDay;
    },
    priorities: state => {
      return state.priorities;
    }
  }
});
