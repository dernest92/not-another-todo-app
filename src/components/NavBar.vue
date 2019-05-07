<template>
  <div>
    <nav class="page__navbar" :class="{'nav-open': navMenuOpen}">
      <div class="nav-contents">
        <div class="menu-btn">
          <button @click="toggleMenu">??</button>
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
.menu-btn {
  display: fixed;
  top: 5px;
  right: 5px;
  z-index: 20;
}
</style>


