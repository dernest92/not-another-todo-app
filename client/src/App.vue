<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/calendar-icon.png" class="vue-logo">
    <div>
      <button @click="changeFirstOfMonth({unit: 'months', qty: -1})">last month</button>
      <button @click="changeFirstOfMonth({unit: 'months', qty: 1})">next month</button>
    </div>
    <div>
      <button @click="changeFirstOfMonth({unit: 'weeks', qty: -1})">last week</button>
      <button @click="changeFirstOfMonth({unit: 'weeks', qty: 1})">next week</button>
    </div>
    <div class="container">
      <Week
        v-for="(week, index) in weeks"
        :key="week"
        :startDay="week"
        :isFirstWeek="index === 0 ? true : false "
      />
    </div>
  </div>
</template>

<script>
import Week from "./components/Week.vue";
import moment from "moment";

export default {
  name: "app",
  components: {
    Week
  },
  data() {
    return {
      firstOfMonth: {},
      weeks: []
    };
  },
  methods: {
    setWeeks() {
      const weeks = [];
      for (let i = 0; i < 5; i++) {
        const week = moment(this.firstOfMonth)
          .add(i, "weeks")
          .toISOString();
        weeks.push(week);
      }
      this.weeks = weeks;
    },

    changeFirstOfMonth({ unit, qty }) {
      this.firstOfMonth = moment(this.firstOfMonth)
        .add(qty, unit)
        .startOf("week")
        .toISOString();

      this.setWeeks();
    }
  },
  created() {
    const firstOfMonth = moment()
      .startOf("month")
      .startOf("week")
      .toISOString();
    // this.$store.dispatch("setMonthStart", firstOfMonth);
    this.firstOfMonth = firstOfMonth;
    this.setWeeks();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.vue-logo {
  height: 50px;
  width: auto;
  margin-bottom: 50px;
  cursor: pointer;
}

.container {
  max-width: 1100px;
  padding: 5px;
  margin: 0 auto;
}
</style>
