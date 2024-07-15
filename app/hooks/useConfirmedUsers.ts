import axiosInstance from "@/config/axios-config";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

export interface ConfirmedUserData {
  id: string;
}

export async function confirmedUserById(id: string) {
  try {
    const response = await axiosInstance.put(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error confirming user:", error);
    throw new Error("Failed to confirm user");
  }
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: ConfirmedUserData) => confirmedUserById(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
      router.push("/dashboard");
    },
  });
};
