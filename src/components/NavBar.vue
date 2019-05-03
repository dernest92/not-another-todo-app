<template>
  <div>
    <nav class="nav-container" :class="{'nav-open': navMenuOpen}">
      <div class="nav-contents">
        <div @click="closeNav" class="close-btn">
          <i class="fas fa-times"></i>
        </div>
        <div class="view">
          <router-link to="/calendar" class="veiw-type">Month</router-link>
          <router-link to="/day" class="veiw-type">Week</router-link>
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
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  background: #34495e;
  color: #fff;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.5s;
  .btn {
    background: #41b883;
  }
  .nav-contents {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 5px;

    .close-btn {
      display: none;
    }
  }
}

.background {
  opacity: 0;
  transition: all 0.25s;
  pointer-events: none;
}

.veiw-type {
  padding: 5px;
  margin: 5px;
  color: #fff;
}

@media screen and (max-width: 700px) {
  .nav-container {
    display: flex;

    opacity: 0;
    pointer-events: none;
    justify-content: center;
    top: 0;
    height: 100%;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.25);
    .nav-contents {
      .close-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: -10px;
        right: -5px;
        height: 25px;
        width: 25px;
        border-radius: 50%;
        background: red;
        cursor: pointer;
      }
      display: block;
      width: fit-content;
      position: relative;
      background: #34495e;
      padding: 15px;
      border-radius: 10px;
      & > div {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin: 5px 0;
      }
    }
    &.nav-open {
      opacity: 1;
      pointer-events: all;
    }
  }
}
</style>

