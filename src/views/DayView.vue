<template>
  <div class="full-page"
          @touchstart="touchstart_handler"
        @touchend="touchend_handler"
  >
    <nav-bar />
    <EditTaskModal v-if="editModalState.isOpen"/>
    <div class="day-card">
      {{displayDate}}
      <div>
        <DayViewTask v-for="task in todaysTasks" :key="task._id" :task="task"/>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
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
    DayViewTask,
    NavBar
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
    changeDay(qty) {
      const day = moment(this.todaysDate).add('days',qty).toISOString()
      this.$store.dispatch('setCurrentDay', day)
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
        this.changeDay(1)
      } else if (diffY < 100 && diffX > 100) {
        this.changeDay(-1)
      }
    },
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
    displayDate() {
      return moment(this.$store.state.dayView.currentDay).format('dddd, MMMM Do YYYY')
    },
    todaysTasks() {
      return this.$store.getters.todaysTasks(this.todaysDate);
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



<style lang="scss" scoped>
.day-card {
  background: #fff;
  overflow: hidden;
  padding: 10px;
  height: 100%;
  width: 100%;
}

.full-page {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
