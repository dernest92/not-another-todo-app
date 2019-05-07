<template>
  <div class="side-menu" :class="{open: sideMenu}">
    <router-link to="/calendar" class="link">Month</router-link>
    <router-link to="/day" class="link">Day</router-link>
    <router-link to="/list" class="link">List</router-link>
    <div class="categories">
      <h2>Category</h2>
      <div
        class="checkbox-label"
        v-for="(category, index) in categories"
        :key="index"
        :value="category.id"
      >
        <input type="checkbox" :value="category.id" v-model="selectedCategories" @change="update">
        {{category.name}}
      </div>
      <div v-if="addingCategory">
        <input type="text" ref="newCat" v-model="newCatName">
      </div>
      <div v-if="!addingCategory">
        <button @click="addCategory">Add Category</button>
      </div>
      <div v-if="addingCategory">
        <button @click="saveCategory">Save</button>
        <button @click="cancelCategory">Cancel</button>
      </div>
    </div>
    <button @click="logout" class="btn">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    update() {
      console.log("update");
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
  border-right: none;
  width: 0;
  background: #f4f4f4;
  overflow: hidden;
  transition: all 0.5s;

  &.open {
    width: 250px;
    border-right: 1px #ccc solid;
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

.categories {
  margin: 5px;
  border: 1px #ccc solid;
  border-radius: 10px;
  padding: 5px;
}

@media screen and (max-width: 700px) {
  .side-menu {
    padding-top: 48px;
  }
}
</style>
