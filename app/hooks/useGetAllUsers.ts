import axiosInstance from "@/config/axios-config";
import { UserType } from "@/types/user";
import { useQuery } from "react-query";

export async function getAllUsers() {
  try {
    const response = await axiosInstance.get(`/users?populate=*`);
    return response.data as UserType[];
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw new Error("Failed to fetch users");
  }
}

export const useGetAllUsers = () => {
  return useQuery(["allUsers"], getAllUsers);
};
