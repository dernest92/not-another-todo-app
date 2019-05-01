import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2M5YmVhYmNhNGE4YjIwOTAyNWJkMzciLCJpYXQiOjE1NTY3Mjc0NTV9.wGFoj2UYOwCY-c8-ihB7MpULeId8lZE-xqnUE6SFZZM",
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
  }
};
