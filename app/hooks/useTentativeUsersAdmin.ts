import axiosInstance from "@/config/axios-config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { ParticipantType } from "../components/ParticipantsDetails";

export async function tentativeUserById(
  id: string,
  userID: number,
  tentativeUserUntilNow: ParticipantType[]
) {
  try {
    const idsOfUsers = tentativeUserUntilNow.map((el) => el.id);
    const response = await axiosInstance.put(`/events/${id}`, {
      data: {
        unsicher: [...idsOfUsers, userID],
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error tentativing user:", error);
    throw new Error("Failed to tentative user");
  }
}

export const useTentativeUserAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      tentativeUserUntilNow,
      userID,
    }: {
      id: string;
      tentativeUserUntilNow: ParticipantType[];
      userID: number;
    }) => tentativeUserById(id, userID, tentativeUserUntilNow),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};
