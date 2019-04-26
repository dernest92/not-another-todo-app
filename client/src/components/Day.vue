<template>
  <div
    class="day"
    :class="{today: isToday, selected: (date === dragDay)}"
    @dragenter.prevent="dragenterHandeler"
    @dragover.prevent="dragover_handler"
  >
    <div class="day-buttons">
      <div class="day-number">{{moment(date).date()}}</div>
      <button @click="startNewTask" class="add-event-btn">Add</button>
    </div>
    <div class="events-scroller">
      <div
        class="event"
        v-for="(task, index) in todaysTasks"
        :key="index"
        draggable="true"
        @dragstart="dragHandeler(task.id)"
        @dragend="dragend_handler"
      >
        <div class="event-title">{{task.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    date: String
  },
  data() {
    return {
      events: [
        {
          title: "heyoo"
        }
      ]
    };
  },
  methods: {
    moment,
    startNewTask() {
      this.$store.dispatch("startNewTask", this.date);
    },
    dragHandeler(task) {
      this.$store.dispatch("setDragTask", task);
    },
    dragenterHandeler(e) {
      this.$store.dispatch("setDragDay", this.date);
    },
    dragover_handler(e) {},
    dragend_handler(e) {
      this.$store.dispatch("finishDrag");
      console.log("drag end");
    }
  },
  computed: {
    isToday() {
      return (
        this.date ===
        moment()
          .startOf("day")
          .toISOString()
      );
    },
    todaysTasks() {
      return this.$store.getters.todaysTasks(this.date);
    },
    dragDay() {
      return this.$store.getters.dragDay;
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
    background: rgba(255, 255, 0, 0.123);
  }
  &.selected {
    background: rgb(255, 198, 198);
  }
}

.day-number {
  display: inline-flex;
  background: #f4f4f4;
  color: #333;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: darken(#f4f4f4, 10%);
  }
}

.week-selector {
  background: #f4f4f4;
  cursor: pointer;
  &:hover {
    background: darken(#f4f4f4, 10%);
  }
}

.week-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  .day-header {
    background: #ccc;
    color: #333;
    padding: 5px 0;
    font-weight: bold;
  }
}

.day-buttons {
  display: flex;
  padding: 5px;
  justify-content: flex-start;
}

.event {
  background: #f4f4f4;
  padding: 0 5px;
  text-align: left;
  cursor: pointer;
  margin-top: 2px;
  overflow-x: hidden;
  transition: all 0.5s;
  .event-title {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    align-self: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:active {
    cursor: move;
  }

  &:hover {
    background: #ccc;
    .event-title {
      white-space: normal;
    }
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
</style>

