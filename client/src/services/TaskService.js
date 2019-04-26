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
    return apiClient.patch(`/tasks/${task.id}`, task);
  },
  deleteTask(id) {
    return apiClient.delete(`/tasks/${id}`);
  }
};
