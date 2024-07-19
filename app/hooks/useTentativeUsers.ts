import axiosInstance from "@/config/axios-config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { ParticipantType } from "../components/ParticipantsDetails";

export async function tentativeUserById(
  id: string,
  userID: string,
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

export const useTentativeUser = () => {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();

  return useMutation({
    mutationFn: ({
      id,
      tentativeUserUntilNow,
    }: {
      id: string;
      tentativeUserUntilNow: ParticipantType[];
    }) =>
      tentativeUserById(id, String(session?.user.id), tentativeUserUntilNow),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};
