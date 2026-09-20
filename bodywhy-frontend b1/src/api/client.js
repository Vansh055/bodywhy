import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export async function login(email, password) {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function register(email, password) {
  await api.post("/api/auth/register", {
    email,
    password,
  });
}

export async function getNode(id) {
  const response = await api.get(`/api/nodes/${id}`);
  return response.data;
}
