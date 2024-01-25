import axios from "axios";
import { refresh } from "../api/services/auth";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("jwtAccessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      return refresh()
        .then(() => {
          return api(error.config);
        })
        .catch((refreshError) => {
          console.error("Error refreshing token:", refreshError);
          return Promise.reject(refreshError);
        });
    }
    return Promise.reject(error);
  }
);

export default api;