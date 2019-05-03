<template>
  <div class="full-page"
        @touchstart="touchstart_handler"
        @touchend="touchend_handler"
  >
   <nav-bar/>
  <div>
  <select v-model="query">
    <option v-for="option in queryOptions" :value="option">{{option.name}}</option>
  </select>

  </div>
    <EditTaskModal v-if="editModalState.isOpen"/>
    <task-list :title="query.name" :tasks="tasks"/>
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";
import EditTaskModal from "../components/EditTaskModal.vue";
import NavBar from '../components/NavBar.vue'
import moment from 'moment'
export default {
  components: {
    TaskList,
    EditTaskModal,
    NavBar
  },
  data() {
    return {
      query: {},
      queryOptions: [
        {
          name: 'Incomplete',
          query: task => task.completed !== true
        },
        {
          name: 'Past Due',
          query: task => {
            const today = moment().startOf('day').toISOString();
            if (task.date && !task.completed) {
              return moment(task.date).isBefore(today)
            }
          }
        },
        {
          name: 'No Date',
          query: task => task.date === false
        }
      ]
    };
  },
  methods: {
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
    this.query = this.queryOptions[0]
    this.$store.dispatch("setNavMenu", false);
  },
  computed: {
    unassignedTasks() {
      return this.$store.getters.unassignedTasks;
    },
    pastDueTasks() {
      return this.$store.getters.pastDueTasks
    },
    editModalState() {
      return this.$store.getters.editTaskModal;
    },
    tasks() {
      return this.$store.getters.taskQuery(this.query.query)
    }
  }
};
</script>

<style>

.full-page {
  min-height: 100vh;
  min-width: 100vw;
}
</style>
