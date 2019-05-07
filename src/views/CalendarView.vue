<template>
  <div class="month-view">
    <div class="month-col">
      <div class="month-banner">
        <button class="nav-btn" @click="changeMonth(-1)">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="date-label">{{displayDate}}</div>
        <button class="nav-btn" @click="changeMonth(1)">
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
          <div>Teu</div>
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
        />
      </div>
    </div>
    <div class="nodate-col unassinged-container">
      <Unassigned class="no-date-tasks"/>
    </div>
  </div>
</template>

<script>
import Week from "../components/Week.vue";
import moment from "moment";
import Unassigned from "../components/Unassigned.vue";
import TaskService from "../services/TaskService.js";
import { setTimeout } from "timers";
export default {
  name: "app",
  components: {
    Week,
    Unassigned
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
    todaysTasks() {
      return this.$store.getters.todaysTasks("2019-03-31T05:00:00.000Z");
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
  .month-view {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: auto;
  }

  .month-col {
    width: 100%;
  }
  .nodate-col {
    display: none;
  }
}
</style>
