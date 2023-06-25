import axios from "axios";
import { endPoint } from "../Constant/api";
const instance = axios.create({
  baseURL: endPoint,
});

instance.interceptors.request.use(
  function (config) {
    // Kiểm tra và thêm token vào header nếu có
    const token = localStorage.getItem("user-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
