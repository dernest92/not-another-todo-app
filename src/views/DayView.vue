<template>
  <div>
    <div class="day-card">
      hello
      <div>
        <DayViewTask v-for="task in todaysTasks" :key="task._id" class="day-task" :task="task"/>
      </div>
    </div>
  </div>
</template>

<script>
import NewTaskModal from "../components/NewTaskModal.vue";
import EditTaskModal from "../components/EditTaskModal.vue";
import DayViewTask from "../components/DayViewTask.vue";
import moment from "moment";
import TaskService from "../services/TaskService.js";
export default {
  name: "day-view",
  components: {
    NewTaskModal,
    EditTaskModal,
    DayViewTask
  },
  data() {
    return {
      firstOfMonth: {},
      weeks: [],
      month: "",
      year: ""
    };
  },
  methods: {
    moment,
    setWeeks() {
      this.firstOfMonth = moment()
        .set("month", this.month)
        .set("year", this.year)
        .startOf("month")
        .startOf("week");
      const weeks = [];
      for (let i = 0; i < 5; i++) {
        const week = moment(this.firstOfMonth)
          .add(i, "weeks")
          .toISOString();
        weeks.push(week);
      }
      this.weeks = weeks;
    }
  },
  computed: {
    newModalOpen() {
      return this.$store.getters.newTaskModal;
    },
    editModalState() {
      return this.$store.getters.editTaskModal;
    },
    todaysDate() {
      return this.$store.state.dayView.currentDay;
    },
    todaysTasks() {
      return this.$store.getters.todaysTasks(this.todaysDate);
    },

    displayDate() {
      return moment()
        .set("month", this.month)
        .set("year", this.year)
        .format("MMMM, YYYY");
    }
  },
  async created() {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      console.log("welcome to today");
    } else {
      this.$router.push({ name: "login-view" });
    }
  }
};
</script>



<style lang="scss">
.day-card {
  background: #fff;
  overflow: hidden;
  padding: 10px;
  height: 100%;
  width: 500px;
}

.day-task {
  background: #f4f4f4;
  margin: 2px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 20px auto;
  justify-content: start;
  align-items: center;
  padding: 5px;
  grid-gap: 5px;
  .check {
    display: block;
    justify-self: center;
    height: 15px;
    width: 15px;
  }
}
</style>
