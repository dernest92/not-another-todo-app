<template>
  <div @click="closeModal" class="modal-container">
    <div class="modal-card">
      New task for {{displayDate}}
      <form @submit.prevent="submitNewTask">
        <div class="form-group">
          <input type="text" placeholder="title" v-model="newTask.title">
        </div>
        <div class="form-group">
          <select v-model="newTask.priority">
            <option value disabled selected hidden>priority</option>
            <option
              v-for="(priority, index) in priorities"
              :key="index"
              :value="priority"
            >{{priority}}</option>
          </select>
        </div>
        <button type="submit">save</button>
        <button type="reset">cancel</button>
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
        priority: "",
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
    },
    priorities() {
      return this.$store.getters.priorities;
    }
  },
  created() {
    this.newTask.date = this.dateFromCal;
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

