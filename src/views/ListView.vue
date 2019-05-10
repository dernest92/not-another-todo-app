<template>
  <div>
    <b-field label="Show">
      <b-select v-model="query">
        <option v-for="(option, index) in queryOptions" :value="option" :key="index">{{option.name}}</option>
      </b-select>
    </b-field>

    <task-list :title="query.name" :tasks="displayTasks"/>
    <AddEventBtn/>
    <b-button class="back-btn" @click="back" icon-left="chevron-left">back</b-button>
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";
import AddEventBtn from "../components/AddEventBtn.vue";
import moment from "moment";
export default {
  components: {
    TaskList,
    AddEventBtn
  },
  data() {
    return {
      query: {},
      queryOptions: [
        {
          name: "Incomplete",
          query: task => task.completed !== true
        },
        {
          name: "Past Due",
          query: task => {
            const today = moment()
              .startOf("day")
              .toISOString();
            if (task.date && !task.completed) {
              return moment(task.date).isBefore(today);
            }
          }
        },
        {
          name: "No Date",
          query: task => task.date === false
        }
      ]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.query = this.queryOptions[0];
    this.$store.dispatch("setNavMenu", false);
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        if (!this.showComplete && task.completed) return false;
        if (this.filterCategories) {
          return this.selectedCategories.includes(task.category);
        }
        return true;
      });
    },
    tasks() {
      return this.$store.state.tasks;
    },

    showComplete() {
      return this.$store.state.showCompleted;
    },
    filterCategories() {
      return this.$store.state.filterCategory;
    },
    selectedCategories() {
      return this.$store.state.selectedCategories;
    },
    unassignedTasks() {
      return this.$store.getters.unassignedTasks;
    },
    pastDueTasks() {
      return this.$store.getters.pastDueTasks;
    },
    editModalState() {
      return this.$store.getters.editTaskModal;
    },
    displayTasks() {
      return this.filteredTasks.filter(task => this.query.query(task));
    }
  }
};
</script>

<style scoped>
.back-btn {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>
