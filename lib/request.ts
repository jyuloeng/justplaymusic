import axios from "axios";
import { AUTH_COOKIE_KEY, getAuthCookie } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TIME_OUT = 5000;

const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

request.interceptors.request.use(
  (config) => {
    if (!config.params) config.params = {};
    const authCookie = getAuthCookie();
    if (authCookie) {
      config.params.cookie = `${AUTH_COOKIE_KEY}=${authCookie};`;
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
