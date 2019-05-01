import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
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
    console.log(`/tasks/${task._id}`);
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
  setToken(token) {
    return (apiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`);
  }
};