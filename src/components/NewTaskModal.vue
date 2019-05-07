<template>
  <div v-if="modalOpen" @click="closeModal" class="modal-container close-modal">
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
          <label for>Category</label>
          <select v-model="newTask.category" class="full">
            <option value disabled selected class="placeholder-option">category</option>
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.id"
            >{{category.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Notes</label>
          <textarea @input="resize" class="txt-area" id cols="50" rows="15" v-model="newTask.notes"></textarea>
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
        notes: "",
        completed: false,
        category: ""
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
    },
    resize(e) {
      const field = e.currentTarget;
      const offset = field.offsetHeight - field.clientHeight;
      field.style.height = field.scrollHeight + offset + "px";
    }
  },
  computed: {
    modalOpen() {
      return this.$store.state.newTaskModal.isOpen;
    },
    categories() {
      return this.$store.getters.categories;
    },
    dateFromCal() {
      return this.$store.getters.newTaskDate;
    },
    displayDate() {
      if (this.newTask.date) {
        return moment(this.newTask.date).format("MMMM D, YYYY");
      } else {
        return "No Date";
      }
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

