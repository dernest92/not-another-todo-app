<template>
  <div @click="closeModal" class="modal-container close-modal">
    <div class="modal-card">
      <h2>{{displayDate}}</h2>
      <form @submit.prevent="submitNewTask">
        <div class="form-group">
          <label for>Title</label>
          <input class="full" type="text" placeholder="title" v-model="newTask.title" required>
        </div>
        <div class="form-group">
          <label for>Priority</label>
          <select v-model="newTask.priority" class="full">
            <option value disabled selected class="placeholder-option">priority</option>
            <option
              v-for="(priority, index) in priorities"
              :key="index"
              :value="priority"
            >{{priority}}</option>
          </select>
        </div>
        <div class="form-group">
          <label for>Notes</label>
          <textarea name id cols="50" rows="15" v-model="newTask.notes"></textarea>
        </div>
        <div class="btn-group">
          <button @click="closeModal" type="reset" class="btn btn-flat close-modal">cancel</button>
          <button type="submit" class="btn primary">save</button>
        </div>
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
        date: "",
        notes: ""
      }
    };
  },
  methods: {
    closeModal(e) {
      if (e.target.classList.contains("close-modal")) {
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
.btn-group {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  .btn {
    margin-left: 10px;
  }
}
</style>

