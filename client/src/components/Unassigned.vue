<template>
  <div
    class="unassigned"
    @dragenter.prevent="dragenterHandeler"
    @dragover.prevent="dragover_handler"
  >
    <div class="title">
      Unassinged
      <button @click="startNewTask" class="add-event-btn btn-flat">Add</button>
    </div>

    <div class="events-scroller">
      <Task v-for="task in tasks" :key="task.id" :task="task"/>
    </div>
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
    dragover_handler() {},
    startNewTask() {
      this.$store.dispatch("startNewTask", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  background: #ccc;
  font-weight: bold;
  height: 26px;
  padding: 4px;
}

.add-event-btn {
  position: absolute;
  right: 10px;
  height: 18px;
  border-radius: 15px;
  padding: 0 10px;
  display: inline-block;
  background: #f4f4f4;
  border: none;
  cursor: pointer;
  transition: transform 0.3s, opacity 0.3s;
  &:hover {
    background: darken(#f4f4f4, 10%);
  }
}
.events-scroller {
  padding: 0 5px;
  margin-right: 2px;
  margin-bottom: 2px;
  top: 35px;
  bottom: 0;
  left: 0;
  right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
    cursor: pointer;
  }
  /* Optional: show position indicator in red */
  &::-webkit-scrollbar-thumb {
    background: #999999;
    border-radius: 2px;
    cursor: pointer;
  }
}

.unassigned {
  background: #fff;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  height: calc(100% - 80px);

  &:hover {
    background: #fcfcfc;
  }

  &.selected {
    background: rgb(240, 255, 255);
  }
}
</style>
