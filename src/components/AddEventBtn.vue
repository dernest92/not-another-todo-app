<template>
  <div @click="addEvent" id="add-event">
    <i class="mdi mdi-plus mdi-24px"></i>
  </div>
</template>

<script>
export default {
  props: {
    date: String
  },
  methods: {
    addEvent() {
      if (this.date) {
        this.$store.dispatch("startNewTask", this.date);
      }
      this.$router.push("/new-task");
    }
  }
};
</script>

<style scoped>
#add-event {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: #333;
  color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.375);
  cursor: pointer;
}
</style>
