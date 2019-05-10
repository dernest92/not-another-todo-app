<template>
  <div class="day-task">
    <b-checkbox @input="toggleComplete" v-model="taskEdits.completed"></b-checkbox>
    <div
      @click="startEditTask(task._id)"
      class="task-title"
      :class="{'is-complete': task.completed, 'high-priority': task.priority === 'high','med-priority': task.priority === 'medium'}"
    >{{task.title}}</div>
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
      this.$router.push("/edit-task");
    }
  },
  created() {
    this.taskEdits = { ...this.task };
  }
};
</script>

<style lang="scss" scoped>
.day-task {
  margin: 5px 2px;
  display: grid;
  grid-template-columns: 25px calc(100% - 25px);
  justify-content: start;
  align-items: center;
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
  padding: 2px 8px;
  text-overflow: ellipsis;
  background: #f4f4f4;
  cursor: pointer;
  border-radius: 5px;
}

.high-priority {
  background: #ffb6b6;
}
.med-priority {
  background: #ffd9b6;
}
.is-complete {
  background: #c7e0c7;
  color: #aaa;
  font-style: italic;
  text-decoration: line-through;
}
</style>
