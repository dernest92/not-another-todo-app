<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import moment from "moment";
import TaskService from "./services/TaskService.js";
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  async created() {
    console.log("create app ran");

    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    TaskService.setToken(token);
    if (token && user) {
      this.$store.dispatch("setUserToken", { token, user });
      await this.$store.dispatch("fetchTasks");
    }

    const today = moment()
      .startOf("day")
      .toISOString();
    this.$store.dispatch("setCurrentDay", today);
  }
};
</script>



<style lang="scss">
@import "./assets/styles/global.scss";

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, auto);
  background: #ccc;
}
</style>
