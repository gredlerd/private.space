import axiosInstance from "@/config/axios-config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

export async function tentativeUserById(id: string, userID: string) {
  try {
    const response = await axiosInstance.put(`/events/${id}`, {
      data: {
        unsicher: [userID],
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error tentativing user:", error);
    throw new Error("Failed to tentative user");
  }
}

export const useTentativeUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, status } = useSession();

  return useMutation({
    mutationFn: (id: string) => tentativeUserById(id, String(session?.user.id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};
