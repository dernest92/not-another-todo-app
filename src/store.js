/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import TaskService from "./services/TaskService";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: "",
    priorities: ["high", "medium", "low"],
    loginModal: {
      isOpen: true
    },
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
      const tasks = state.tasks.filter(task => task._id !== id);
      state.tasks = tasks;
    },
    SET_LOGIN_MODAL(state, open) {
      state.loginModal.isOpen = open;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {
    async submitLogin({ commit }, credentials) {
      const res = await TaskService.login(credentials);
      const { user, token } = await res.data;
      console.log(res);
      if (res.status === 200) {
        commit("SET_USER", user);
        commit("SET_TOKEN", token);
        commit("SET_LOGIN_MODAL", false);
      } else {
        console.log("failed to log in");
      }
    },
    setLoginOpen({ commit }, open) {
      commit("SET_LOGIN_MODAL", open);
    },
    startEditTask({ commit, state }, id) {
      const task = state.tasks.find(tsk => tsk._id === id);
      commit("SET_EDIT_MODAL", true);
      commit("SET_EDIT_TASK", task);
    },
    async finishDrag({ commit, state }) {
      const selectedTask = state.tasks.find(
        task => task._id === state.dragTask
      );
      selectedTask.date = state.dragDay;
      const res = await TaskService.updateTask(selectedTask);
      if (res.status === 200) {
        commit("REMOVE_TASK", selectedTask._id);
        commit("ADD_TASK", selectedTask);
        commit("SET_DRAG_TASK", "");
        commit("SET_DRAG_DAY", "");
      } else {
        console.log(res);
      }
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
    async submitNewTask({ commit }, task) {
      try {
        const res = await TaskService.postTask(task);
        if (res.status === 201) {
          commit("ADD_TASK", task);
        } else {
          throw new Error("Failed to create");
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log(new Error("Failed to create"));
      }
    },
    async fetchTasks({ commit }) {
      const res = await TaskService.getTasks();
      const tasks = await res.data;
      commit("SET_TASKS", tasks);
    },
    async deleteTask({ commit }, id) {
      await TaskService.deleteTask(id);
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
    async updateTask({ commit, state }, task) {
      const res = await TaskService.updateTask(task);
      if (res.status === 200) {
        commit("REMOVE_TASK", task._id);
        commit("ADD_TASK", task);
      }
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
