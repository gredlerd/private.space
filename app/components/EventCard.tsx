"use client";
import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import { EventButton } from "./EventButton";
import { EventDetails } from "./EventDetails";
import { EventParticipants } from "./EventParticipants";
import { EventType } from "@/types/event";
import { format, parse } from "date-fns";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { useSession } from "next-auth/react";

type EventCardProps = {
  event: EventType;
};

export const EventCard = ({ event }: EventCardProps) => {
  const [modal, setModal] = useState(false);
  const { data: session, status } = useSession();

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

  console.log(event);

  const confirmedParticipants = event.attributes.confirmed
    ? event.attributes.confirmed.length
    : 0;
  const tentativeParticipants = event.attributes.tentative
    ? event.attributes.tentative.length
    : 0;
  const cancelledParticipants = event.attributes.cancelled
    ? event.attributes.cancelled.length
    : 0;

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex w-full flex-col shadow-lg m-10 rounded-lg bg-vsvGray text-white">
        <div className="relative p-4" onClick={() => setModal(true)}>
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
            participant={confirmedParticipants}
            date={formattedDate}
            location={event.attributes.location}
            title={event.attributes.title}
            startTime={formattedStartTime}
            endTime={formattedEndTime}
            eventId={String(event.id)}
          />
          <hr className="w-0.5 h-16 border-t-0 border-gray-100" />
          <EventButton
            status="gray"
            participant={tentativeParticipants}
            date={formattedDate}
            location={event.attributes.location}
            title={event.attributes.title}
            startTime={formattedStartTime}
            endTime={formattedEndTime}
            eventId={String(event.id)}
          />
          <hr className="w-0.5 h-16 border-t-0 border-gray-100" />
          <EventButton
            status="red"
            participant={cancelledParticipants}
            date={formattedDate}
            location={event.attributes.location}
            title={event.attributes.title}
            startTime={formattedStartTime}
            endTime={formattedEndTime}
            eventId={String(event.id)}
          />
        </div>
        {session?.user.isAdmin && (
          <div className="flex gap-2 items-center justify-between m-2">
            <div className="flex flex-row gap-3 items-center m-2">
              <DeleteButton eventId={String(event.id)} />
              <span>löschen</span>
            </div>
            <div className="flex flex-row gap-3 items-center m-2">
              <span>bearbeiten</span>
              <EditButton event={event} />
            </div>
          </div>
        )}
      </div>

      {modal && (
        <EventParticipants
          title={event.attributes.title}
          closeModal={handleModalClose}
        />
      )}
    </div>
  );
};
