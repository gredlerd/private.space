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
      <div className="flex w-full flex-col shadow-lg m-10 rounded-lg bg-vsvGray text-white">
        <div className="p-4">
          <EventDetails
            date={"03.07.2024"}
            location={"DiaMir Stiege 2"}
            title={"DiaMir Afterparty"}
            time={"17.00 Uhr"}
            layout="light"
          />
        </div>
        <div className="flex flex-row bg-vsvGray rounded-lg">
          <EventButton
            status="green"
            participant={10}
            date={"03.07.2024"}
            location={"Warmbad Villach Heizhaus"}
            title={"Sommertraining"}
            time={"17.00 Uhr"}
          />
          <hr className="w-0.5 h-16 border-t-0 border-gray-100" />
          <EventButton
            status="gray"
            participant={4}
            date={"04.07.2024"}
            location={"Warmbad Villach Heizhaus"}
            title={"Sommertraining"}
            time={"17.00 Uhr"}
          />
          <hr className="w-0.5 h-16 border-t-0 border-gray-100" />
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
        <button className="w-full border-2 border-vsvGray p-5 rounded-lg text-xl font-bold text-vsvGray">
          Alle Events anzeigen
        </button>
      </div>
    </section>
  );
};
