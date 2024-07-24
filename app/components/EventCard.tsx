"use client";
import React, { useState, useEffect } from "react";
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

const isWithin4Hours = (event: EventType): boolean => {
  const eventDate = new Date(event.attributes.eventDate);
  const startTimeParts = event.attributes.startTime.split(":");
  eventDate.setHours(parseInt(startTimeParts[0], 10));
  eventDate.setMinutes(parseInt(startTimeParts[1], 10));

  const now = new Date();
  const timeDiff = eventDate.getTime() - now.getTime();
  const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));

  return hoursLeft <= 4;
};

export const EventCard = ({ event }: EventCardProps) => {
  const [modal, setModal] = useState(false);
  const [isPastDeadline, setIsPastDeadline] = useState(false);
  const { data: session } = useSession();

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

  useEffect(() => {
    const checkDeadline = () => {
      setIsPastDeadline(isWithin4Hours(event));
    };

    checkDeadline();
    const intervalId = setInterval(checkDeadline, 1000 * 60);

    return () => clearInterval(intervalId);
  }, [event]);

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex w-full flex-col shadow-lg rounded-lg bg-vsvGray text-white">
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
            event={event}
            participants={Number(event.attributes.zusage.data.length)}
            confirmedUserUntilNow={
              event.attributes.zusage && event.attributes.zusage.data
            }
            tentativeUserUntilNow={
              event.attributes.unsicher && event.attributes.unsicher.data
            }
            cancelledUserUntilNow={
              event.attributes.absage && event.attributes.absage.data
            }
            disabled={isPastDeadline && !session?.user.isAdmin}
          />
          <hr className="w-0.5 h-16 border-t-0 border-gray-100" />
          <EventButton
            status="gray"
            event={event}
            participants={Number(event.attributes.unsicher.data.length)}
            confirmedUserUntilNow={
              event.attributes.zusage && event.attributes.zusage.data
            }
            tentativeUserUntilNow={
              event.attributes.unsicher && event.attributes.unsicher.data
            }
            cancelledUserUntilNow={
              event.attributes.absage && event.attributes.absage.data
            }
            disabled={isPastDeadline && !session?.user.isAdmin}
          />
          <hr className="w-0.5 h-16 border-t-0 border-gray-100" />
          <EventButton
            status="red"
            event={event}
            participants={Number(event.attributes.absage.data.length)}
            confirmedUserUntilNow={
              event.attributes.zusage && event.attributes.zusage.data
            }
            tentativeUserUntilNow={
              event.attributes.unsicher && event.attributes.unsicher.data
            }
            cancelledUserUntilNow={
              event.attributes.absage && event.attributes.absage.data
            }
            disabled={isPastDeadline && !session?.user.isAdmin}
          />
        </div>
        {isPastDeadline && !session?.user.isAdmin && (
          <div className="text-center text-white bg-red-600 p-2">
            Zeit zum Zu-/Absagen abgelaufen!
          </div>
        )}
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
          ConfirmedParticipant={event.attributes.zusage.data}
          TentativeParticipant={event.attributes.unsicher.data}
          CancelledParticipant={event.attributes.absage.data}
          EventId={event.id}
        />
      )}
    </div>
  );
};
