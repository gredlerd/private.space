import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import axiosInstance from "@/config/axios-config";
import { EventDetails, EventDetailsProps } from "./EventDetails";
import { useConfirmedUser } from "../hooks/useConfirmedUsers";
import { useTentativeUser } from "../hooks/useTentativeUsers";
import { useCancelledUser } from "../hooks/useCancelledUsers";
import { ParticipantType } from "./ParticipantsDetails";
import { useRemoveUserFromAllStates } from "../hooks/useRemoveUserFromAllStates";

type QuestionPageProps = EventDetailsProps & {
  closeModal: () => void;
  status: "green" | "gray" | "red";
  eventId: string;
  confirmedUserUntilNow: ParticipantType[];
  cancelledUserUntilNow: ParticipantType[];
  tentativeUserUntilNow: ParticipantType[];
};

export const QuestionPage = ({
  closeModal,
  status,
  date,
  startTime,
  endTime,
  location,
  title,
  eventId,
  confirmedUserUntilNow = [], // Fallback auf leere Arrays
  cancelledUserUntilNow = [],
  tentativeUserUntilNow = [],
}: QuestionPageProps) => {
  const { mutate: confirmUser } = useConfirmedUser();
  const { mutate: tentativeUser } = useTentativeUser();
  const { mutate: cancelledUser } = useCancelledUser();
  const { mutate: removeUserFromAllStates } = useRemoveUserFromAllStates();
  const { data: session } = useSession();

  const handleClick = async () => {
    try {
      if (status === "green") {
        if (
          !confirmedUserUntilNow.some((user) => user.id === session?.user.id)
        ) {
          await removeUserFromAllStates({
            id: String(eventId),
            confirmedUserUntilNow: confirmedUserUntilNow || [],
            tentativeUserUntilNow: tentativeUserUntilNow || [],
            cancelledUserUntilNow: cancelledUserUntilNow || [],
          });
          await confirmUser({ id: String(eventId), confirmedUserUntilNow });
        }
      }
      if (status === "gray") {
        if (
          !tentativeUserUntilNow.some((user) => user.id === session?.user.id)
        ) {
          await removeUserFromAllStates({
            id: String(eventId),
            confirmedUserUntilNow: confirmedUserUntilNow || [],
            tentativeUserUntilNow: tentativeUserUntilNow || [],
            cancelledUserUntilNow: cancelledUserUntilNow || [],
          });
          await tentativeUser({ id: String(eventId), tentativeUserUntilNow });
        }
      }
      if (status === "red") {
        if (
          !cancelledUserUntilNow.some((user) => user.id === session?.user.id)
        ) {
          await removeUserFromAllStates({
            id: String(eventId),
            confirmedUserUntilNow: confirmedUserUntilNow || [],
            tentativeUserUntilNow: tentativeUserUntilNow || [],
            cancelledUserUntilNow: cancelledUserUntilNow || [],
          });
          await cancelledUser({ id: String(eventId), cancelledUserUntilNow });
        }
      }
      closeModal();
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-gray-200 flex items-center z-50  flex-col justify-between">
      <div
        className={`w-full  h-52 items-center flex justify-center font-bold text-3xl flex-col
        ${status === "green" && "bg-green-600"}
        ${status === "gray" && "bg-vsvGray"}
        ${status === "red" && "bg-red-600"}
      `}
      >
        {status === "green" && <ThumbsUp className="w-16 h-16" />}
        {status === "gray" && <CircleHelp className="w-16 h-16" />}
        {status === "red" && <ThumbsDown className="w-16 h-16" />}
        {status === "green" && <button>Event zusagen</button>}
        {status === "gray" && <button>Noch unsicher...</button>}
        {status === "red" && <button>Event absagen</button>}
      </div>
      <div className="flex flex-col w-full p-5 h-full justify-between">
        <EventDetails
          date={date}
          startTime={startTime}
          endTime={endTime}
          title={title}
          location={location}
          layout={"dark"}
        />
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleClick}
            className={`text-xl w-full  border rounded-lg  p-4
        ${status === "green" && "bg-green-600"}
        ${status === "gray" && "bg-vsvGray"}
        ${status === "red" && "bg-red-600"}
        `}
          >
            {status === "green" && <span>Event zusagen</span>}
            {status === "gray" && <span>Teilnahme unsicher</span>}
            {status === "red" && <span>Event absagen</span>}
          </button>
          <button
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray"
            onClick={closeModal}
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
};
