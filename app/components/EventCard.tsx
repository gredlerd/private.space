"use client";
import React, { useState } from "react";
import { EventButton } from "./EventButton";
import { EventDetails } from "./EventDetails";
import { EventParticipants } from "./EventParticipants";
import { EventType } from "@/types/event";
import { format } from "date-fns";

type EventCardProps = {
  event: EventType;
};

export const EventCard = ({ event }: EventCardProps) => {
  const [modal, setModal] = useState(false);

  const handleModalClose = () => {
    setModal(false);
  };

  const formattedDate = String(
    format(new Date(event.attributes.eventDate), "dd.MM.yyyy")
  );
  const formattedStartTime = String(
    format(new Date(`1970-01-01T${event.attributes.startTime}`), "HH:mm")
  );
  const formattedEndTime = String(
    format(new Date(`1970-01-01T${event.attributes.endTime}`), "HH:mm")
  );

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
