import axiosInstance from "@/config/axios-config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { ParticipantType } from "../components/ParticipantsDetails";

export async function confirmedUserById(
  id: string,
  userID: string,
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

export const useConfirmedUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, status } = useSession();

  return useMutation({
    mutationFn: ({
      id,
      confirmedUserUntilNow,
    }: {
      id: string;
      confirmedUserUntilNow: ParticipantType[];
    }) =>
      confirmedUserById(id, String(session?.user.id), confirmedUserUntilNow),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};
