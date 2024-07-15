import axiosInstance from "@/config/axios-config";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

export interface DeleteEventData {
  id: string;
}

export async function deleteEventById(id: string) {
  try {
    const response = await axiosInstance.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event");
  }
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: DeleteEventData) => deleteEventById(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
      router.push("/dashboard");
    },
  });
};
