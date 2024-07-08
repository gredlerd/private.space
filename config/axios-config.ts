import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.68.198:1337/api",
  timeout: 3000,
});
