<template>
  <div class="modal-card">
    <h2>{{displayDate}}</h2>
    <form @submit.prevent="submitNewTask">
      <b-field label="Title">
        <b-input v-model="newTask.title" placeholder="title"></b-input>
      </b-field>
      <b-field label="Priority">
        <b-select placeholder="Select a priority" expanded v-model="newTask.priority">
          <option
            v-for="(priority, index) in priorities"
            :key="index"
            :value="priority"
          >{{priority}}</option>
        </b-select>
      </b-field>
      <b-field label="Category">
        <b-select placeholder="Select a category" expanded v-model="newTask.category">
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category.id"
          >{{category.name}}</option>
        </b-select>
      </b-field>

      <b-field label="Notes">
        <b-input type="textarea" v-model="newTask.notes"></b-input>
      </b-field>
      <div class="buttons">
        <b-button type="is-light" @click="closeModal">cancel</b-button>
        <b-button type="is-primary" native-type="submit" icon-left="content-save">save</b-button>
      </div>
    </form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      newTask: {
        title: undefined,
        priority: undefined,
        date: undefined,
        notes: undefined,
        completed: false,
        category: undefined
      }
    };
  },
  methods: {
    closeModal(e) {
      this.$parent.close();
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
.buttons {
  justify-content: flex-end !important;
}
</style>

