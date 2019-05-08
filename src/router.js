import Vue from "vue";
import Router from "vue-router";

import LoginView from "./views/LoginView.vue";
import CalendarView from "./views/CalendarView.vue";
import DayView from "./views/DayView.vue";
import ListView from "./views/ListView.vue";

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
      path: "/list",
      name: "List",
      component: ListView
    }
  ]
});
