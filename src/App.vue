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
    console.log("create app ran");

    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    TaskService.setToken(token);
    if (token && user) {
      this.$store.dispatch("setUserToken", { token, user });
      await this.$store.dispatch("fetchTasks");
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

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, auto);
  background: #ccc;
}
</style>
