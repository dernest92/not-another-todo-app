<template>
  <div @click="attemptCloseModal" class="modal-container close-modal">
    <div class="modal-card">
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for>Name</label>
          <input class="full" type="text" placeholder="Your Name" v-model="username" required>
        </div>
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
        <button @click="submitRegister" class="btn primary" :disabled="false">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
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
      this.$store.dispatch("setLoginOpen", false);
    },
    async submitLogin(e) {
      try {
        await this.$store.dispatch("submitLogin", this.loginUser);
      } catch (e) {
        console.log("could not log in");
      }
    },
    async submitRegister(e) {
      try {
        await this.$store.dispatch("submitRegister", {
          name: this.username,
          ...this.loginUser
        });
      } catch (e) {
        console.log("could not log in");
      }
    },
    attemptCloseModal(e) {
      if (e.target.classList.contains("close-modal")) {
        this.closeModal();
      }
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