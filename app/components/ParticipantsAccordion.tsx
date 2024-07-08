import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

type ParticipantsAccordionProps = {
  ConfirmendParticipant: string;
  TentativeParticipant: string;
  CancelledParticipant: string;
};

export const ParticipantsAccordion = ({
  ConfirmendParticipant,
  TentativeParticipant,
  CancelledParticipant,
}: ParticipantsAccordionProps) => {
  return (
    <section className="flex flex-col">
      <div>
        <div className="flex-row flex justify-between">
          <span className="text-green-600 flex flex-col">Zusagen</span>
          <span className="text-green-600">
            <ThumbsUp />
          </span>
        </div>
        <hr className="border-t-2 border-green-600 my-3 w-full" />
        <span>{ConfirmendParticipant}</span>
      </div>
      <div>
        <div className="flex-row flex justify-between">
          <span className="text-vsvGray flex flex-col">Unsicher</span>
          <span className="text-vsvGray">
            <CircleHelp />
          </span>
        </div>
        <hr className="border-t-2 border-vsvGray my-3 w-full" />
        <span>{TentativeParticipant}</span>
      </div>
      <div>
        <div className="flex-row flex justify-between">
          <span className="text-red-600 flex flex-col">Absagen</span>
          <span className="text-red-600">
            <ThumbsDown />
          </span>
        </div>
        <hr className="border-t-2 border-red-600 my-3 w-full" />
        <span>{CancelledParticipant}</span>
      </div>
    </section>
  );
};
