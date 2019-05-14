<template>
  <div class="login-page">
    <div class="login-image"></div>
    <div class="login-container">
      <div>
        <form @submit.prevent="submitLogin">
          <b-field v-if="newUser" label="Name" custom-class="has-text-white">
            <b-input v-model="username" placeholder="Your Name" icon="account"></b-input>
          </b-field>
          <b-field label="Email" custom-class="has-text-white">
            <b-input placeholder="Email" v-model="loginUser.email" type="email" icon="email"></b-input>
          </b-field>
          <b-field label="Password" custom-class="has-text-white">
            <b-input
              icon="lock"
              type="password"
              placeholder="Password"
              v-model="loginUser.password"
              password-reveal
            ></b-input>
          </b-field>

          <div class="btn-group">
            <b-button
              v-if="newUser"
              native-type="submit"
              type="is-link"
              :loading="btnLoading"
            >Register</b-button>
            <b-button v-else native-type="submit" type="is-link" :loading="btnLoading">Login</b-button>
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
            <a @click="loginGuest" class="link">Guest</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskService from "../services/TaskService.js";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      btnLoading: false,
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
    dangerToast(message) {
      this.$toast.open({
        message: message,
        type: "is-danger",
        position: "is-bottom"
      });
    },
    async loginGuest() {
      await this.$store.dispatch("loginGuest");
      this.$router.push("calendar");
    },
    async submitLogin() {
      this.btnLoading = true;
      if (this.newUser) {
        try {
          await this.$store.dispatch("submitRegister", {
            name: this.username,
            ...this.loginUser
          });
          this.$router.push("/calendar");
        } catch (e) {
          this.dangerToast(e.message);
        } finally {
          setTimeout(() => {
            this.btnLoading = false;
          }, 200);
        }
      } else {
        try {
          await this.$store.dispatch("submitLogin", this.loginUser);
          this.$router.push("/calendar");
        } catch (e) {
          this.dangerToast(e.message);
        } finally {
          setTimeout(() => {
            this.btnLoading = false;
          }, 200);
        }
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

.login-page {
  background: #34495e;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
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
  color: #f4f4f4;
  font-style: italic;
  text-align: center;
  margin-top: 15px;
  padding-top: 10px;
  border-top: #f4f4f4 dotted 1px;
  line-height: 1.5;
}
.link {
  color: #41b883;
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
