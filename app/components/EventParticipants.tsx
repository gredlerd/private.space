import React from "react";
import { ParticipantsDetails, ParticipantType } from "./ParticipantsDetails";
import { ScrollText } from "lucide-react";
import { UserType } from "@/types/user";

type EventParticipantsProps = {
  closeModal: () => void;
  title: string;
  ConfirmedParticipant: ParticipantType[];
  TentativeParticipant: ParticipantType[];
  CancelledParticipant: ParticipantType[];
};

export const EventParticipants = ({
  closeModal,
  title,
  ConfirmedParticipant,
  TentativeParticipant,
  CancelledParticipant,
}: EventParticipantsProps) => {
  console.log(ConfirmedParticipant);
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-gray-200 flex items-center z-50 flex-col justify-between">
      <div className="w-full h-52 items-center flex justify-center flex-col bg-vsvGray text-white">
        <div className="flex flex-row gap-4 items-center">
          <p className="font-bold text-3xl">Teilnehmerliste</p>
          <span>
            <ScrollText />
          </span>
        </div>
        <span className="text-xl pt-5">{title}</span>
      </div>
      <div className="flex flex-col w-full p-5 h-full justify-between">
        <div>
          <ParticipantsDetails
            ConfirmedParticipant={ConfirmedParticipant}
            TentativeParticipant={TentativeParticipant}
            CancelledParticipant={CancelledParticipant}
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
