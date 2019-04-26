<template>
  <div @click="closeModal" class="modal-container">
    <div class="modal-card">
      New task for {{displayDate}}
      <form @submit.prevent="submitNewTask">
        <input type="text" placeholder="title" v-model="newTask.title">
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      newTask: {
        title: "",
        date: ""
      }
    };
  },
  methods: {
    closeModal(e) {
      if (e.target.classList.contains("modal-container")) {
        this.$store.dispatch("closeModal");
      }
    },
    submitNewTask() {
      this.$store.dispatch("submitNewTask", this.newTask);
      this.$store.dispatch("closeModal");
    }
  },
  computed: {
    dateFromCal() {
      return this.$store.getters.newTaskDate;
    },
    displayDate() {
      return moment(this.newTask.date).format("MMMM D, YYYY");
    }
  },
  created() {
    this.newTask.date = this.dateFromCal;
  }
};
</script>

<style lang="scss" scoped>
.modal-container {
  position: absolute;
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

