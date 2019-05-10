<template>
  <div>
    <select v-model="query">
      <option v-for="(option, index) in queryOptions" :value="option" :key="index">{{option.name}}</option>
    </select>
    <task-list :title="query.name" :tasks="tasks"/>
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
    },
    touchstart_handler(e) {
      const { clientX, clientY } = e.changedTouches[0];
      this.touchstart = { clientX, clientY };
    },
    touchend_handler(e) {
      const { clientX, clientY } = e.changedTouches[0];
      const startX = this.touchstart.clientX;
      const startY = this.touchstart.clientY;
      const diffX = clientX - startX;
      const diffY = clientY - startY;
      if (diffY > 100 && diffX < 100) {
        this.$store.dispatch("setNavMenu", true);
      } else if (diffY < -100 && diffX < 100) {
        this.$store.dispatch("setNavMenu", false);
      } else if (diffY < 100 && diffX < -100) {
      } else if (diffY < 100 && diffX > 100) {
      }
    }
  },
  created() {
    this.query = this.queryOptions[0];
    this.$store.dispatch("setNavMenu", false);
  },
  computed: {
    unassignedTasks() {
      return this.$store.getters.unassignedTasks;
    },
    pastDueTasks() {
      return this.$store.getters.pastDueTasks;
    },
    editModalState() {
      return this.$store.getters.editTaskModal;
    },
    tasks() {
      return this.$store.getters.taskQuery(this.query.query);
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
