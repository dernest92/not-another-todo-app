<template>
  <div>
    <EditTaskModal v-if="editModalState.isOpen"/>
    <task-list title="somthing something" :tasks="pastDueTasks"/>
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";
import EditTaskModal from "../components/EditTaskModal.vue";
export default {
  components: {
    TaskList,
    EditTaskModal
  },
  data() {
    return {};
  },
  computed: {
    tasks() {
      return this.$store.getters.unassignedTasks;
    },
    pastDueTasks() {
      return this.$store.getters.pastDueTasks
    },
    editModalState() {
      return this.$store.getters.editTaskModal;
    }
  }
};
</script>

<style>
</style>
