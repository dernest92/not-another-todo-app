<template>
  <div class="day-task">
    <input @change="toggleComplete" class="check" type="checkbox" v-model="taskEdits.completed">
    {{task.title}}
  </div>
</template>

<script>
export default {
  props: {
    task: Object
  },
  data() {
    return {
      taskEdits: {}
    };
  },
  methods: {
    toggleComplete() {
      this.$store.dispatch("updateTask", this.taskEdits);
    }
  },
  created() {
    this.taskEdits = { ...this.task };
  }
};
</script>

<style>
</style>
