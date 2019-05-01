<template>
  <div @click="attemptCloseModal" class="modal-container close-modal">
    <div class="modal-card">
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for>Email</label>
          <input
            class="full"
            type="email"
            placeholder="example@email.com"
            v-model="loginUser.email"
            required
          >
        </div>
        <div class="form-group">
          <label for>Password</label>
          <input
            class="full"
            type="password"
            placeholder="password"
            v-model="loginUser.password"
            required
          >
        </div>
      </form>
      <div class="btn-group">
        <button @click="closeModal" class="btn btn-flat">cancel</button>
        <button @click="submitLogin" class="btn primary" :disabled="false">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUser: {
        email: "",
        password: ""
      },
      taskEdits: {},
      activeField: {
        title: false,
        notes: false
      }
    };
  },
  methods: {
    closeModal() {
      console.log("close modal");
      this.$store.dispatch("setLoginOpen", false);
    },
    async submitLogin(e) {
      await this.$store.dispatch("submitLogin", this.loginUser);
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