import axiosInstance from "@/config/axios-config";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "react-query";
import { ParticipantType } from "../components/ParticipantsDetails";

export async function removeUserFromAllStatesAdmin(
  id: string,
  userID: number,
  confirmedUserUntilNow: ParticipantType[],
  tentativeUserUntilNow: ParticipantType[],
  cancelledUserUntilNow: ParticipantType[]
) {
  try {
    const confirmedUserIds = confirmedUserUntilNow?.map((el) => el.id) || [];
    const tentativeUserIds = tentativeUserUntilNow?.map((el) => el.id) || [];
    const cancelledUserIds = cancelledUserUntilNow?.map((el) => el.id) || [];

    const confirmed = confirmedUserIds.filter((el) => el !== userID);
    const tentative = tentativeUserIds.filter((el) => el !== userID);
    const canceled = cancelledUserIds.filter((el) => el !== userID);

    const response = await axiosInstance.put(`/events/${id}`, {
      data: {
        zusage: confirmed,
        unsicher: tentative,
        absage: canceled,
      },
    });

    return response;
  } catch (error) {
    console.error("Error removing user from all states:", error);
    throw new Error("Failed to remove user from all states");
  }
}

export const useRemoveUserFromAllStatesAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      confirmedUserUntilNow,
      tentativeUserUntilNow,
      cancelledUserUntilNow,
      userID,
    }: {
      id: string;
      confirmedUserUntilNow: ParticipantType[];
      tentativeUserUntilNow: ParticipantType[];
      cancelledUserUntilNow: ParticipantType[];
      userID: number;
    }) =>
      removeUserFromAllStatesAdmin(
        id,
        userID,
        confirmedUserUntilNow || [],
        tentativeUserUntilNow || [],
        cancelledUserUntilNow || []
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};
