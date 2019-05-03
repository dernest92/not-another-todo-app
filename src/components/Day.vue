<template>
  <div
    class="day"
    :data-date="date"
    :class="{today: isToday, selected: (date === dragDay)}"
    @touchstart="touchstart_handler"
    @touchend="touchend_handler"
    @touchmove="touchmove_handler"
    @dragenter.prevent="dragenterHandeler"
    @dragover.prevent="dragover_handler"
  >
    <div class="day-buttons">
      <div @click="goToDay" class="day-number">{{moment(date).date()}}</div>
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
    return {
      scrolled: false,
      startTouch: 0
    };
  },
  methods: {
    moment,
    goToDay() {
      this.$store.dispatch("setCurrentDay", this.date);
      this.$router.push({ name: "day-view" });
    },
    touchstart_handler(e) {
      this.startTouch = e.timeStamp;
    },
    touchend_handler(e) {
      const durr = e.timeStamp - this.startTouch;
      console.log(durr);
      if (!this.scrolled) {
        if (durr < 250) {
          this.goToDay();
        } else {
          this.startNewTask();
        }
      }
      this.scrolled = false;
    },
    touchmove_handler() {
      this.scrolled = true;
    },
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

