<template>
  <div class="modal-container close-modal">
    <div class="modal-card">
      <form @submit.prevent>
        <div v-if="newUser" class="form-group">
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
        <div class="btn-group">
          <button
            v-if="newUser"
            type="submit"
            @click="submitRegister"
            class="btn primary"
            :disabled="false"
          >Register</button>
          <button
            type="submit"
            v-else
            @click="submitLogin"
            class="btn primary"
            :disabled="false"
          >Login</button>
        </div>
      </form>
      <div class="modal-footer">
        <div v-if="newUser">
          Already have an account?
          <a class="link" @click="newUser = !newUser">Login</a>
        </div>
        <div v-else>
          Dont have an account?
          <a class="link" @click="newUser = !newUser">Register</a>
        </div>
        <div>
          Continue as
          <a class="link">Guest</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: false,
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
.modal-footer {
  color: #999;
  font-style: italic;
  text-align: center;
  margin-top: 15px;
  padding-top: 10px;
  border-top: #999 dotted 1px;
  line-height: 1.5;
}
.link {
  color: blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
