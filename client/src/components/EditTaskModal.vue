<template>
  <div @click="closeModal" class="modal-container">
    <div class="modal-card">
      <button @click="deleteTask" class="btn danger">delete</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {};
  },
  methods: {
    closeModal(e) {
      if (e.target.classList.contains("modal-container")) {
        this.$store.dispatch("editModalClose");
      }
    },
    async deleteTask() {
      await this.$store.dispatch(
        "deleteTask",
        this.editModalState.selectedTask
      );
      this.$store.dispatch("editModalClose");
    }
  },
  computed: {
    editModalState() {
      return this.$store.getters.editTaskModal;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>