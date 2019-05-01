/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import TaskService from "./services/TaskService";
import { longStackSupport } from "q";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: "",
    loggedIn: false,
    priorities: ["high", "medium", "low"],
    loginModal: {
      isOpen: false
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
    SET_LOGGED_IN(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
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
    setUserToken({ commit }, { user, token }) {
      commit("SET_USER", user);
      commit("SET_LOGGED_IN", true);
      commit("SET_TOKEN", token);
    },
    async logout({ commit }) {
      await TaskService.logout();
      commit("SET_USER", {});
      commit("SET_TOKEN", "");
      commit("SET_LOGGED_IN", false);
      commit("SET_TASKS", []);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    async submitRegister({ commit }, credentials) {
      try {
        const res = await TaskService.register(credentials);
        console.log(res);
        const { user, token } = await res.data;
        commit("SET_USER", user);
        commit("SET_TOKEN", token);
        commit("SET_LOGGED_IN", true);
        commit("SET_LOGIN_MODAL", false);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        TaskService.setToken(token);
      } catch (e) {
        console.log("error regeistering");
      }
    },
    async submitLogin({ commit, dispatch }, credentials) {
      try {
        const res = await TaskService.login(credentials);
        const { user, token } = await res.data;
        console.log(res);
        commit("SET_USER", user);
        commit("SET_TOKEN", token);
        commit("SET_LOGIN_MODAL", false);
        commit("SET_LOGGED_IN", true);

        TaskService.setToken(token);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        dispatch("fetchTasks");
      } catch (e) {
        console.log("unable to log in");
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
          const newTask = await res.data;
          commit("ADD_TASK", { _id: newTask._id, ...task });
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
