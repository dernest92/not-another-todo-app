<template>
  <div class="day-task">
    <input @change="toggleComplete" class="check" type="checkbox" v-model="taskEdits.completed">
    <div @click="startEditTask(task._id)" class="task-title">{{task.title}}</div>
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
    },
    startEditTask(id) {
      this.$store.dispatch("startEditTask", id);
    }
  },
  created() {
    this.taskEdits = { ...this.task };
  }
};
</script>

<style lang="scss" scoped>
.day-task {
  background: #f4f4f4;
  margin: 5px 2px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 20px calc(100% - 25px);
  justify-content: start;
  align-items: center;
  padding: 5px;
  grid-gap: 5px;
  .check {
    display: block;
    justify-self: center;
    height: 15px;
    width: 15px;
  }
}
.task-title {
  width: 100%;
  text-align: left;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
