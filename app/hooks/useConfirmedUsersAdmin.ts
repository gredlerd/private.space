import axiosInstance from "@/config/axios-config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { ParticipantType } from "../components/ParticipantsDetails";

export async function confirmedUserById(
  id: string,
  userID: number,
  confirmedUserUntilNow: ParticipantType[]
) {
  try {
    const idsOfUsers = confirmedUserUntilNow.map((el) => el.id);
    const response = await axiosInstance.put(`/events/${id}`, {
      data: {
        zusage: [...idsOfUsers, userID],
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error confirming user:", error);
    throw new Error("Failed to confirm user");
  }
}

export const useConfirmedUserAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      confirmedUserUntilNow,
      userID,
    }: {
      id: string;
      confirmedUserUntilNow: ParticipantType[];
      userID: number;
    }) => confirmedUserById(id, userID, confirmedUserUntilNow),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};
