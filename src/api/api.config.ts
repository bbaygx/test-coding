import { baseUrl } from "@/lib/lib";
import axios, { AxiosInstance } from "axios";
import { jwtDecode } from "jwt-decode";

export function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: `${baseUrl}`,
    timeout: 5000,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      const decodedToken = jwtDecode(token!);

      if (decodedToken) {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
}

const axiosInstance = createAxiosInstance();

export default axiosInstance;
