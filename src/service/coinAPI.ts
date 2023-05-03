import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_COIN_API_URL
});

instance.interceptors.request.use((config) => {
  return config;
});

export default instance;
