<template>
  <div @click="closeModal" class="modal-container">
    <div class="modal-card">
      <h2>{{displayDate}}</h2>
      <form @submit.prevent="submitNewTask">
        <div class="form-group">
          <input type="text" placeholder="title" v-model="newTask.title">
        </div>
        <div class="form-group">
          <select v-model="newTask.priority">
            <option value disabled selected class="placeholder-option">priority</option>
            <option
              v-for="(priority, index) in priorities"
              :key="index"
              :value="priority"
            >{{priority}}</option>
          </select>
        </div>
        <button type="reset" class="btn-flat">cancel</button>
        <button type="submit" class="btn primary">save</button>
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
</style>

