<template>
  <div>
    <nav class="nav-container" :class="{'nav-open': navMenuOpen}">
      <div>{{user.email}}</div>
      <button @click="logout" class="btn">Logout</button>
    </nav>
    <div @click="closeNav" class="background" :class="{'nav-open': navMenuOpen}"></div>
  </div>
</template>

<script>
export default {
  methods: {
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
.nav-container {
  & > div {
    margin: 0 5px;
  }
  padding: 0 5px;
  position: fixed;
  display: flex;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: #34495e;
  color: #fff;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.5s;
  .btn {
    background: #41b883;
  }
}

.background {
  opacity: 0;
  transition: all 0.25s;
  pointer-events: none;
}

@media screen and (max-width: 700px) {
  .nav-container {
    top: -48px;
    &.nav-open {
      top: 0px;
    }
  }

  .background {
    &.nav-open {
      opacity: 1;
      display: flex;
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 4;
      pointer-events: all;
    }
  }
}
</style>

