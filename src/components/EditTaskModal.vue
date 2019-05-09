<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <form @submit.prevent="updateTask">
        <b-field label="Title">
          <b-input v-model="taskEdits.title" placeholder="title"></b-input>
        </b-field>
        <b-field label="Date">
          <b-datepicker placeholder="Select date..." icon="calendar-today" v-model="datepickerDate"></b-datepicker>
        </b-field>

        <b-field label="Category">
          <b-select placeholder="Select a category" expanded v-model="taskEdits.category">
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.id"
            >{{category.name}}</option>
          </b-select>
        </b-field>
        <b-field label="Priority">
          <b-select placeholder="Select a priority" expanded v-model="taskEdits.priority">
            <option
              v-for="(priority, index) in priorities"
              :key="index"
              :value="priority"
            >{{priority}}</option>
          </b-select>
        </b-field>

        <b-field label="Notes">
          <b-input type="textarea" v-model="taskEdits.notes"></b-input>
        </b-field>
        <b-field label="Complete">
          <b-checkbox v-model="taskEdits.completed"></b-checkbox>
        </b-field>
      </form>
    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        <b-button type="is-light" @click="closeModal">cancel</b-button>
        <b-button type="is-danger" icon-left="delete" @click="deleteTask">delete</b-button>
        <b-button
          type="is-primary"
          icon-left="content-save"
          @click="updateTask"
          :disabled="!hasEdits"
        >save</b-button>
      </div>
    </footer>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      taskEdits: {},
      searchCategory: ""
    };
  },
  methods: {
    log(msg) {
      console.log(msg);
    },
    addCategory() {
      this.$dialog.prompt({
        message: "Category",
        inputAttrs: {
          placeholder: "e.g. Business",
          maxlength: 20,
          value: this.name
        },
        confirmText: "Add",
        onConfirm: value => {
          this.$store.dispatch("addCategory", { name: value });
        }
      });
    },
    async updateTask() {
      if (this.hasEdits) {
        await this.$store.dispatch("updateTask", this.taskEdits);
        this.closeModal();
      } else {
        this.closeModal();
      }
    },
    closeModal() {
      this.$parent.close();
    },
    async deleteTask() {
      await this.$store.dispatch("deleteTask", this.selectedTask._id);
      this.$store.dispatch("editModalClose");
    }
  },
  computed: {
    filteredCategories() {
      this.$store.getters.categories;
      return this.$store.getters.categories.filter(category => {
        return (
          category.name
            .toString()
            .toLowerCase()
            .indexOf(this.searchCategory.toLowerCase()) >= 0
        );
      });
    },
    datepickerDate: {
      get() {
        return new Date(this.taskEdits.date);
      },
      set(date) {
        this.taskEdits.date = moment(date).toISOString();
      }
    },
    categories() {
      return this.$store.getters.categories;
    },
    selectedTask() {
      return this.$store.state.editTaskModal.selectedTask;
    },
    priorities() {
      return this.$store.getters.priorities;
    },
    hasEdits() {
      const keys = Object.keys(this.selectedTask);
      let edits = false;
      for (let i = 0; i < keys.length; i++) {
        if (this.selectedTask[keys[i]] != this.taskEdits[keys[i]]) {
          edits = true;
        }
      }
      return edits;
    }
  },
  created() {
    this.taskEdits = { ...this.selectedTask };
    const category = this.categories.find(
      cat => (cat._id = this.selectedTask.category)
    );
    this.searchCategory = category.name;
  }
};
</script>

<style lang="scss" scoped>
.buttons {
  width: 100%;
  justify-content: flex-end !important;
}
</style>
