<template>
  <div
    class="day-task"
    draggable="true"
    :class="{hoverCheckbox, checkbox}"
    @dragstart="dragHandeler(task._id)"
    @dragend="dragend_handler"
  >
    <b-checkbox @input="toggleComplete" v-model="taskEdits.completed" class="chkbx"></b-checkbox>
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
    task: Object,
    checkbox: Boolean,
    hoverCheckbox: Boolean
  },
  data() {
    return {
      taskEdits: {}
    };
  },
  methods: {
    dragHandeler(task) {
      this.$store.dispatch("setDragTask", task);
    },
    dragenterHandeler() {
      this.$store.dispatch("setDragDay", this.date);
    },
    dragover_handler() {},
    dragend_handler() {
      this.$store.dispatch("finishDrag");
    },
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
.day {
  .day-task {
    margin: 2px 0;
    border-radius: 0;

    .task-title {
      line-height: 1.4;
    }
  }
}
@media screen and (max-width: 700px) {
  .day {
    .day-task {
      margin: 2px auto;
      padding: 0;
      border-radius: 0;

      .task-title {
        border-radius: 0;
        padding: 0;
        font-size: 14px;
        padding: 1px;
        line-height: 1.2;
      }
    }
  }
}

.chkbx {
  display: none;
}
.checkbox {
  .chkbx {
    display: inherit;
  }

  &.day-task {
    grid-template-columns: 25px calc(100% - 25px);
  }
}

.hoverCheckbox {
  .chkbx {
    display: none;
  }

  &:hover {
    &.day-task {
      grid-template-columns: 25px calc(100% - 25px);
    }
    .chkbx {
      display: inherit;
    }
  }
}

.day-task {
  margin: 5px auto;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 600px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  .check {
    display: block;
    justify-self: center;
    height: 15px;
    width: 15px;
  }
}

.task-title {
  text-align: left;
  padding: 2px 8px;
  text-overflow: ellipsis;
  background: #f4f4f4;
  cursor: pointer;
  border-radius: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
