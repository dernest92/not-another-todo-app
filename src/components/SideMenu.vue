<template>
  <div class="side-menu" :class="{open: sideMenu, 'mobile-open': mobileOpen}">
    <div class="overlay"></div>
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
        <b-switch>Show Completed</b-switch>
      </div>
    </div>
    <!-- <b-datepicker inline size="is-small" class="date-picker"></b-datepicker> -->
    <button @click="logout" class="btn">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterCategories: false,
      showCompleted: true,
      addingCategory: false,
      newCatName: "",
      selectedCategories: [],
      categoryOptions: []
    };
  },
  computed: {
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
    }
  },
  created() {
    setTimeout(() => {
      this.selectedCategories = this.categories.map(cat => cat.id);
    }, 0);
  },
  methods: {
    changeShowComplete() {
      console.log("toggle show complete");
    },
    changeFilter() {
      console.log("filter categories", this.filterCategories);
      this.$store.dispatch("toggleCatFilter", this.filterCategories);
    },
    closeMobileMenu() {
      this.$store.dispatch("closeMobileMenu");
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
.date-picker {
  text-align: center;
  margin: 0;
}
.side-menu {
  text-align: left;
  border-right: none;
  width: 0;
  background: #f4f4f4;
  overflow: hidden;
  transition: all 0.5s;

  &.open {
    width: 350px;
    border-right: 1px #ccc solid;
    padding-left: 5px;
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
      width: 0;
      border-right: none;
      padding-left: 0;
    }

    &.mobile-open {
      width: 275px;
      border-right: 1px #ccc solid;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
      padding-left: 0;

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
      }
    }
  }
}
</style>
