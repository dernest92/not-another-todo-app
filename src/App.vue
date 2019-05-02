<template>
  <div id="app">
    <LoginModal v-if="loginModalOpen"/>
    <NewTaskModal v-if="newModalOpen"/>
    <EditTaskModal v-if="editModalState.isOpen"/>

    <UserBlock class="user-block"/>
    <div class="layout">
      <div class="container month-container">
        <div class="month-banner">
          <button class="nav-btn" @click="chageMonth(-1)">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="date-label">{{displayDate}}</div>
          <button class="nav-btn" @click="chageMonth(1)">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <div class="month">
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
import Week from "./components/Week.vue";
import NewTaskModal from "./components/NewTaskModal.vue";
import EditTaskModal from "./components/EditTaskModal.vue";
import LoginModal from "./components/LoginModal.vue";
import moment from "moment";
import Unassigned from "./components/Unassigned.vue";
import UserBlock from "./components/UserBlock.vue";
import TaskService from "./services/TaskService.js";
export default {
  name: "app",
  components: {
    Week,
    NewTaskModal,
    EditTaskModal,
    Unassigned,
    UserBlock,
    LoginModal
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
    },

    chageMonth(qty) {
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
    TaskService.setToken(token);
    if (token && user) {
      this.$store.dispatch("setUserToken", { token, user });
      await this.$store.dispatch("fetchTasks");
    } else {
      this.$store.dispatch("setLoginOpen", true);
    }
    this.goToToday();
  }
};
</script>



<style lang="scss">
@import "./assets/styles/global.scss";
</style>
