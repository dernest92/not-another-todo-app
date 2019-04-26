<template>
  <div class="day" :class="{today: isToday}">
    <div class="day-buttons">
      <div class="day-number">{{moment(date).date()}}</div>
      <button @click="startNewTask" class="add-event-btn">Add</button>
    </div>
    <div class="events-scroller">
      <div class="event" v-for="(event, index) in todaysEvents" :key="index">{{event.title}}</div>
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
    todaysEvents() {
      return this.$store.getters.todaysEvents(this.date);
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
  transition: all 0.3s;
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

  &:hover {
    background: #ccc;
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

