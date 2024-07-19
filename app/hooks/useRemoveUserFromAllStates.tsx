import axiosInstance from "@/config/axios-config";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "react-query";
import { ParticipantType } from "../components/ParticipantsDetails";

export async function removeUserFromAllStates(
  id: string,
  userID: string,
  confirmedUserUntilNow: ParticipantType[],
  tentativeUserUntilNow: ParticipantType[],
  cancelledUserUntilNow: ParticipantType[]
) {
  try {
    const confirmedUserIds = confirmedUserUntilNow.map((el) => String(el.id));
    const tentativeUserIds = tentativeUserUntilNow.map((el) => String(el.id));
    const cancelledUserIds = cancelledUserUntilNow.map((el) => String(el.id));

    const response = await axiosInstance.put(`/events/${id}`, {
      data: {
        zusage: confirmedUserIds.filter((el) => el !== userID),
        unsicher: tentativeUserIds.filter((el) => el !== userID),
        absage: cancelledUserIds.filter((el) => el !== userID),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error removing user from all states:", error);
    throw new Error("Failed to remove user from all states");
  }
}

export const useRemoveUserFromAllStates = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: ({
      id,
      confirmedUserUntilNow,
      tentativeUserUntilNow,
      cancelledUserUntilNow,
    }: {
      id: string;
      confirmedUserUntilNow: ParticipantType[];
      tentativeUserUntilNow: ParticipantType[];
      cancelledUserUntilNow: ParticipantType[];
    }) =>
      removeUserFromAllStates(
        id,
        String(session?.user.id),
        confirmedUserUntilNow,
        tentativeUserUntilNow,
        cancelledUserUntilNow
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};
