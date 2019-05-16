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
      <DayViewTask v-for="task in tasks" :key="task.id" :task="task" :hoverCheckbox="true"/>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DayViewTask from "./DayViewTask.vue";
import { setTimeout } from "timers";
export default {
  components: {
    DayViewTask
  },
  props: {
    date: String,
    tasks: Array
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
      this.$store.dispatch("setSelectedDate", this.date);
      this.$router.push({ name: "Day" });
    },
    touchstart_handler(e) {
      this.startTouch = e.timeStamp;
    },
    touchend_handler() {
      if (!this.scrolled) {
        setTimeout(() => {
          this.goToDay();
        }, 0);
      }
      this.scrolled = false;
    },
    touchmove_handler() {
      this.scrolled = true;
    },
    startNewTask() {
      this.$store.dispatch("startNewTask", this.date);
      this.$router.push("/new-task");
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

    dragDay() {
      return this.$store.getters.dragDay;
    },
    showCompleted() {
      return this.$store.state.showCompleted;
    }
  }
};
</script>

