<template>
  <div class="login-page">
    <div class="login-image"></div>
    <div class="login-container">
      <div>
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
              class="btn primary full"
              :disabled="false"
            >Register</button>
            <button
              type="submit"
              v-else
              @click="submitLogin"
              class="btn primary full"
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
  </div>
</template>

<script>
import TaskService from "../services/TaskService.js";

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
        this.$router.push("calendar");
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
        this.$router.push("calendar");
      } catch (e) {
        console.log("could not log in");
      }
    }
  },
  computed: {},
  async created() {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    TaskService.setToken(token);
    if (token && user) {
      this.$store.dispatch("setUserToken", { token, user });
      await this.$store.dispatch("fetchTasks");
      this.$router.push("calendar");
    }
  }
};
</script>

<style lang="scss" scoped>
.login-image {
  width: 60%;
  height: 100%;
  background-image: url("../assets/images/neil-rosenstech-467457-unsplash-min.jpg");
  // background-image: url("https://source.unsplash.com/1600x900/?nature");

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.btn.full {
  width: 100%;
  margin: 5px 0;
}
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40%;
  min-width: 550px;

  height: 100%;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.375);
}

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

@media screen and (max-width: 700px) {
  .login-image {
    display: none;
  }
  .login-container {
    width: 100%;
  }
}
</style>
