import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:1337/api",
  timeout: 3000,
});
