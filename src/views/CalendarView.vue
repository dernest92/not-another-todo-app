<template>
  <div id="app">
    <EditTaskModal v-if="editModalState.isOpen"/>
    <NewTaskModal v-if="newModalOpen"/>
    <div class="layout">
      <div
        class="container month-container"
        @touchstart="touchstart_handler"
        @touchend="touchend_handler"
        @touchmove="touchmove_handler"
      >
        <div class="month-banner">
          <button class="nav-btn" @click="changeMonth(-1)">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="date-label">{{displayDate}}</div>
          <button class="nav-btn" @click="changeMonth(1)">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <div class="month">
          <div class="weekdays">
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
      <div class="container unassinged-container">
        <Unassigned class="no-date-tasks"/>
      </div>
    </div>
  </div>
</template>

<script>
import Week from "../components/Week.vue";
import NewTaskModal from "../components/NewTaskModal.vue";
import EditTaskModal from "../components/EditTaskModal.vue";
import moment from "moment";
import Unassigned from "../components/Unassigned.vue";
import TaskService from "../services/TaskService.js";
import { setTimeout } from "timers";
export default {
  name: "app",
  components: {
    Week,
    NewTaskModal,
    EditTaskModal,
    Unassigned
  },
  data() {
    return {
      itemPosStart: {
        x: 0,
        y: 0,
        startTime: 0
      },
      itemPos: {
        bottom: 5,
        right: 5
      },
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
      if (diffY > 100 && diffX < 100) {
        this.$store.dispatch("setNavMenu", true);
      } else if (diffY < -100 && diffX < 100) {
        this.$store.dispatch("setNavMenu", false);
      } else if (diffY < 100 && diffX < -100) {
        this.changeMonth(1);
      } else if (diffY < 100 && diffX > 100) {
        this.changeMonth(-1);
      }
    },
    touchmove_handler(e) {
      // this.touchStartPos
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
@import "../assets/styles/global.scss";

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
</style>
