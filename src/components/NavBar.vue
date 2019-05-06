<template>
  <div>
    <nav class="page__navbar" :class="{'nav-open': navMenuOpen}">
      <div class="nav-contents">
        <div @click="closeNav" class="close-btn">
          <i class="fas fa-times"></i>
        </div>
        <div class="menu-btn">
          <button @click="toggleMenu">menu</button>
        </div>
        <div class="view">
          <router-link to="/calendar" class="veiw-type">Month</router-link>
          <router-link to="/day" class="veiw-type">Day</router-link>
          <router-link to="/list" class="veiw-type">List</router-link>
        </div>
        <div class="account-info">
          <button @click="logout" class="btn">Logout</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      console.log("toggle menu");
      this.$store.dispatch("toggleMenu");
    },
    logout() {
      this.$store.dispatch("logout");
    },
    closeNav() {
      this.$store.dispatch("setNavMenu", false);
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    navMenuOpen() {
      return this.$store.state.navmenu.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


