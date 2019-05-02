<template>
  <div
    class="event"
    :class="{'high-priority': task.priority === 'high', 'completed': task.completed}"
    draggable="true"
    @dragstart="dragHandeler(task._id)"
    @dragend="dragend_handler"
    @click="startEditTask(task._id)"
  >
    <div class="event-title">{{task.title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object
  },
  methods: {
    startEditTask(id) {
      this.$store.dispatch("startEditTask", id);
    },
    startNewTask() {
      this.$store.dispatch("startNewTask", this.date);
    },
    dragHandeler(task) {
      this.$store.dispatch("setDragTask", task);
    },
    dragenterHandeler() {
      this.$store.dispatch("setDragDay", this.date);
    },
    dragover_handler() {},
    dragend_handler() {
      this.$store.dispatch("finishDrag");
    }
  }
};
</script>

