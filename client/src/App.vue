<template>
  <div id="app">
    <NewTaskModal v-if="newModalOpen"/>
    <EditTaskModal v-if="editModalState.isOpen"/>

    <div class="layout">
      <div class="container">
        <div class="month">
          <div class="month-banner">
            <button class="nav-btn" @click="chageMonth(-1)">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="date-label">{{displayDate}}</div>
            <button class="nav-btn" @click="chageMonth(1)">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <Week
            v-for="(week, index) in weeks"
            :key="week"
            :startDay="week"
            :isFirstWeek="index === 0 ? true : false "
          />
        </div>
      </div>
      <div>
        <div
          class="unassigned"
          @dragenter.prevent="dragenterHandeler"
          @dragover.prevent="dragover_handler"
        >
          <Task v-for="task in unassigned" :key="task.id" :task="task"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Week from "./components/Week.vue";
import NewTaskModal from "./components/NewTaskModal.vue";
import EditTaskModal from "./components/EditTaskModal.vue";
import moment from "moment";
import Task from "./components/Task.vue";

export default {
  name: "app",
  components: {
    Week,
    NewTaskModal,
    EditTaskModal,
    Task
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
    dragHandeler(task) {
      this.$store.dispatch("setDragTask", task);
    },
    dragenterHandeler() {
      this.$store.dispatch("setDragDay", false);
    },
    dragover_handler() {},
    dragend_handler() {
      this.$store.dispatch("finishDrag");
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
    unassigned() {
      return this.$store.getters.unassignedTasks;
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
    await this.$store.dispatch("fetchTasks");
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

.layout {
  display: grid;
  grid-template-columns: auto auto;
}

.unassigned {
  background: #fff;
  width: 300px;
  height: 100%;
}

body {
  background: #e9f1fa;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
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
  max-width: 1150px;
  padding: 5px;
  margin: 0 auto;
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
