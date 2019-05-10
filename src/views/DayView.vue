<template>
  <div class="day-view-container">
    <div class="day-card">
      <div class="day-card-header">
        <b-button class="back-btn" @click="back" icon-left="chevron-left">back</b-button>
        {{displayDate}}
      </div>
      <div>
        <DayViewTask v-for="task in todaysTasks" :key="task._id" :task="task"/>
      </div>
    </div>
    <AddEventBtn :date="todaysDate"/>
  </div>
</template>

<script>
import DayViewTask from "../components/DayViewTask.vue";
import AddEventBtn from "../components/AddEventBtn.vue";
import moment from "moment";
import TaskService from "../services/TaskService.js";
export default {
  name: "day-view",
  components: {
    DayViewTask,
    AddEventBtn
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
    back() {
      this.$router.go(-1);
    },
    changeDay(qty) {
      const day = moment(this.todaysDate)
        .add("days", qty)
        .toISOString();
      this.$store.dispatch("setCurrentDay", day);
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
        this.changeDay(1);
      } else if (diffY < 100 && diffX > 100) {
        this.changeDay(-1);
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
    todaysDate() {
      return this.$store.state.dayView.currentDay;
    },
    displayDate() {
      return moment(this.$store.state.dayView.currentDay).format(
        "dddd, MMMM Do YYYY"
      );
    },
    todaysTasks() {
      const tasks = this.filteredTasks;
      return tasks.filter(task => task.date === this.todaysDate);
    }
  },
  async created() {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
    } else {
      this.$router.push({ name: "login-view" });
    }
  }
};
</script>



<style lang="scss" scoped>
.back-btn {
  position: absolute;
  left: 10px;
}

.day-view-container {
  height: 100%;
}

.day-card {
  background: #fff;
  overflow: hidden;
  padding: 10px;
  height: 100%;
  max-width: 700px;
  width: 100%;
  border-right: 1px solid #ccc;
}

.day-card-header {
  height: 40px;
  font-size: 20px;
  font-weight: bold;
}

.full-page {
  padding-top: 48px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
