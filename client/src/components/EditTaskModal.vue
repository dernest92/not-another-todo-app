<template>
  <div @click="closeModal" class="modal-container">
    <div class="modal-card">
      <button @click="deleteTask">delete</button>
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
.modal-container {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.modal-card {
  height: 500px;
  width: 500px;
  background: #fff;
}
</style>