import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { EventButton } from "./EventButton";

type ParticipantsDetailsProps = {
  ConfirmendParticipant: string;
  TentativeParticipant: string;
  CancelledParticipant: string;
};

export const ParticipantsDetails = ({
  ConfirmendParticipant,
  TentativeParticipant,
  CancelledParticipant,
}: ParticipantsDetailsProps) => {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between pt-5">
          <span className="text-green-600 font-bold text-xl">Zusagen</span>
          <ThumbsUp className="text-green-600" />
        </div>
        <hr className="border-t-2 border-green-600 my-3 w-full" />
        <div className="flex items-center justify-between">
          <span className="text-lg">{ConfirmendParticipant}</span>
          <EventButton
            status="green"
            date="2024-07-16"
            location="Location"
            title="Event Title"
            startTime="10:00"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between pt-5">
          <span className="text-vsvGray font-bold text-xl">Unsicher</span>
          <CircleHelp className="text-vsvGray" />
        </div>
        <hr className="border-t-2 border-vsvGray my-3 w-full" />
        <div className="flex items-center justify-between">
          <span className="text-lg">{TentativeParticipant}</span>
          <EventButton
            status="gray"
            date="2024-07-16"
            location="Location"
            title="Event Title"
            startTime="10:00"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between pt-5">
          <span className="text-red-600 font-bold text-xl">Absagen</span>
          <ThumbsDown className="text-red-600" />
        </div>
        <hr className="border-t-2 border-red-600 my-3 w-full" />
        <div className="flex items-center justify-between">
          <span className="text-lg">{CancelledParticipant}</span>
          <EventButton
            status="red"
            date="2024-07-16"
            location="Location"
            title="Event Title"
            startTime="10:00"
          />
        </div>
      </div>
    </section>
  );
};
