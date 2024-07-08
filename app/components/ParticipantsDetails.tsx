import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

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
    <section className="flex flex-col">
      <div>
        <div className="flex-row flex justify-between pt-5">
          <span className="text-green-600 flex flex-col font-bold text-xl">
            Zusagen
          </span>
          <span className="text-green-600">
            <ThumbsUp />
          </span>
        </div>
        <hr className="border-t-2 border-green-600 my-3 w-full" />
        <span className="text-lg">{ConfirmendParticipant}</span>
      </div>
      <div>
        <div className="flex-row flex justify-between pt-5">
          <span className="text-vsvGray flex flex-col font-bold text-xl">
            Unsicher
          </span>
          <span className="text-vsvGray">
            <CircleHelp />
          </span>
        </div>
        <hr className="border-t-2 border-vsvGray my-3 w-full" />
        <span className="text-lg">{TentativeParticipant}</span>
      </div>
      <div>
        <div className="flex-row flex justify-between pt-5">
          <span className="text-red-600 flex flex-col font-bold text-xl">
            Absagen
          </span>
          <span className="text-red-600">
            <ThumbsDown />
          </span>
        </div>
        <hr className="border-t-2 border-red-600 my-3 w-full" />
        <span className="text-lg">{CancelledParticipant}</span>
      </div>
    </section>
  );
};
