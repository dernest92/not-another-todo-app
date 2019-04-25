<template>
  <div class="day" :class="{today: isToday}">
    <div class="day-buttons">
      <div class="day-number">{{moment(date).date()}}</div>
      <button class="add-event-btn">Add</button>
    </div>
    <div @scroll="scrollHandeler" class="events-scroller">
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
    scrollHandeler() {
      console.log("scrolled");
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
  height: 30px;
  border-radius: 15px;
  padding: 0 10px;
  display: inline-block;
  background: #f4f4f4;
  border: none;
  cursor: pointer;
}

.day {
  max-height: 100%;
  padding: 5px;
  background: #fff;
  border: 1px dotted #f4f4f4;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;

  .add-event-btn {
    margin-left: 5px;
    visibility: hidden;
  }

  &:hover {
    background: #fcfcfc;
    .add-event-btn {
      visibility: visible;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  .day-header {
    background: #ccc;
    color: #333;
    padding: 5px 0;
    font-weight: bold;
  }
}

.day-header:first-of-type {
  border-top-left-radius: 10px;
}
.day-header:last-of-type {
  border-top-right-radius: 10px;
}

.day-buttons {
  display: flex;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 0.5);
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
  position: absolute;
  padding: 5px;
  top: 35px;
  bottom: 0;
  left: 0;
  right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
  overflow-y: scroll;
}

.day:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
  width: 100%;
  height: 15px;
}
</style>

