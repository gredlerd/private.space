import axiosInstance from "@/config/axios-config";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

export interface UpdateEventData {
  id: number;
  data: {
    title: string;
    eventDate: string;
    startTime: string;
    location: string;
    endTime?: string;
  };
}

export async function updateEvent({ id, data }: UpdateEventData) {
  try {
    const response = await axiosInstance.put(`/events/${id}`, { data });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event");
  }
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateEventData) => updateEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
      router.push("/dashboard");
    },
  });
};
