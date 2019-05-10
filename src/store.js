/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import TaskService from "./services/TaskService";
import router from "./router.js";
import moment from "moment";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showCompleted: false,
    filterCategory: false,
    selectedCategories: [],
    categories: [],
    loading: true,
    navmenu: {
      isOpen: false
    },
    dayView: {
      currentDay: ""
    },
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
    dragDay: "",
    sideMenu: true,
    sideMenuMobile: false
  },

  mutations: {
    SET_SHOW_COMPLETED(state, showCompleted) {
      state.showCompleted = showCompleted;
    },
    TOGGLE_CAT_FILTER(state, filter) {
      state.filterCategory = filter;
    },
    SET_SELECTED_CATEGORIES(state, categories) {
      state.selectedCategories = categories;
    },
    SET_SIDE_MENU(state, isOpen) {
      state.sideMenu = isOpen;
    },
    SET_SIDE_MENU_MOBILE(state, isOpen) {
      state.sideMenuMobile = isOpen;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_NAV_MENU(state, menuState) {
      state.navmenu.isOpen = menuState;
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task._id === updatedTask._id);
      state.tasks[index] = updatedTask;
      state.tasks.push("blank");
      state.tasks.pop();
    },
    SET_CURRENT_DAY(state, day) {
      state.dayView.currentDay = day;
    },
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
    setShowCompleted({ commit }, showCompleted) {
      commit("SET_SHOW_COMPLETED", showCompleted);
    },
    toggleCatFilter({ commit }, filter) {
      commit("TOGGLE_CAT_FILTER", filter);
    },
    selectCategory({ commit }, categories) {
      commit("SET_SELECTED_CATEGORIES", categories);
    },
    async addCategory({ commit, state }, newCat) {
      const categories = state.categories;

      const res = await TaskService.createCategory(newCat);
      const newCatRes = await res.data;
      categories.push(newCatRes);
      commit("SET_CATEGORIES", categories);
    },
    toggleMenu({ commit, state }) {
      const menuOpen = !state.sideMenu;
      const menuOpenMobile = !state.sideMenuMobile;
      commit("SET_SIDE_MENU", menuOpen);
      commit("SET_SIDE_MENU_MOBILE", menuOpenMobile);
    },
    closeMobileMenu({ commit }) {
      commit("SET_SIDE_MENU_MOBILE", false);
    },
    setCategories({ commit }, categories) {
      commit("SET_CATEGORIES", categories);
    },
    async fetchCategories({ commit }) {
      const res = await TaskService.getCategories();
      const categories = await res.data;
      commit("SET_CATEGORIES", categories);
    },
    setLoading({ commit }, loading) {
      commit("SET_LOADING", loading);
    },
    setNavMenu({ commit }, menuState) {
      commit("SET_NAV_MENU", menuState);
    },
    setUserToken({ commit }, { user, token }) {
      commit("SET_USER", user);
      commit("SET_LOGGED_IN", true);
      commit("SET_TOKEN", token);
    },
    async logout({ commit }) {
      commit("SET_LOADING", true);
      await TaskService.logout();
      commit("SET_USER", {});
      commit("SET_TOKEN", "");
      commit("SET_LOGGED_IN", false);
      commit("SET_TASKS", []);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push({ name: "login-view" });
      commit("SET_LOADING", false);
    },
    async submitRegister({ commit }, credentials) {
      try {
        commit("SET_LOADING", true);
        const res = await TaskService.register(credentials);
        const { user, token } = await res.data;
        commit("SET_USER", user);
        commit("SET_TOKEN", token);
        commit("SET_LOGGED_IN", true);
        commit("SET_LOGIN_MODAL", false);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        TaskService.setToken(token);
      } catch (e) {
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async submitLogin({ commit, dispatch }, credentials) {
      try {
        commit("SET_LOADING", true);
        const res = await TaskService.login(credentials);
        const { user, token } = await res.data;
        commit("SET_USER", user);
        commit("SET_TOKEN", token);
        commit("SET_LOGGED_IN", true);
        TaskService.setToken(token);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        dispatch("fetchTasks");
      } catch (e) {
      } finally {
        commit("SET_LOADING", false);
      }
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
        commit("UPDATE_TASK", selectedTask);
        commit("SET_DRAG_TASK", "");
        commit("SET_DRAG_DAY", "");
      } else {
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
      } catch (e) {}
    },
    async fetchTasks({ commit }) {
      const res = await TaskService.getTasks();
      const tasks = await res.data;
      commit("SET_TASKS", tasks);
      commit("SET_LOADING", false);
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
        commit("UPDATE_TASK", task);
      }
    },
    setCurrentDay({ commit }, day) {
      commit("SET_CURRENT_DAY", day);
    }
  },
  getters: {
    selectedTasks: state => {
      if (state.selectedCategories.length === 0) {
        return state.tasks;
      } else {
        return state.tasks.filter(task =>
          state.selectedCategories.includes(task.category)
        );
      }
    },
    categories: state => {
      return state.categories.map(category => {
        return {
          name: category.name,
          id: category._id
        };
      });
    },
    unassignedTasks: state => {
      return state.tasks.filter(task => task.date === false);
    },
    todaysTasks: state => date => {
      if (state.filterCategory) {
        return state.tasks.filter(
          event =>
            event.date === date &&
            state.selectedCategories.includes(event.category)
        );
      } else {
        return state.tasks.filter(event => event.date === date);
      }
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
    },
    pastDueTasks: state => {
      const today = moment()
        .startOf("day")
        .toISOString();
      const tasks = state.tasks.filter(
        task => task.date !== false && task.completed === false
      );
      return tasks.filter(
        task => task.date && moment(task.date).isSameOrBefore(today)
      );
    },
    taskQuery: state => query => {
      return state.tasks.filter(task => query(task));
    }
  }
});
