import axiosInstance from "@/config/axios-config";
import { Inputs } from "@/types/login";

export async function loginUser(data: Inputs) {
  try {
    const response = await axiosInstance.post(`/auth/local`, data);

    return response.data;
  } catch (error) {
    console.error("Error login user:", error);
    throw new Error("Failed to login user");
  }
}
