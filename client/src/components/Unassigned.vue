<template>
  <div
    class="unassigned"
    @dragenter.prevent="dragenterHandeler"
    @dragover.prevent="dragover_handler"
  >
    <Task v-for="task in tasks" :key="task.id" :task="task"/>
  </div>
</template>

<script>
import Task from "./Task.vue";

export default {
  components: {
    Task
  },
  props: {},
  computed: {
    tasks() {
      return this.$store.getters.unassignedTasks;
    }
  },
  methods: {
    dragenterHandeler() {
      this.$store.dispatch("setDragDay", false);
    },
    dragover_handler() {}
  }
};
</script>

<style>
.unassigned {
  background: #fff;
  width: 300px;
  height: 100%;
}
</style>
