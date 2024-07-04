import {
  Calendar,
  CircleHelp,
  Clock1,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React from "react";
import { EventButton } from "./EventButton";

export const EventCard = () => {
  return (
    <main className="flex justify-center">
      <div className="flex w-full flex-col gap-3 shadow-lg m-10 rounded-lg bg-vsvBlueDark text-white">
        <div className="flex flex-col gap-2 p-5">
          <div className="flex flex-row gap-2">
            <Calendar />
            <p>Mi / 03.07.2024</p>
          </div>
          <div className="flex flex-col text-xl font-bold text-vsvBlueLight">
            <span> Sommertraining </span>
            <div className="flex flex-row gap-2">
              <Clock1 />
              <span>19.00 Uhr</span>
            </div>
          </div>
          <hr />
          <div>Villach Warmbad Heizhaus</div>
        </div>
        <div className="flex flex-row bg-gray-600 gap-1 rounded-lg">
          <EventButton status="green" participant={10} />
          <EventButton status="gray" participant={4} />
          <EventButton status="red" participant={6} />
        </div>
      </div>
    </main>
  );
};
