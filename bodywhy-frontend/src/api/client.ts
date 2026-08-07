import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export interface LoginResponse {
  token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/api/auth/login", {
    email,
    password,
  });

  return response.data;
}
export async function register(email: string, password: string) {
  await api.post("/api/auth/register", {
    email,
    password,
  });
}