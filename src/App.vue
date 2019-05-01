<template>
  <div id="app">
    <LoginModal v-if="loginModalOpen"/>
    <NewTaskModal v-if="newModalOpen"/>
    <EditTaskModal v-if="editModalState.isOpen"/>
    <div class="small-screen-warning">
      <div>Im sorry, but this app is not optimized for small screens</div>
    </div>
    <UserBlock class="user-block"/>
    <div class="layout">
      <div class="container">
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
    console.log(token);
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.user-block {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.no-date-tasks {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.14);
  border-radius: 5px;
  overflow: hidden;
}

.container.unassinged-container {
  height: 100vh;
}

.small-screen-warning {
  display: none;
}
@media screen and (max-width: 500px) {
  .small-screen-warning {
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 20px;
    padding: 5px;
  }
}
.layout {
  display: grid;
  position: relative;
  grid-template-columns: auto 400px;
  height: 100vh;
}

body {
  background: #f4f4f4;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.month {
  height: calc(100% - 80px);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.14);
  border-radius: 5px;
  overflow: hidden;
}
$color-danger: #e74c3c;
$color-success: #2ecc71;
$color-primary: #3498db;

.vue-logo {
  height: 50px;
  width: auto;
  margin-bottom: 50px;
  cursor: pointer;
}

.container {
  width: 90%;
  max-width: 1150px;
  padding: 5px;
  margin: 0 auto;
  height: 100%;
}

.modal-container {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.modal-card {
  height: fit-content;
  max-width: 900px;
  min-width: 400px;
  width: fit-content;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  text-align: left;
}

.week {
  height: 20%;
  width: 100%;
}

.btn,
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  padding: 0 25px;
  color: #555;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  background-color: transparent;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;

  &:disabled {
    cursor: pointer;
    opacity: 0.25;
    box-shadow: none;
    cursor: auto;
    pointer-events: none;
  }

  &-flat {
    box-shadow: none;
    padding: 0 15px;
    &:hover {
      background: #f4f4f4;
    }
  }

  &:hover {
    color: #333;
    border-color: #888;
    outline: 0;
  }

  &.danger {
    background: $color-danger;
    color: #fff;
    border: none;

    &:hover {
      background: lighten($color-danger, 10%);
    }
  }
  &.primary {
    background: $color-primary;
    color: #fff;
    border: none;

    &:hover {
      background: lighten($color-primary, 10%);
    }
  }
}

input,
textarea,
select {
  height: 35px;
  padding: 6px 10px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  box-shadow: none;
  font-size: 16px;
  margin: 5px 0;

  &:focus {
    border: 1px solid #33c3f0;
    outline: 0;
  }

  &.full {
    width: 100%;
  }
}

textarea {
  min-height: 65px;
  padding-top: 6px;
  padding-bottom: 6px;
  resize: vertical;
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  &:focus {
    border: 1px solid #33c3f0;
    outline: 0;
  }
}

label,
legend {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

label > .label-body {
  display: inline-block;
  margin-left: 0.5rem;
  font-weight: normal;
}

.btn-group {
  display: flex;
  justify-content: flex-end;

  .btn {
    margin-left: 10px;
  }
}

.txt-area {
  resize: none;
}

.date-label {
  width: 200px;
  font-size: 25px;
}

.month-banner {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
}
.nav-btn {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  padding: 0;
  margin: 0 10px;
  background: #2c3e50;
  i {
    color: #fff;
  }
}

.event {
  background: #f4f4f4;
  padding: 2px 5px;
  text-align: left;
  cursor: pointer;
  margin-top: 2px;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  transition: all 0.3s;
  border-radius: 4px;
  .event-title {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    align-self: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.high-priority {
    background: rgb(255, 182, 182);
    &:hover {
      background: darken(rgb(255, 182, 182), 5%);
    }
  }

  &.completed {
    text-decoration: line-through;
    font-style: italic;
    color: #aaa;
    background: rgb(199, 224, 199);
    &:hover {
      background: darken(rgb(199, 224, 199), 10%);
      color: darken(#aaa, 10%);
    }
  }

  &:hover {
    background: #ccc;
    .event-title {
      white-space: normal;
    }
  }
}
</style>
