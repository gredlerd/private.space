import axiosInstance from "@/config/axios-config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

export async function cancelledUserById(id: string, userID: string) {
  try {
    const response = await axiosInstance.put(`/events/${id}`, {
      data: {
        absage: [userID],
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error cancelling user:", error);
    throw new Error("Failed to cancelle user");
  }
}

export const useCancelledUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, status } = useSession();

  return useMutation({
    mutationFn: (id: string) => cancelledUserById(id, String(session?.user.id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};
