// config/axios-config.ts
import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api",
  timeout: 3000,
});

// Function to set the auth token
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

// Call setAuthToken when your app initializes
setAuthToken();

export default axiosInstance;
