<template>
  <div class="month-view">
    <div class="month-col">
      <div class="month-banner">
        <button class="button button--round nav-button" @click="changeMonth(-1)">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="date-label">{{displayDate}}</div>
        <button class="button button--round nav-button" @click="changeMonth(1)">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div
        class="month"
        ref="month"
        @touchstart="touchstart_handler"
        @touchend="touchend_handler"
        @touchmove="touchmove_handler"
      >
        <div class="week-header">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thr</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <Week
          v-for="(week, index) in weeks"
          class="week"
          :key="week"
          :startDay="week"
          :isFirstWeek="index === 0 ? true : false "
          :tasks="filteredTasks"
        />
      </div>
    </div>
    <div class="nodate-col unassinged-container">
      <Unassigned class="no-date-tasks" :tasks="filteredTasks.filter(task => task.date === false)"/>
    </div>
    <AddEventBtn/>
  </div>
</template>

<script>
import Week from "../components/Week.vue";
import moment from "moment";
import Unassigned from "../components/Unassigned.vue";
import TaskService from "../services/TaskService.js";
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
      firstOfMonth: {},
      weeks: [],
      month: "",
      year: ""
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
        this.changeMonth(1);
      } else if (diffY < 100 && diffX > 100) {
        this.changeMonth(-1);
      }
    },
    touchmove_handler(e) {
      const monthEl = this.$refs.month;
      const startX = this.touchstart.clientX;
      const { clientX, clientY } = e.changedTouches[0];
      const diffX = clientX - startX;
      monthEl.style.position = "relative";
      monthEl.style.left = diffX + "px";
    },
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
    },

    changeMonth(qty) {
      if (this.month === 11 && qty > 0) {
        this.month = 0;
        this.year++;
      } else if (this.month === 0 && qty < 0) {
        this.month = 11;
        this.year--;
      } else {
        this.month += qty;
        this.setWeeks();
      }
    },
    goToToday() {
      this.month = moment().month();
      this.year = moment().year();
      this.setWeeks();
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
    showComplete() {
      return this.$store.state.showCompleted;
    },
    filterCategories() {
      return this.$store.state.filterCategory;
    },
    selectedCategories() {
      return this.$store.state.selectedCategories;
    },
    sideMenu() {
      return this.$store.state.sideMenu;
    },
    navMenuOpen() {
      return this.$store.state.navmenu.isOpen;
    },
    loginModalOpen() {
      return this.$store.state.loginModal.isOpen;
    },
    newModalOpen() {
      return this.$store.getters.newTaskModal;
    },
    editModalState() {
      return this.$store.getters.editTaskModal;
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
    this.$store.dispatch("setNavMenu", false);

    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      this.goToToday();
    } else {
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
