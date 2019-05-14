import Vue from "vue";
import Router from "vue-router";

import LoginView from "./views/LoginView.vue";
import CalendarView from "./views/CalendarView.vue";
import DayView from "./views/DayView.vue";
import NewTaskView from "./views/NewTaskView.vue";
import EditTaskView from "./views/EditTaskView.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login-view",
      component: LoginView
    },
    {
      path: "/calendar",
      name: "Month",
      component: CalendarView
    },
    {
      path: "/day",
      name: "Day",
      component: DayView
    },
    {
      path: "/new-task",
      name: "New Task",
      component: NewTaskView
    },
    {
      path: "/edit-task",
      name: "Edit Task",
      component: EditTaskView
    }
  ]
});
