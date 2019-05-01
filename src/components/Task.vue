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

<style lang="scss" scoped>
.add-event-btn {
  height: 20px;
  border-radius: 15px;
  padding: 0 10px;
  display: inline-block;
  background: #f4f4f4;
  border: none;
  cursor: pointer;
  transform: translate(-20px, 0);
  transition: transform 0.3s, opacity 0.3s;
  &:hover {
    background: darken(#f4f4f4, 10%);
  }
}

.day {
  max-height: 100%;
  background: #fff;
  border: 1px dotted #f4f4f4;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .add-event-btn {
    margin-left: 5px;
    visibility: hidden;
    opacity: 0;
  }

  &:hover {
    background: #fcfcfc;
    .add-event-btn {
      visibility: visible;
      transform: translate(0, 0);
      opacity: 1;
    }
  }
  &.today {
    background: rgb(255, 255, 233);
  }
  &.selected {
    background: rgb(240, 255, 255);
  }
}

.event {
  background: #f4f4f4;
  padding: 2px 5px;
  text-align: left;
  cursor: pointer;
  margin-top: 2px;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  transition: all 0.3s;
  border-radius: 4px;
  .event-title {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    align-self: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.high-priority {
    background: rgb(255, 182, 182);
    &:hover {
      background: darken(rgb(255, 182, 182), 5%);
    }
  }

  &.completed {
    text-decoration: line-through;
    font-style: italic;
    color: #aaa;
    background: rgb(199, 224, 199);
    &:hover {
      background: darken(rgb(199, 224, 199), 10%);
      color: darken(#aaa, 10%);
    }
  }

  &:hover {
    background: #ccc;
    .event-title {
      white-space: normal;
    }
  }
}
</style>
