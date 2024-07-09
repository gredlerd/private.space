"use client";
import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { useState } from "react";
import { QuestionPage } from "./QuestionPage";

type EventButtonProps = {
  status: "green" | "gray" | "red";
  participant?: number;
  date: Date;
  location: string;
  title: string;
  time: string;
};

export const EventButton = ({
  status,
  participant,
  date,
  location,
  title,
  time,
}: EventButtonProps) => {
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
        <div> {participant} </div>
      </button>
      {modal && (
        <QuestionPage
          closeModal={() => setModal(false)}
          status={status}
          date={date}
          location={location}
          title={title}
          time={time}
        />
      )}
    </>
  );
};
