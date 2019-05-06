<template>
  <div id="app">
    <LoadingModal v-if="loading"/>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import LoadingModal from "./components/LoadingModal.vue";
import moment from "moment";
import TaskService from "./services/TaskService.js";
import LoadingModalVue from "./components/LoadingModal.vue";
import NavBar from "./components/NavBar.vue";
export default {
  name: "app",
  components: {
    LoadingModal,
    NavBar
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  async created() {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    TaskService.setToken(token);
    if (token && user) {
      this.$store.dispatch("setUserToken", { token, user });
      await this.$store.dispatch("fetchTasks");
      await this.$store.dispatch("fetchCategories");
    } else {
      this.$store.dispatch("setLoading", false);
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
@import "./assets/styles/layout.scss";

@import "./assets/styles/layout-mobile.scss";
</style>
