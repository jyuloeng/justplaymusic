import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TIME_OUT = 5000;

const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

request.interceptors.request.use(
  (config) => {
    if (config.method === "get") {
      config.data = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use((config) => {
  return config.data;
});

export default request;
