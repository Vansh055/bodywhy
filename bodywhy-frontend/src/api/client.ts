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

export interface NodeData {
  id: string;
  type: string;
  title: string;
  hookText: string | null;
  tensionText: string | null;
  mechanismStepsJson: string | null;
  realizationText: string | null;
  threadText: string | null;
  threadNodeId: string | null;
  depthText: string | null;
  takeawayText: string | null;
  approved: boolean;
  reviewedAt: string | null;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
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

export async function getNode(id: string): Promise<NodeData> {
  const response = await api.get<NodeData>(`/api/nodes/${id}`);
  return response.data;
}