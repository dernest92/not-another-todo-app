<template>
  <div class="day-view-container">
    <div
      class="day-card"
      @dragenter.prevent="dragenterHandeler"
      @dragover.prevent="dragover_handler"
      @touchstart="touchstart_handler"
      @touchend="touchend_handler"
    >
      <div class="day-card-header">
        <button class="button button--round nav-button" @click="changeDay(-1)">
          <i class="mdi mdi-chevron-left"></i>
        </button>
        {{displayDate}}
        <button
          class="button button--round nav-button"
          @click="changeDay(1)"
        >
          <i class="mdi mdi-chevron-right"></i>
        </button>
      </div>
      <div class="day-tasks" ref="tasks">
        <DayViewTask v-for="task in todaysTasks" :key="task._id" :task="task"/>
      </div>
    </div>
    <Unassigned class="day-view" :tasks="filteredTasks.filter(task => task.date === false)"/>
    <AddEventBtn :date="todaysDate"/>
    <b-button class="back-btn" @click="back" icon-left="chevron-left"></b-button>
  </div>
</template>

<script>
import DayViewTask from "../components/DayViewTask.vue";
import Unassigned from "../components/Unassigned.vue";
import AddEventBtn from "../components/AddEventBtn.vue";
import moment from "moment";
import { setTimeout } from "timers";
export default {
  name: "day-view",
  components: {
    DayViewTask,
    AddEventBtn,
    Unassigned
  },
  data() {
    return {
      firstOfMonth: {},
      weeks: [],
      month: "",
      year: "",
      touchstart: {
        clientX: null,
        clientY: null
      }
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    dragenterHandeler() {
      this.$store.dispatch("setDragDay", this.todaysDate);
    },
    dragover_handler() {},
    changeDay(qty) {
      const day = moment(this.todaysDate)
        .add(qty, "days")
        .toISOString();
      this.$store.dispatch("setCurrentDay", day);
    },
    touchstart_handler(e) {
      const { clientX, clientY } = e.changedTouches[0];
      this.touchstart = { clientX, clientY };
    },
    touchend_handler(e) {
      const tasksEl = this.$refs.tasks;
      const { clientX, clientY } = e.changedTouches[0];
      const startX = this.touchstart.clientX;
      const startY = this.touchstart.clientY;
      const diffX = clientX - startX;
      const diffY = clientY - startY;

      if (diffY < 100 && diffX < -100) {
        setTimeout(() => {
          this.changeDay(1);
        }, 250);
        tasksEl.classList.add("next-month");
        tasksEl.addEventListener("animationend", () => {
          tasksEl.classList.remove("next-month");
        });
      } else if (diffY < 100 && diffX > 100) {
        setTimeout(() => {
          this.changeDay(-1);
        }, 250);
        tasksEl.classList.add("last-month");
        tasksEl.addEventListener("animationend", () => {
          tasksEl.classList.remove("last-month");
        });
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
      return this.$store.state.currentDate;
    },
    displayDate() {
      return moment(this.todaysDate).format("dddd, MMMM D");
    },
    todaysTasks() {
      const tasks = this.filteredTasks;
      return tasks.filter(task => task.date === this.todaysDate);
    }
  },
  async created() {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      this.$router.push({ name: "login-view" });
    }
  }
};
</script>



<style lang="scss" scoped>
.day-tasks {
  padding: 0 5px;
}

.back-btn {
  position: absolute;
  right: 10px;
  bottom: 70px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.day-view-container {
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}

.day-card {
  max-width: 100vw;
  background: #fff;
  overflow: hidden;
  height: 100%;
  width: 100%;
  border-right: 1px solid #ccc;
}

.day-card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
  background: #ccc;
}

.full-page {
  padding-top: 48px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

@media screen and (max-width: 900px) {
  .day-view-container {
    grid-template-columns: auto 0;
  }
}
@media screen and (max-width: 700px) {
  .day-card-header {
    font-size: 20px;
    font-weight: bold;
    background: #ccc;
  }
}
</style>
