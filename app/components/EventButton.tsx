"use client";
import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import { QuestionPage } from "./QuestionPage";
import { EventType } from "@/types/event";
import { ParticipantType } from "./ParticipantsDetails";

type EventButtonProps = {
  status: "green" | "gray" | "red";
  event: EventType;
  participants?: number;
  confirmedUserUntilNow?: ParticipantType[];
  cancelledUserUntilNow?: ParticipantType[];
  tentativeUserUntilNow?: ParticipantType[];
  disabled?: boolean;
};

export const EventButton = ({
  status,
  event,
  participants,
  confirmedUserUntilNow,
  cancelledUserUntilNow,
  tentativeUserUntilNow,
  disabled = false,
}: EventButtonProps) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <button
          disabled={disabled}
          onClick={() => setModal(true)}
          className={`gap-2 py-5 font-bold items-center text-xl flex justify-center flex-row w-full bg-white 
          ${status === "green" && "text-green-600 rounded-bl-md"}
          ${status === "gray" && "text-vsvGray"}
          ${status === "red" && "text-red-600 rounded-br-md"}`}
        >
          {status === "green" && <ThumbsUp />}
          {status === "gray" && <CircleHelp />}
          {status === "red" && <ThumbsDown />}
          {participants && (
            <span className="ml-2">{participants <= 0 ? 0 : participants}</span>
          )}
        </button>
      </div>
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
          confirmedUserUntilNow={
            confirmedUserUntilNow ? confirmedUserUntilNow : []
          }
          cancelledUserUntilNow={
            cancelledUserUntilNow ? cancelledUserUntilNow : []
          }
          tentativeUserUntilNow={
            tentativeUserUntilNow ? tentativeUserUntilNow : []
          }
        />
      )}
    </>
  );
};
