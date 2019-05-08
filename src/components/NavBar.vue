<template>
  <div>
    <nav class="page__navbar" :class="{'nav-open': navMenuOpen}">
      <div class="nav-contents">
        <div class="menu-btn">
          <b-button @click="toggleMenu" icon-left="menu" rounded></b-button>
        </div>
        <b-dropdown aria-role="list" position="is-bottom-left" :mobile-modal="false">
          <button class="button" slot="trigger">
            <span>{{currentRoute}}</span>
            <b-icon icon="menu-down"></b-icon>
          </button>
          <b-dropdown-item has-link aria-role="menuitem">
            <router-link to="/calendar" class="link">Month</router-link>
          </b-dropdown-item>
          <b-dropdown-item has-link aria-role="menuitem">
            <router-link to="/day" class="link">Day</router-link>
          </b-dropdown-item>
          <b-dropdown-item has-link aria-role="menuitem">
            <router-link to="/list" class="link">List</router-link>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    toggleMenu() {
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
    },
    currentRoute() {
      return this.$route.name.replace("-view", "");
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


