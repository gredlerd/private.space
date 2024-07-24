import { CircleHelp, CircleOff, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { UserType } from "@/types/user";
import { useConfirmedUserAdmin } from "../hooks/useConfirmedUsersAdmin";
import { useTentativeUserAdmin } from "../hooks/useTentativeUsersAdmin";
import { useCancelledUserAdmin } from "../hooks/useCancelledUsersAdmin";
import { useRemoveUserFromAllStatesAdmin } from "../hooks/useRemoveUserFromAllStatesAdmin";

export type ParticipantType = {
  id: number;
  attributes: {
    username: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    email: string;
  };
};

type ParticipantsDetailsProps = {
  ConfirmedParticipant: ParticipantType[];
  TentativeParticipant: ParticipantType[];
  CancelledParticipant: ParticipantType[];
  EventId: string;
};

export const ParticipantsDetails = ({
  ConfirmedParticipant,
  TentativeParticipant,
  CancelledParticipant,
  EventId,
}: ParticipantsDetailsProps) => {
  const { data: session } = useSession();
  const { data: users } = useGetAllUsers();

  const confirmedUserMutation = useConfirmedUserAdmin();
  const cancelledUserMutation = useCancelledUserAdmin();
  const tentativeUserMutation = useTentativeUserAdmin();
  const removeUserFromAllStatesMutation = useRemoveUserFromAllStatesAdmin();

  const handleStatusChange = async (userId: number, status: string) => {
    const eventId = EventId;
    const userID = userId;
    console.log(userID);

    try {
      switch (status) {
        case "confirmed":
          if (!ConfirmedParticipant.some((user) => user.id === userID)) {
            await removeUserFromAllStatesMutation.mutateAsync({
              id: eventId,
              confirmedUserUntilNow: ConfirmedParticipant,
              tentativeUserUntilNow: TentativeParticipant,
              cancelledUserUntilNow: CancelledParticipant,
              userID: userID,
            });
            confirmedUserMutation.mutate({
              id: eventId,
              userID: userID,
              confirmedUserUntilNow: ConfirmedParticipant,
            });
            break;
          }

        case "cancelled":
          await removeUserFromAllStatesMutation.mutateAsync({
            id: eventId,
            confirmedUserUntilNow: ConfirmedParticipant,
            tentativeUserUntilNow: TentativeParticipant,
            cancelledUserUntilNow: CancelledParticipant,
            userID: userID,
          });
          cancelledUserMutation.mutate({
            id: eventId,
            userID: userID,
            cancelledUserUntilNow: CancelledParticipant,
          });
          break;
        case "tentative":
          await removeUserFromAllStatesMutation.mutateAsync({
            id: eventId,
            confirmedUserUntilNow: ConfirmedParticipant,
            tentativeUserUntilNow: TentativeParticipant,
            cancelledUserUntilNow: CancelledParticipant,
            userID: userID,
          });
          tentativeUserMutation.mutate({
            id: eventId,
            userID: userID,
            tentativeUserUntilNow: TentativeParticipant,
          });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error handling status change:", error);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between pt-5">
          <span className="text-green-600 font-bold text-xl">Zusagen</span>
          <ThumbsUp className="text-green-600" />
        </div>
        <hr className="border-t-2 border-green-600 my-3 w-full" />
        <div className="flex flex-col justify-start">
          {ConfirmedParticipant.map((el) => (
            <div key={el.id}>
              <span className="text-lg">
                {el.attributes.firstname} {el.attributes.lastname}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between pt-5">
          <span className="text-vsvGray font-bold text-xl">Unsicher</span>
          <CircleHelp className="text-vsvGray" />
        </div>
        <hr className="border-t-2 border-vsvGray my-3 w-full" />
        <div className="flex flex-col justify-start">
          {TentativeParticipant.map((el) => (
            <div key={el.id}>
              <span className="text-lg">
                {el.attributes.firstname} {el.attributes.lastname}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between pt-5">
          <span className="text-red-600 font-bold text-xl">Absagen</span>
          <ThumbsDown className="text-red-600" />
        </div>
        <hr className="border-t-2 border-red-600 my-3 w-full" />
        <div className="flex flex-col justify-start">
          {CancelledParticipant.map((el) => (
            <div key={el.id}>
              <span className="text-lg">
                {el.attributes.firstname} {el.attributes.lastname}
              </span>
            </div>
          ))}
        </div>
      </div>
      {session?.user.isAdmin && (
        <div>
          <div className="flex items-center justify-between pt-5">
            <span className="font-bold text-xl">
              Admin User Teilnahme festlegen
            </span>
          </div>
          <div>
            {users && (
              <>
                {users.map((user: UserType) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-lg">
                      {user.firstname} {user.lastname}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(user.id, "confirmed")}
                        className="text-green-600"
                      >
                        <ThumbsUp />
                      </button>
                      <button
                        onClick={() => handleStatusChange(user.id, "tentative")}
                        className="text-vsvGray"
                      >
                        <CircleHelp />
                      </button>
                      <button
                        onClick={() => handleStatusChange(user.id, "cancelled")}
                        className="text-red-600"
                      >
                        <ThumbsDown />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
