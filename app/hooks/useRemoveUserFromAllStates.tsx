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
    const confirmedUserIds =
      confirmedUserUntilNow?.map((el) => String(el.id)) || [];
    const tentativeUserIds =
      tentativeUserUntilNow?.map((el) => String(el.id)) || [];
    const cancelledUserIds =
      cancelledUserUntilNow?.map((el) => String(el.id)) || [];

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
        confirmedUserUntilNow || [],
        tentativeUserUntilNow || [],
        cancelledUserUntilNow || []
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};
