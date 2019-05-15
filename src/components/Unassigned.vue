<template>
  <div
    class="unassigned"
    @dragenter.prevent="dragenterHandeler"
    @dragover.prevent="dragover_handler"
  >
    <div class="title-block">No Date</div>

    <div class="events-scroller">
      <!-- <Task v-for="task in tasks" :key="task.id" :task="task"/> -->
      <DayViewTask v-for="task in tasks" :key="task.id" :task="task"/>
    </div>
  </div>
</template>

<script>
import DayViewTask from "./DayViewTask.vue";

export default {
  components: {
    DayViewTask
  },
  props: {
    tasks: Array
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
.title-block {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: #ccc;
  height: 86px;
  padding: 4px;
  font-size: 25px;
}

.day-view {
  .title-block {
    height: 60px;
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
  height: 100%;

  &.selected {
    background: rgb(240, 255, 255);
  }
}
</style>
