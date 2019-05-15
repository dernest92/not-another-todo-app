<template>
  <div class="month-view">
    <div class="month-col">
      <div class="month-banner">
        <button class="button button--round nav-button" @click="changeMonth(-1)">
          <i class="mdi mdi-chevron-left mdi-24px"></i>
        </button>
        <div class="date-label">{{displayDate}}</div>
        <button class="button button--round nav-button" @click="changeMonth(1)">
          <i class="mdi mdi-chevron-right mdi-24px"></i>
        </button>
      </div>
      <div class="week-header">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thr</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div class="month" ref="month" @touchstart="touchstart_handler" @touchend="touchend_handler">
        <Week
          v-for="week in weeks"
          class="week"
          :key="week"
          :startDay="week"
          :tasks="filteredTasks"
        />
      </div>
    </div>
    <div class="nodate-col">
      <Unassigned :tasks="filteredTasks.filter(task => task.date === false)"/>
    </div>
    <AddEventBtn/>
  </div>
</template>

<script>
import Week from "../components/Week.vue";
import moment from "moment";
import Unassigned from "../components/Unassigned.vue";
import AddEventBtn from "../components/AddEventBtn.vue";
import { setTimeout } from "timers";
export default {
  components: {
    Week,
    Unassigned,
    AddEventBtn
  },
  data() {
    return {
      touchstart: {
        clientX: null,
        clientY: null
      },
      firstOfMonth: {}
    };
  },
  methods: {
    touchstart_handler(e) {
      const { clientX, clientY } = e.changedTouches[0];
      this.touchstart = { clientX, clientY };
    },
    touchend_handler(e) {
      const monthEl = this.$refs.month;
      const { clientX, clientY } = e.changedTouches[0];
      const startX = this.touchstart.clientX;
      const startY = this.touchstart.clientY;
      const diffX = clientX - startX;
      const diffY = clientY - startY;

      if (diffX != 0) {
        const monthEl = this.$refs.month;
        monthEl.style.position = "static";
      }
      if (diffY > 100 && diffX < 100) {
        this.$store.dispatch("setNavMenu", true);
      } else if (diffY < -100 && diffX < 100) {
        this.$store.dispatch("setNavMenu", false);
        this.$store.dispatch("startNewTask", false);
      } else if (diffY < 100 && diffX < -100) {
        setTimeout(() => {
          this.changeMonth(1);
        }, 250);
        monthEl.classList.add("next-month");
        monthEl.addEventListener("animationend", () => {
          monthEl.classList.remove("next-month");
        });
      } else if (diffY < 100 && diffX > 100) {
        setTimeout(() => {
          this.changeMonth(-1);
        }, 250);
        monthEl.classList.add("last-month");
        monthEl.addEventListener("animationend", () => {
          monthEl.classList.remove("last-month");
        });
      }
    },
    moment,
    changeMonth(qty) {
      const newDate = moment(this.datepickerDate)
        .startOf("month")
        .add(qty, "months");
      this.datepickerDate = new Date(newDate);
    },
    goToToday() {
      this.datepickerDate = new Date();
    }
  },
  computed: {
    weeks() {
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
      return weeks;
    },
    month() {
      return moment(this.datepickerDate).month();
    },
    year() {
      return moment(this.datepickerDate).year();
    },
    datepickerDate: {
      get() {
        return new Date(this.$store.state.selectedDate);
      },
      set(date) {
        if (date) {
          const setDate = moment(date)
            .startOf("day")
            .toISOString();
          this.$store.dispatch("setSelectedDate", setDate);
        } else {
          this.newTask.date = false;
        }
      }
    },
    filteredTasks() {
      return this.tasks.filter(task => {
        if (!this.showComplete && task.completed) return false;
        if (this.filterCategories) {
          return this.selectedCategories.includes(task.category);
        }
        return true;
      });
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
    tasks() {
      return this.$store.state.tasks;
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
    if (!token || !user) {
      this.$router.push({ name: "login-view" });
    }
  }
};
</script>



<style lang="scss">
.month-view {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: auto 250px;
  overflow-y: hidden;
}
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, auto);
  background: #ccc;
}

.create-item {
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 40px;
  width: 40px;
  background: #34495e;
  color: #fff;
  border-radius: 50%;
}

.month-col {
  height: 100%;
}

@media screen and (max-width: 700px) {
  .nav-button {
    display: none !important;
  }
  .month-view {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: auto;
  }

  .nodate-col {
    display: none;
  }
}
</style>
