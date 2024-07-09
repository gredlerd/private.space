"use client";
import React, { useState } from "react";
import { EventButton } from "./EventButton";
import { EventDetails } from "./EventDetails";
import { EventParticipants } from "./EventParticipants";
import { EventType } from "@/types/event";

type EventCardProps = {
  event: EventType;
};

export const EventCard = ({ event }: EventCardProps) => {
  const [modal, setModal] = useState(false);

  const handleModalClose = () => {
    setModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex w-full flex-col shadow-lg m-10 rounded-lg bg-vsvGray text-white">
        <div className="p-4" onClick={() => setModal(true)}>
          <EventDetails
            date={event.attributes.eventDate}
            location={event.attributes.location}
            title={event.attributes.title}
            time={event.attributes.startTime}
            layout="light"
          />
        </div>
        <div className="flex flex-row bg-vsvGray rounded-lg">
          <EventButton
            status="green"
            date={event.attributes.eventDate}
            location={event.attributes.location}
            title={event.attributes.title}
            time={event.attributes.startTime}
          />
          <hr className="w-0.5 h-16 border-t-0 border-gray-100" />
          <EventButton
            status="gray"
            date={event.attributes.eventDate}
            location={event.attributes.location}
            title={event.attributes.title}
            time={event.attributes.startTime}
          />
          <hr className="w-0.5 h-16 border-t-0 border-gray-100" />
          <EventButton
            status="red"
            date={event.attributes.eventDate}
            location={event.attributes.location}
            title={event.attributes.title}
            time={event.attributes.startTime}
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
