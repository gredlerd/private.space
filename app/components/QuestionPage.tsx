import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import axiosInstance from "@/config/axios-config";
import { EventDetails, EventDetailsProps } from "./EventDetails";

type QuestionPageProps = EventDetailsProps & {
  closeModal: () => void;
  status: "green" | "gray" | "red";
  eventId: string;
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
}: QuestionPageProps) => {
  const { data: session } = useSession();

  const handleConfirm = async () => {
    if (!session || !session.user) return;

    try {
      const response = await axiosInstance.put(`/events/${eventId}`, {
        confirmed: [...(session.user.confirmed || []), session.user.id],
      });
      console.log("Event confirmed:", response.data);
      closeModal();
    } catch (error) {
      console.error("Error confirming event:", error);
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
        {status === "green" && <p>Event zusagen</p>}
        {status === "gray" && <p>Noch unsicher...</p>}
        {status === "red" && <p>Event absagen</p>}
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
            className={`text-xl w-full  border rounded-lg  p-4
        ${status === "green" && "bg-green-600"}
        ${status === "gray" && "bg-vsvGray"}
        ${status === "red" && "bg-red-600"}
        `}
            onClick={handleConfirm}
          >
            {status === "green" && <p>Event zusagen</p>}
            {status === "gray" && <p>Teilnahme unsicher</p>}
            {status === "red" && <p>Event absagen</p>}
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
