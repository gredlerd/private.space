import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import { Span } from "next/dist/trace";
import React from "react";
import { EventDetails } from "./EventDetails";

type QuestionPageProps = {
  closeModal: () => void;
  status: "green" | "gray" | "red";
  date: string;
  location: string;
  title: string;
  time: string;
};

export const QuestionPage = ({
  closeModal,
  status,
  date,
  time,
  location,
  title,
}: QuestionPageProps) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-gray-200 flex items-center z-50  flex-col justify-between">
      <div
        className={`w-full  h-52 items-center flex justify-center font-bold text-3xl flex-col
        ${status === "green" && "bg-green-600"}
        ${status === "gray" && "bg-gray-600"}
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
          time={time}
          title={title}
          location={location}
          layout={"dark"}
        />
        <div className="flex flex-col gap-3 w-full">
          <input
            className="text-xl font-bold text-gray-400 text-center w-full border-2 rounded-lg p-4 border-gray-600 bg-gray-200"
            placeholder={
              status === "red"
                ? "Absagegrund eingeben..."
                : "Nachricht eingeben..."
            }
            type="text"
          />
          <button
            className={`text-xl w-full  border rounded-lg  p-4
        ${status === "green" && "bg-green-600"}
        ${status === "gray" && "bg-gray-600"}
        ${status === "red" && "bg-red-600"}
        `}
            onClick={closeModal}
          >
            {status === "green" && <p>Event zusagen</p>}
            {status === "gray" && <p>Teilnahme unsicher</p>}
            {status === "red" && <p>Event absagen</p>}
          </button>
          <button
            className="text-xl font-bold text-gray-400 w-full border-2 rounded-lg p-4 border-gray-600"
            onClick={closeModal}
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
};
