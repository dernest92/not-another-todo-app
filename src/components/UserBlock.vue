<template>
  <div class="login-card">
    <div v-if="loggedIn">
      {{user.email}}
      <button @click="logout" class="btn">Logout</button>
    </div>
    <button v-else @click="openModal" class="btn">Login</button>
  </div>
</template>

<script>
export default {
  methods: {
    openModal() {
      this.$store.dispatch("setLoginOpen", true);
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  }
};
</script>

<style lang="scss" scoped>
.login-card {
  background: transparent;
  .btn {
    margin-left: 10px;
  }
}
</style>
