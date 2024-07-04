import {
  Calendar,
  CircleHelp,
  Clock1,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React from "react";
import { EventButton } from "./EventButton";
import { EventDetails } from "./EventDetails";

export const EventCard = () => {
  return (
    <section className="flex flex-col items-center justify-between">
      <div className="flex w-full flex-col gap-3 shadow-lg m-10 rounded-lg bg-vsvGray text-white">
        <div className="p-4">
          <EventDetails
            date={"03.07.2024"}
            location={"Warmbad Villach Heizhaus"}
            title={"Sommertraining"}
            time={"17.00 Uhr"}
            layout="light"
          />
        </div>
        <div className="flex flex-row bg-gray-600 gap-0.5 rounded-lg">
          <EventButton
            status="green"
            participant={10}
            date={"03.07.2024"}
            location={"Warmbad Villach Heizhaus"}
            title={"Sommertraining"}
            time={"17.00 Uhr"}
          />
          <EventButton
            status="gray"
            participant={4}
            date={"04.07.2024"}
            location={"Warmbad Villach Heizhaus"}
            title={"Sommertraining"}
            time={"17.00 Uhr"}
          />
          <EventButton
            status="red"
            participant={6}
            date={"05.07.2024"}
            location={"Warmbad Villach Heizhaus"}
            title={"Sommertraining"}
            time={"17.00 Uhr"}
          />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button className="w-full border-4 border-gray-400 p-5 rounded-lg text-xl text-gray-400">
          Alle Events anzeigen
        </button>
      </div>
    </section>
  );
};
