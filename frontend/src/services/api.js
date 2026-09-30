import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const getCurrentUser = () =>
  api.get("/auth/me");

export const getFarms = () =>
  api.get("/farms");

export const createFarm = (data) =>
  api.post("/farms", data);

export const deleteFarm = (id) =>
  api.delete(`/farms/${id}`);

export const getCrops = () =>
  api.get("/crops");

export const getCropOverview = () =>
  api.get("/crops/overview");

export const getMonitoring = () =>
  api.get("/monitoring");

export const analyzeDisease = (data) =>
  api.post("/disease/analyze", data);

export const getWaterStress = () =>
  api.get("/water-stress");

export const getWeather = (location) =>
  api.get(
    `/weather?location=${encodeURIComponent(location)}`
  );

export const getAnalytics = () =>
  api.get("/analytics");

export const getRecommendations = () =>
  api.get("/recommendations");

export const getReportSummary = () =>
  api.get("/reports/summary");

export default api;