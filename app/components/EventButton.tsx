"use client";
import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import { QuestionPage } from "./QuestionPage";
import { EventType } from "@/types/event";

type EventButtonProps = {
  status: "green" | "gray" | "red";
  event: EventType;
};

export const EventButton = ({ status, event }: EventButtonProps) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className={`gap-2 py-4 font-bold items-center text-xl flex justify-center flex-row w-full bg-white 
        ${status === "green" && "text-green-600 rounded-bl-md"}
        ${status === "gray" && "text-vsvGray"}
        ${status === "red" && "text-red-600 rounded-br-md"}`}
      >
        {status === "green" && <ThumbsUp />}
        {status === "gray" && <CircleHelp />}
        {status === "red" && <ThumbsDown />}
      </button>
      {modal && (
        <QuestionPage
          closeModal={() => setModal(false)}
          status={status}
          date={event.attributes.eventDate}
          startTime={event.attributes.startTime}
          endTime={event.attributes.endTime}
          location={event.attributes.location}
          title={event.attributes.title}
          eventId={event.id.toString()}
          layout={"dark"}
        />
      )}
    </>
  );
};
