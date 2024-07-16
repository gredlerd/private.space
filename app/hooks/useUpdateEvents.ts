import axiosInstance from "@/config/axios-config";
import { useMutation, useQueryClient } from "react-query";

export interface UpdateEventData {
  id: string;
  data: {
    title?: string;
    eventDate?: Date;
    startTime?: string;
    location?: string;
    endTime?: string;
    confirmed?: any[];
    tentative?: any[];
    cancelled?: any[];
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
  return useMutation({
    mutationFn: (data: UpdateEventData) => updateEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};
