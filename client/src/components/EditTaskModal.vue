<template>
  <div @click="attemptCloseModal" class="modal-container close-modal">
    <div class="modal-card">
      <form @submit.prevent="updateTask">
        <div class="form-group">
          <label for>Title</label>
          <input class="full" type="text" placeholder="title" v-model="taskEdits.title" required>
        </div>
        <div class="form-group">
          <label for>Priority</label>
          <select v-model="taskEdits.priority" class="full">
            <option value disabled selected class="placeholder-option">priority</option>
            <option
              v-for="(priority, index) in priorities"
              :key="index"
              :value="priority"
            >{{priority}}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Notes</label>
          <textarea @input="resize" class="txt-area" cols="50" v-model="taskEdits.notes"></textarea>
        </div>
        <div class="form-group">
          <label>Completed</label>
          <input type="checkbox" v-model="taskEdits.completed">
        </div>
      </form>
      <div class="btn-group">
        <button @click="closeModal" class="btn btn-flat">cancel</button>
        <button @click="deleteTask" class="btn danger">delete</button>
        <button @click="updateTask" class="btn primary" :disabled="!hasEdits">save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskEdits: {},
      activeField: {
        title: false,
        notes: false
      }
    };
  },
  methods: {
    async updateTask() {
      if (this.hasEdits) {
        await this.$store.dispatch("updateTask", this.taskEdits);
        this.closeModal();
      } else {
        this.closeModal();
      }
    },
    resize(e) {
      const field = e.currentTarget;
      const offset = field.offsetHeight - field.clientHeight;
      field.style.height = field.scrollHeight + offset + "px";
    },
    closeModal() {
      this.$store.dispatch("editModalClose");
    },
    attemptCloseModal(e) {
      if (e.target.classList.contains("close-modal")) {
        this.closeModal();
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
    },
    editNotes() {
      if (this.activeField.notes) {
        this.activeField.notes = false;
      } else {
        this.activeField.notes = true;
        this.$nextTick(() => {
          this.$refs.notes.focus();
        });
      }
    }
  },
  computed: {
    selectedTask() {
      return this.$store.state.editTaskModal.selectedTask;
    },
    priorities() {
      return this.$store.getters.priorities;
    },
    hasEdits() {
      const keys = Object.keys(this.selectedTask);
      let edits = false;
      for (let i = 0; i < keys.length; i++) {
        if (this.selectedTask[keys[i]] != this.taskEdits[keys[i]]) {
          edits = true;
        }
      }
      return edits;
    }
  },
  created() {
    this.taskEdits = { ...this.selectedTask };
  }
};
</script>

<style lang="scss" scoped>
// .form-group {
//   input {
//     border: none;
//     cursor: pointer;
//     font-weight: bold;
//     background: #f4f4f4;

//     &:focus {
//       border: 1px solid #33c3f0;
//       cursor: text;
//     }
//   }
// }
.btn-group {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  .btn {
    margin-left: 10px;
  }
}

.txt-area {
  resize: none;
  height: "inherit";
}
</style>