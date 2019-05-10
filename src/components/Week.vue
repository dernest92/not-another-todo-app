<template>
  <div>
    <div class="week-container">
      <Day
        class="day"
        v-for="(date, index) in days"
        :key="index"
        :date="date"
        :tasks="tasks.filter(task => task.date === date)"
      />
    </div>
  </div>
</template>


<script>
import moment from "moment";
import Day from "./Day.vue";
export default {
  props: {
    startDay: String,
    tasks: Array
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
    moment,
    isToday(date) {
      const tasks = this.tasks;
      return tasks.filter(task => {
        task.date == date;
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.week-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 100%;
  width: 100%;
}

.day-buttons {
  display: flex;
  justify-content: flex-start;
}
</style>
