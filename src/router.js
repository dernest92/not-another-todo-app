import Vue from "vue";
import Router from "vue-router";

import LoginView from "./views/LoginView.vue";
import CalendarView from "./views/CalendarView.vue";

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
      name: "calendar-view",
      component: CalendarView
    }
  ]
});
