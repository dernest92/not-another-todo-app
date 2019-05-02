import axios from "axios";
const baseURL = process.env.VUE_APP_MONGO_DB_URL;
const apiClient = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json"
  }
});

export default {
  getTasks() {
    return apiClient.get("/tasks");
  },
  postTask(task) {
    return apiClient.post("/tasks", task);
  },
  updateTask(task) {
    const { completed, title, priority, notes, date } = task;
    const updates = { completed, title, priority, notes, date };
    return apiClient.patch(`/tasks/${task._id}`, updates);
  },
  deleteTask(id) {
    return apiClient.delete(`/tasks/${id}`);
  },
  login(user) {
    return apiClient.post("/users/login", user);
  },
  logout() {
    return apiClient.post("/users/logout");
  },
  setToken(token) {
    return (apiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`);
  },
  register(credentials) {
    return apiClient.post("/users", credentials);
  }
};
