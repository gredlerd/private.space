"use client";
import React, { useState } from "react";
import { EventButton } from "./EventButton";
import { EventDetails } from "./EventDetails";
import { EventParticipants } from "./EventParticipants";
import { EventType } from "@/types/event";
import { format, parse } from "date-fns";

type EventCardProps = {
  event: EventType;
};

export const EventCard = ({ event }: EventCardProps) => {
  const [modal, setModal] = useState(false);

  const handleModalClose = () => {
    setModal(false);
  };

  const formattedDate = format(
    new Date(event.attributes.eventDate),
    "dd.MM.yyyy"
  );

  let formattedEndTime = "";

  if (event.attributes.endTime) {
    const parsedTimeEnd = parse(
      event.attributes.endTime,
      "HH:mm:ss.SSS",
      new Date()
    );
    formattedEndTime = format(parsedTimeEnd, "HH:mm");
  }

  const parsedTimeStart = parse(
    event.attributes.startTime,
    "HH:mm:ss.SSS",
    new Date()
  );
  const formattedStartTime = format(parsedTimeStart, "HH:mm");

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex w-full flex-col shadow-lg m-10 rounded-lg bg-vsvGray text-white">
        <div className="p-4" onClick={() => setModal(true)}>
          <EventDetails
            date={formattedDate}
            location={event.attributes.location}
            title={event.attributes.title}
            startTime={formattedStartTime}
            endTime={formattedEndTime}
            layout="light"
          />
        </div>
        <div className="flex flex-row bg-vsvGray rounded-lg">
          <EventButton
            status="green"
            date={formattedDate}
            location={event.attributes.location}
            title={event.attributes.title}
            startTime={formattedStartTime}
            endTime={formattedEndTime}
          />
          <hr className="w-0.5 h-16 border-t-0 border-gray-100" />
          <EventButton
            status="gray"
            date={formattedDate}
            location={event.attributes.location}
            title={event.attributes.title}
            startTime={formattedStartTime}
            endTime={formattedEndTime}
          />
          <hr className="w-0.5 h-16 border-t-0 border-gray-100" />
          <EventButton
            status="red"
            date={formattedDate}
            location={event.attributes.location}
            title={event.attributes.title}
            startTime={formattedStartTime}
            endTime={formattedEndTime}
          />
        </div>
      </div>

      {modal && (
        <EventParticipants
          title={"Sommertraining"}
          closeModal={handleModalClose}
        />
      )}
    </div>
  );
};
