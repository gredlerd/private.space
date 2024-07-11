import axiosInstance from "@/config/axios-config";
import { EventArray } from "@/types/event";
import { useQuery } from "react-query";

export async function getAllEvents() {
  try {
    const currentDate = new Date().toISOString();
    const response = await axiosInstance.get(
      `/events?populate=*&sort[0]=eventDate:asc&sort[1]=startTime:asc&filters[eventDate][$gt]=${currentDate}`
    );
    return response.data as EventArray;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw new Error("Failed to fetch events");
  }
}

export const useGetAllEvents = () => {
  return useQuery(["allEvents"], getAllEvents);
};
