<template>
  <div
    class="unassigned"
    @dragenter.prevent="dragenterHandeler"
    @dragover.prevent="dragover_handler"
  >
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
    dragover_handler() {}
  }
};
</script>

<style lang="scss" scoped>
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

  &.selected {
    background: rgb(240, 255, 255);
  }
}
</style>
