<template>
  <div @click="closeModal" class="modal-container">
    <div class="modal-card">
      <div class="editable">
        <input
          @blur="activeField.title = false"
          ref="search"
          v-if="activeField.title"
          type="text"
          v-model="taskEdits.title"
        >
        <div v-else>
          <h2>{{taskEdits.title}}</h2>

          <button @click="editTitle" class="edit-btn">
            <i class="fas fa-edit fa-lg"></i>
          </button>
        </div>
      </div>
      <div>
        <h3>Notes</h3>
        <p>{{selectedTask.notes}}</p>
      </div>
      <div>
        <input class="checkbox" type="checkbox" name="completed" v-model="hasEdits">
        <span class="label-body">Completed</span>
      </div>
      <div class="btn-group">
        <button @click="closeModal" type="reset" class="btn btn-flat close-modal">cancel</button>
        <button @click="deleteTask" class="btn danger">delete</button>
        <button type="submit" class="btn primary" :disabled="!hasEdits">save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasEdits: false,
      taskEdits: {},
      activeField: {
        title: false
      }
    };
  },
  methods: {
    closeModal(e) {
      if (e.target.classList.contains("modal-container")) {
        this.$store.dispatch("editModalClose");
      }
    },
    async deleteTask() {
      await this.$store.dispatch("deleteTask", this.selectedTask.id);
      this.$store.dispatch("editModalClose");
    },
    editTitle() {
      if (this.activeField.title) {
        this.activeField.title = false;
      } else {
        this.activeField.title = true;
        this.$nextTick(() => {
          this.$refs.search.focus();
        });
      }
    }
  },
  computed: {
    selectedTask() {
      return this.$store.state.editTaskModal.selectedTask;
    }
  },
  created() {
    this.taskEdits = this.selectedTask;
  }
};
</script>

<style lang="scss" scoped>
.btn-group {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  .btn {
    margin-left: 10px;
  }
}

.checkbox {
  display: inline-block;
  margin: 0;
  padding: 0;
  height: 15px;
  width: 15px;
  margin: auto 0;
}

.editable {
  h2 {
    display: inline;
  }
  .edit-btn {
    box-shadow: none;
    height: 100%;
    display: inline-block;
    width: fit-content;
    padding: 0;
    margin-left: 5px;
    visibility: hidden;
  }

  &:hover {
    .edit-btn {
      visibility: visible;
    }
  }
}
</style>