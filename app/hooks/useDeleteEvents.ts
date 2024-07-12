import axiosInstance from "@/config/axios-config";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

export interface DeleteEventData {
  title: string;
}

export async function findEventIdByTitle(
  title: string
): Promise<string | null> {
  try {
    const response = await axiosInstance.get(
      `/events?filters[title][$eq]=${title}`
    );
    const events = response.data;
    if (events.length > 0) {
      return events[0].id;
    } else {
      throw new Error("Event not found");
    }
  } catch (error) {
    console.error("Error finding event by title:", error);
    throw new Error("Failed to find event by title");
  }
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

export async function deleteEvent({ title }: DeleteEventData) {
  const eventId = await findEventIdByTitle(title);
  if (eventId) {
    return await deleteEventById(eventId);
  }
}

export const useDeleteEvent = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: DeleteEventData) => deleteEvent(data),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
};
