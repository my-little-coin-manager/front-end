import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_COIN_API_URL,
  headers: { Authorization: `Bearer ${localStorage.accessToken}` }
});

instance.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

export default instance;
