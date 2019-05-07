<template>
  <div id="app">
    <LoadingModal v-if="loading"/>
    <nav-bar class="nav-area"/>
    <SideMenu class="menu-area"/>
    <div class="content-area">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LoadingModal from "./components/LoadingModal.vue";
import moment from "moment";
import TaskService from "./services/TaskService.js";
import LoadingModalVue from "./components/LoadingModal.vue";
import NavBar from "./components/NavBar.vue";
import SideMenu from "./components/SideMenu.vue";
export default {
  name: "app",
  components: {
    LoadingModal,
    NavBar,
    SideMenu
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

#app {
  display: grid;
  grid-template-rows: 45px auto;
  grid-auto-columns: minmax(0, max-content) auto;
  grid-template-areas:
    "top top"
    "menu content";
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.nav-area {
  grid-area: top;
}

.menu-area {
  grid-area: menu;
}

.content-area {
  grid-area: content;
  background: #fff;
}

@media screen and (max-width: 700px) {
  #app {
    display: grid;
    grid-template-rows: 45px auto;
    grid-auto-columns: auto;
    grid-template-areas:
      "top"
      "content";
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .nav-area {
    grid-area: top;
  }

  .menu-area {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: auto;
    z-index: 15;
  }

  .content-area {
    grid-area: content;
    background: #fff;
  }
}
</style>
