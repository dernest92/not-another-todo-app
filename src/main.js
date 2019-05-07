import Vue from "vue";
import App from "./App.vue";
import store from "./store.js";
import router from "./router";
import ToggleSlider from "./components/ToggleSlider.vue";

Vue.component("toggle-slider", ToggleSlider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
