<template>
  <TaskEdit :task="task" :isNew="false"/>
</template>

<script>
import TaskEdit from "../components/TaskEdit.vue";
export default {
  components: {
    TaskEdit
  },
  computed: {
    task() {
      return this.$store.state.editTaskModal.selectedTask;
    }
  }
};
</script>

<style>
</style>
