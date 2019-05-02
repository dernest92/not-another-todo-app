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

