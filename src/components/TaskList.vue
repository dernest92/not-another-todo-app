<template>
  <div class="task-list">
    <DayViewTask v-for="task in tasks" :key="task._id" :task="task"/>
  </div>
</template>

<script>
import DayViewTask from "../components/DayViewTask.vue";
export default {
  props: {
    title: String,
    tasks: Array
  },
  components: {
    DayViewTask
  }
};
</script>

<style>
.task-list {
  background: #fff;
  padding: 10px 5px;
}
</style>
