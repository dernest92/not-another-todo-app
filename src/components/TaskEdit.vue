<template>
  <div class="task-edit-container">
    <section class="task-edit-content">
      <form @submit.prevent="submitTask">
        <b-field label="Title">
          <b-input v-model="newTask.title" placeholder="title"></b-input>
        </b-field>
        <b-field label="Date">
          <b-datepicker
            placeholder="Select date..."
            icon="calendar-today"
            v-model="datepickerDate"
            editable
          >
            <button class="button is-primary" @click.prevent="datepickerDate = new Date()">
              <b-icon icon="calendar-today"></b-icon>
              <span>Today</span>
            </button>

            <button class="button is-danger" @click.prevent="datepickerDate = false">
              <b-icon icon="close"></b-icon>
              <span>Clear</span>
            </button>
          </b-datepicker>
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
        <a class="centered-flex" @click="addCategory">
          <b-icon icon="plus"></b-icon>Add new category
        </a>
        <b-field label="Priority">
          <b-select placeholder="Select a priority" expanded v-model="newTask.priority">
            <option
              v-for="(priority, index) in priorities"
              :key="index"
              :value="priority"
            >{{priority}}</option>
          </b-select>
        </b-field>
        <b-field label="Completed">
          <b-switch v-model="newTask.completed"></b-switch>
        </b-field>

        <b-field label="Notes">
          <b-input type="textarea" v-model="newTask.notes"></b-input>
        </b-field>
        <div v-if="isNew" class="buttons">
          <b-button type="is-light" @click="closeModal">cancel</b-button>
          <b-button type="is-primary" native-type="submit" icon-left="content-save">save</b-button>
        </div>
        <div v-else class="buttons">
          <b-button type="is-light" @click="closeModal">cancel</b-button>
          <b-button type="is-danger" icon-left="delete" @click="deleteTask">delete</b-button>
          <b-button
            type="is-primary"
            icon-left="content-save"
            native-type="submit"
            :disabled="!hasEdits"
          >save</b-button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    task: Object,
    isNew: Boolean
  },
  data() {
    return {
      newTask: {},
      searchCategory: ""
    };
  },
  methods: {
    submitTask() {
      if (this.isNew) {
        this.submitNewTask();
      } else {
        this.updateTask();
      }
    },
    async updateTask() {
      if (this.hasEdits) {
        await this.$store.dispatch("updateTask", this.newTask);
        this.$router.go(-1);
      } else {
        this.$router.go(-1);
      }
    },
    async deleteTask() {
      await this.$store.dispatch("deleteTask", this.newTask._id);
      this.$router.go(-1);
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
    closeModal() {
      this.$store.dispatch("closeModal");
      this.$router.go(-1);
    },
    submitNewTask() {
      this.$store.dispatch("submitNewTask", this.newTask);
      this.$router.go(-1);
    },
    resize(e) {
      const field = e.currentTarget;
      const offset = field.offsetHeight - field.clientHeight;
      field.style.height = field.scrollHeight + offset + "px";
    }
  },
  computed: {
    hasEdits() {
      const keys = Object.keys(this.newTask);
      let edits = false;
      for (let i = 0; i < keys.length; i++) {
        if (this.newTask[keys[i]] != this.task[keys[i]]) {
          edits = true;
        }
      }
      return edits;
    },
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
        if (this.newTask.date === false) {
          return undefined;
        } else {
          return new Date(this.newTask.date);
        }
      },
      set(date) {
        if (date) {
          this.newTask.date = moment(date)
            .startOf("day")
            .toISOString();
        } else {
          this.newTask.date = false;
        }
      }
    },
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
    if (this.isNew) {
      this.newTask = {
        title: undefined,
        priority: undefined,
        date: this.dateFromCal,
        notes: undefined,
        completed: false,
        category: undefined
      };
    } else {
      this.newTask = { ...this.task };
    }
  }
};
</script>

<style lang="scss" scoped>
.centered-flex {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.buttons {
  width: 100%;
  margin-top: 10px;
}

.task-edit-content {
  height: fit-content;
  text-align: left;
}
.task-edit-container {
  max-width: 800px;
  padding: 10px 30px;
  padding-top: 60px;
  height: calc(100vh - 46px);
}

.datepicker-footer {
  .button {
    margin-right: 5px;
  }
}
</style>

