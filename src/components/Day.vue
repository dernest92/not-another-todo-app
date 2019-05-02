<template>
  <div
    class="day"
    :class="{today: isToday, selected: (date === dragDay)}"
    @dragenter.prevent="dragenterHandeler"
    @dragover.prevent="dragover_handler"
  >
    <div class="day-buttons">
      <div class="day-number">{{moment(date).date()}}</div>
      <button @click="startNewTask" class="add-event-btn btn-flat">Add</button>
    </div>
    <div class="events-scroller">
      <Task v-for="task in todaysTasks" :key="task.id" :task="task"/>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Task from "./Task.vue";
export default {
  components: {
    Task
  },
  props: {
    date: String
  },
  data() {
    return {};
  },
  methods: {
    moment,

    startNewTask() {
      this.$store.dispatch("startNewTask", this.date);
    },
    dragenterHandeler() {
      this.$store.dispatch("setDragDay", this.date);
    },
    dragover_handler() {}
  },
  computed: {
    isToday() {
      return (
        this.date ===
        moment()
          .startOf("day")
          .toISOString()
      );
    },
    todaysTasks() {
      return this.$store.getters.todaysTasks(this.date);
    },
    dragDay() {
      return this.$store.getters.dragDay;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-event-btn {
  height: 20px;
  border-radius: 15px;
  padding: 0 10px;
  display: inline-block;
  background: #f4f4f4;
  border: none;
  cursor: pointer;
  transform: translate(-20px, 0);
  transition: transform 0.3s, opacity 0.3s;
  &:hover {
    background: darken(#f4f4f4, 10%);
  }
}

.day {
  max-height: 100%;
  background: #fff;
  border: 1px dotted #f4f4f4;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .add-event-btn {
    margin-left: 5px;
    visibility: hidden;
    opacity: 0;
  }

  &:hover {
    background: #fcfcfc;
    .add-event-btn {
      visibility: visible;
      transform: translate(0, 0);
      opacity: 1;
    }
  }
  &.today {
    background: rgb(255, 255, 233);
  }
  &.selected {
    background: rgb(240, 255, 255);
  }
}

.day-number {
  display: inline-flex;
  background: #f4f4f4;
  color: #333;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: darken(#f4f4f4, 10%);
  }
}

.week-selector {
  background: #f4f4f4;
  cursor: pointer;
  &:hover {
    background: darken(#f4f4f4, 10%);
  }
}

.week-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  .day-header {
    background: #ccc;
    color: #333;
    padding: 5px 0;
    font-weight: bold;
  }
}

.day-buttons {
  display: flex;
  padding: 5px;
  justify-content: flex-start;
}
</style>

