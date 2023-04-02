import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: { Authorization: `Bearer ${localStorage.accessToken}` }
});

instance.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

export default instance;
