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
    if (error.response.data.msg === "로그인 만료") {
      localStorage.clear();
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      // location.reload();
    }
    return Promise.reject(error);
  }
);

export default instance;
