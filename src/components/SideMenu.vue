<template>
  <div class="side-menu" :class="{open: sideMenu, 'mobile-open': mobileOpen}">
    <div @click="mobileCloseMenu" class="overlay"></div>
    <div class="menu-content">
      <div class="categories">
        <b-switch v-model="filterCategories" @input="changeFilter">Filter Categories</b-switch>
        <b-collapse :open="filterCategories">
          <div class="field" v-for="category in categories" :key="category.id" @change="update">
            <b-checkbox v-model="selectedCategories" :native-value="category.id">{{category.name}}</b-checkbox>
          </div>
        </b-collapse>
      </div>
      <div class="categories">
        <div class="some-header">
          <b-switch v-model="showCompleted">Show Completed</b-switch>
        </div>
      </div>
      <b-field label="Select Date">
        <b-datepicker
          v-model="datepickerDate"
          placeholder="Select date..."
          icon="calendar-today"
          editable
          :inline="screenWidth > 1087"
        ></b-datepicker>
      </b-field>
      <button class="button is-link" @click="goToToday">
        <b-icon icon="calendar-today"></b-icon>
        <span>Today</span>
      </button>
      <button @click="logout" class="button logout is-primary">Logout</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      filterCategories: false,
      addingCategory: false,
      newCatName: "",
      selectedCategories: [],
      categoryOptions: [],
      screenWidth: undefined
    };
  },
  computed: {
    datepickerDate: {
      get() {
        return new Date(this.$store.state.selectedDate);
      },
      set(date) {
        const setDate = moment(date)
          .startOf("day")
          .toISOString();
        this.$store.dispatch("setSelectedDate", setDate);
      }
    },
    sideMenu() {
      return this.$store.state.sideMenu;
    },
    mobileOpen() {
      return this.$store.state.sideMenuMobile;
    },
    categories() {
      return this.$store.getters.categories;
    },
    selectedTasks() {
      return this.$store.getters.selectedTasks;
    },
    showCompleted: {
      get() {
        return this.$store.showCompleted;
      },
      set(value) {
        this.$store.dispatch("setShowCompleted", value);
      }
    }
  },
  created() {
    setTimeout(() => {
      this.selectedCategories = this.categories.map(cat => cat.id);
    }, 0);

    this.$nextTick(() => {
      this.screenWidth = window.innerWidth;
      window.addEventListener("resize", () => {
        this.screenWidth = window.innerWidth;
      });
    });
  },
  methods: {
    goToToday() {
      this.datepickerDate = new Date();
      this.mobileCloseMenu();
    },
    mobileCloseMenu() {
      if (this.screenWidth < 1000) {
        this.$store.dispatch("toggleMenu");
      }
    },
    changeFilter() {
      this.$store.dispatch("toggleCatFilter", this.filterCategories);
    },
    update() {
      this.$store.dispatch("selectCategory", this.selectedCategories);
    },
    addCategory() {
      this.addingCategory = !this.addingCategory;
      this.$nextTick(() => {
        this.$refs.newCat.focus();
      });
    },
    cancelCategory() {
      this.addingCategory = false;
      this.newCatName = "";
    },
    saveCategory() {
      this.$store.dispatch("addCategory", { name: this.newCatName });
      this.addingCategory = false;
      this.newCatName = "";
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>


<style lang="scss" scoped>
.side-menu {
  padding-top: 48px;
  z-index: 4;
  text-align: left;
  border-right: none;
  width: 0;
  background: #f4f4f4;
  overflow: hidden;
  transition: all 0.5s;
  overflow-y: auto;

  .menu-content {
    margin: 20px 10px;
    position: relative;
    right: 300px;
    transition: all 0.5s;
    height: calc(100% - 48px);
    display: flex;
    flex-direction: column;
  }

  .collapse {
    margin: 10px;
  }

  .button.logout {
    margin-top: auto;
  }

  &.open {
    width: 352px;
    border-right: 1px #ccc solid;
    padding-left: 5px;

    .menu-content {
      right: 0;
    }
  }
}

.checkbox-label {
  display: flex;
  align-items: center;
  border-bottom: #333333 dotted 1px;
  margin-bottom: 5px;

  input[type="checkbox"] {
    display: inline-block;
    width: 15px;
    margin: 0 5px;
  }
}

.overlay {
  display: none;
}

@media screen and (max-width: 700px) {
  .side-menu {
    padding-top: 48px;

    .overlay {
      display: block;
      pointer-events: none;
      opacity: 0;
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      transition: all 0.5s;
    }

    &.open {
      width: 275px;
      .overlay {
        display: block;
        pointer-events: all;
        opacity: 1;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        left: 275px;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 500;
      }
    }
  }
}
</style>
