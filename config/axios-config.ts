import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.178.172:1337/api",
  timeout: 3000,
});

export const setAuthToken = async () => {
  const session = await getSession();
  if (session?.jwt) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${session.jwt}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

setAuthToken();

export default axiosInstance;
