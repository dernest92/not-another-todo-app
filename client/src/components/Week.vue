<template>
  <div>
    <div v-if="isFirstWeek" class="week-header">
      <div
        v-for="(day, index) in days"
        class="day-header"
        :key="index"
      >{{ moment(day).format("ddd")}}</div>
    </div>
    <div class="week-container">
      <div class="week-selector"></div>
      <Day class="day" v-for="(date, index) in days" :key="index" :date="date"/>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import Day from "./Day.vue";
export default {
  props: {
    startDay: String,
    isFirstWeek: Boolean
  },
  components: {
    Day
  },
  data() {
    let days = [];
    for (let i = 0; i < 7; i++) {
      const day = moment(this.startDay)
        .add(i, "days")
        .toISOString();
      days.push(day);
    }

    return {
      days
    };
  },
  methods: {
    moment
  }
};
</script>


<style lang="scss" scoped>
.week-container {
  display: grid;
  grid-template-columns: 10px repeat(7, 1fr);
  height: 100%;
  width: 100%;
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

  .day-header {
    background: #ccc;
    color: #333;
    padding: 2px 0;
    font-weight: bold;
  }
}

.day-header:first-of-type {
  border-top-left-radius: 5px;
}
.day-header:last-of-type {
  border-top-right-radius: 5px;
}

.day-buttons {
  display: flex;
  justify-content: flex-start;
}
</style>
