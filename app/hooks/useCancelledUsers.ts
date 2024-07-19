import axiosInstance from "@/config/axios-config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { ParticipantType } from "../components/ParticipantsDetails";

export async function cancelledUserById(
  id: string,
  userID: string,
  cancelledUserUntilNow: ParticipantType[]
) {
  try {
    const idsOfUsers = cancelledUserUntilNow.map((el) => el.id);
    const response = await axiosInstance.put(`/events/${id}`, {
      data: {
        absage: [...idsOfUsers, userID],
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
  const { data: session, status } = useSession();

  return useMutation({
    mutationFn: ({
      id,
      cancelledUserUntilNow,
    }: {
      id: string;
      cancelledUserUntilNow: ParticipantType[];
    }) =>
      cancelledUserById(id, String(session?.user.id), cancelledUserUntilNow),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};
