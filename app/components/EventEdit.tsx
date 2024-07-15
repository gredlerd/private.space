import { Pencil } from "lucide-react";
import React from "react";
import { PageHeadline } from "./PageHeadline";
import { EventDetails } from "./EventDetails";
import { EventType } from "@/types/event";
import { format, parse } from "date-fns";

type EventEditProps = {
  closeModal: () => void;
};

export const EventEdit = ({ closeModal }: EventEditProps) => {
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
    <div className="fixed top-0 left-0 h-screen w-full bg-gray-200 flex items-center z-50 flex-col justify-between">
      <div className="pt-10">
        <div className="flex flex-col">
          <PageHeadline title={"Admin Einstellungen"} />
        </div>
        <div className="flex justify-center items-center text-vsvGray font-bold text-2xl pb-4">
          <span>Event erstellen</span>
        </div>
      </div>
      <div className="flex flex-col w-full p-5 h-full justify-between">
        <div>
          <EventDetails
            date={formattedDate}
            location={event.attributes.location}
            title={event.attributes.title}
            startTime={formattedStartTime}
            endTime={formattedEndTime}
            layout="light"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray"
            onClick={closeModal}
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
