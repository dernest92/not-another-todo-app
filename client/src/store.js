/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import TaskService from "./services/TaskService";
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
      const res = await TaskService.updateTask(selectedTask);
      if (res.status === 200) {
        commit("REMOVE_TASK", selectedTask.id);
        commit("ADD_TASK", selectedTask);
        commit("SET_DRAG_TASK", "");
        commit("SET_DRAG_DAY", "");
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
        task.id = Math.ceil(Math.random() * 10000);
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
        commit("REMOVE_TASK", task.id);
        commit("ADD_TASK", task);
      }
    }
  },
  getters: {
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
