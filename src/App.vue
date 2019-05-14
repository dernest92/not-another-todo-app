<template>
  <div>
    <BugerBtn @toggle="toggleMenu" class="burger-btn"/>
    <div id="app">
      <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>
      <SideMenu v-if="showNav" class="menu-area"/>
      <div class="content-area">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import BugerBtn from "./components/BurgerBtn";
import moment from "moment";
import TaskService from "./services/TaskService.js";
import NavBar from "./components/NavBar.vue";
import SideMenu from "./components/SideMenu.vue";

export default {
  name: "app",
  components: {
    NavBar,
    SideMenu,
    BugerBtn
  },
  data() {
    return {};
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch("toggleMenu");
    }
  },
  computed: {
    showNav() {
      return this.$route.name !== "login-view";
    },
    loading() {
      return this.$store.state.loading;
    },
    newModalOpen: {
      get() {
        return this.$store.state.newTaskModal.isOpen;
      },
      set() {
        this.$store.dispatch("closeModal");
      }
    },
    editModalOpen: {
      get() {
        return this.$store.state.editTaskModal.isOpen;
      },
      set() {
        this.$store.dispatch("editModalClose");
      }
    },
    showComplete() {
      return this.$store.state.showCompleted;
    },
    filterCategories() {
      return this.$store.state.filterCategory;
    },
    selectedCategories() {
      return this.$store.state.selectedCategories;
    },
    tasks() {
      return this.$store.getters.filteredTasks;
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
.burger-btn {
  position: fixed;
  top: 5px;
  left: 5px;
}

// Custom variables here
$navbar-height: 20px;
$navbar-padding-vertical: 8px;
$vue-green: #41b883;
$vue-dark-green: #35495e;
$primary: $vue-dark-green;
$link: $vue-green;

// Bulma styling here
@import "~bulma/sass/utilities/_all";
@import "~bulma";
@import "~buefy/src/scss/buefy";

// Custom Styling here
@import "./assets/styles/global.scss";
@import "./assets/styles/layout.scss";

// .button {
//   box-shadow: 5px 5px 10px black;
// }

#app {
  display: grid;
  grid-auto-columns: minmax(0, max-content) auto;
  grid-template-areas: "menu content";
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
  height: 100%;
  overflow-y: auto;
  position: relative;
}

@media screen and (max-width: 700px) {
  #app {
    grid-auto-columns: auto;
    grid-template-areas: "content";
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
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: auto;
  }
}
</style>
