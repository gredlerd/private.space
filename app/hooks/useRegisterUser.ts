import axiosInstance from "@/config/axios-config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

interface RegisterData {
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  password: string;
  username: string;
}

export async function addNewUser(data: RegisterData) {
  try {
    const response = await axiosInstance.post("/auth/local/register", data);
    return response.data;
  } catch (error) {
    throw new Error("fehler beim adden eines users");
  }
}

export const useRegisterUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: RegisterData) => addNewUser(data),
    onSuccess: () => {
      router.push("/login");
    },
  });
};
