<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <form @submit.prevent="submitNewTask">
        <b-field label="Title">
          <b-input v-model="newTask.title" placeholder="title"></b-input>
        </b-field>
        <b-field label="Date">
          <b-datepicker placeholder="Select date..." icon="calendar-today" v-model="datepickerDate"></b-datepicker>
        </b-field>

        <b-field label="Category">
          <b-autocomplete
            v-model="searchCategory"
            placeholder="Category"
            :open-on-focus="true"
            :data="filteredCategories"
            field="name"
            @select="option => {
              if(option) {
              newTask.category = option.id
              } else {
                newTask.category = undefined;
              }
            }"
          >
            <template slot="header">
              <a @click="addCategory">
                <span>Add new...</span>
              </a>
            </template>
            <template slot="empty">No results for {{searchCategory}}</template>
          </b-autocomplete>
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

        <b-field label="Notes">
          <b-input type="textarea" v-model="newTask.notes"></b-input>
        </b-field>
      </form>
    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        <b-button type="is-light" @click="closeModal">cancel</b-button>
        <b-button type="is-primary" @click="submitNewTask" icon-left="content-save">save</b-button>
      </div>
    </footer>
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
      },
      searchCategory: ""
    };
  },
  methods: {
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
        this.newTask.date = moment(date).toISOString();
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
    this.newTask.date = this.dateFromCal;
  }
};
</script>

<style lang="scss" scoped>
.buttons {
  width: 100%;
  justify-content: flex-end !important;
}
</style>

