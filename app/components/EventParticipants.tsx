import React from "react";
import { ParticipantsAccordion } from "./ParticipantsAccordion";

type EventParticipantsProps = {
  closeModal: () => void;
  title: string;
};

export const EventParticipants = ({
  closeModal,
  title,
}: EventParticipantsProps) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-gray-200 flex items-center z-50 flex-col justify-between">
      <div className="w-full h-52 items-center flex justify-center font-bold text-3xl flex-col bg-vsvGray text-white">
        <p>Teilnehmerliste</p>
        <span>{title}</span>
      </div>
      <div className="flex flex-col w-full p-5 h-full justify-between">
        <div>
          <ParticipantsAccordion
            ConfirmendParticipant={"David Gredler"}
            TentativeParticipant={"Stone"}
            CancelledParticipant={"Unte"}
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
