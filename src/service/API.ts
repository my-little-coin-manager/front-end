import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.accessToken}`;
  return config;
});

instance.interceptors.response.use(
  (config) => {
    if (config.data.newAccessToken) {
      localStorage.setItem("accessToken", config.data.newAccessToken);
      return axios({
        ...config.config,
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`
        }
      });
    }
    return config;
  },
  (error) => {
    if (error.response.data.msg.incluedes("만료")) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default instance;
