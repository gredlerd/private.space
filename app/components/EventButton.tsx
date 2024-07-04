import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

type EventButtonProps = {
  status: "green" | "gray" | "red";
  participant: number;
};

export const EventButton = ({ status, participant }: EventButtonProps) => {
  return (
    <button
      className={`gap-2 py-4 flex justify-center flex-row w-full bg-white 
        ${status === "green" && "text-green-600 rounded-bl-md"}
        ${status === "gray" && "text-gray-600"}
        ${status === "red" && "text-red-600 rounded-br-md"}`}
    >
      {" "}
      {status === "green" && <ThumbsUp />}
      {status === "gray" && <CircleHelp />}
      {status === "red" && <ThumbsDown />}
      <div> {participant} </div>
    </button>
  );
};
