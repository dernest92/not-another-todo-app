<template>
  <div class="login-card">
    <div v-if="loggedIn">
      {{user.email}}
      <button @click="logout" class="btn">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
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