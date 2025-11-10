import axios from "axios";

const API_BASE = "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const fetchChannels = () => api.get("/channels");
export const createChannel = (data) => api.post("/channels", data);
export const fetchMessages = (id) => api.get(`/messages/channel/${id}`);
export const sendMessage = (data) => api.post("/messages", data);
export const aiReply = (data) => api.post("/ai/reply", data);

export default api;
