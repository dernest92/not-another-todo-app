<template>
  <div class="login-card">
    <button @click="openModal" class="btn">Login</button>
  </div>
</template>

<script>
export default {
  methods: {
    openModal() {
      this.$store.dispatch("setLoginOpen", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.login-card {
  background: #fff;
}
</style>
