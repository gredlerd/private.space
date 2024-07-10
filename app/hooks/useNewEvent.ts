import axiosInstance from "@/config/axios-config";
import { NewEventType } from "@/types/newEvent";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { EventTypeInput } from "@/types/newEvent";

export interface RegisterData {
  data: EventTypeInput;
}

export async function NewEvent(data: RegisterData) {
  try {
    const response = await axiosInstance.post(`/events`, data);

    return response.data;
  } catch (error) {
    console.error("Error creating new event:", error);
    throw new Error("Failed to create new event");
  }
}

export const useNewEvent = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: RegisterData) => NewEvent(data),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
};
