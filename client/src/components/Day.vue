<template>
  <div class="day" :class="{today: isToday}">
    <div class="day-buttons">
      <div class="day-number">{{moment(date).date()}}</div>
      <button class="add-event-btn">Add</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    date: String
  },
  methods: {
    moment
  },
  computed: {
    isToday() {
      return (
        this.date ===
        moment()
          .startOf("day")
          .toISOString()
      );
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
  height: 100%;
  padding: 5px;
  border: 1px dotted #f4f4f4;

  .add-event-btn {
    margin-left: 5px;
    visibility: hidden;
  }

  &:hover {
    background: lighten(#42b98323, 20%);
    color: #fff;
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
}
</style>

