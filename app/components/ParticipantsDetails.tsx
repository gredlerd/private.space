import { CircleHelp, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { EventButton } from "./EventButton";
import { UserType } from "@/types/user";

export type ParticipantType = {
  id: number;
  attributes: {
    username: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    email: string;
  };
};

type ParticipantsDetailsProps = {
  ConfirmedParticipant: ParticipantType[];
  TentativeParticipant: ParticipantType[];
  CancelledParticipant: ParticipantType[];
};

export const ParticipantsDetails = ({
  ConfirmedParticipant,
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
        <div className="flex flex-col justify-start">
          {ConfirmedParticipant.map((el) => (
            <div key={el.id}>
              <span className="text-lg">
                {el.attributes.firstname} {el.attributes.lastname}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between pt-5">
          <span className="text-vsvGray font-bold text-xl">Unsicher</span>
          <CircleHelp className="text-vsvGray" />
        </div>
        <hr className="border-t-2 border-vsvGray my-3 w-full" />
        <div className="flex flex-col justify-start">
          {TentativeParticipant.map((el) => (
            <div key={el.id}>
              <span className="text-lg">
                {el.attributes.firstname} {el.attributes.lastname}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between pt-5">
          <span className="text-red-600 font-bold text-xl">Absagen</span>
          <ThumbsDown className="text-red-600" />
        </div>
        <hr className="border-t-2 border-red-600 my-3 w-full" />
        <div className="flex flex-col justify-start">
          {CancelledParticipant.map((el) => (
            <div key={el.id}>
              <span className="text-lg">
                {el.attributes.firstname} {el.attributes.lastname}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
