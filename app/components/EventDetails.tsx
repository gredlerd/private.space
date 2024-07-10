import { AlarmClockOff, Calendar, Clock, MapPin } from "lucide-react";
import React from "react";

type EventDetailsProps = {
  date: string;
  location: string;
  title: string;
  startTime: string;
  endTime?: string;
  layout: "light" | "dark";
};

export const EventDetails = ({
  date,
  location,
  title,
  startTime,
  endTime,
  layout,
}: EventDetailsProps) => {
  return (
    <div
      className={`${
        layout === "light" ? "text-white" : "text-vsvGray"
      } flex flex-col gap-3`}
    >
      <span className="text-xl flex justify-center font-bold mb-4 ">
        {title}
      </span>
      <div className="flex justify-between text-lg">
        <span>
          <Calendar />
        </span>
        <span>{String(date)}</span>
      </div>

      <hr className="border-t-2 border-gray-300" />
      <div className="flex justify-between text-lg">
        <span>
          <Clock />
        </span>
        <span>{startTime}</span>
      </div>

      {endTime && <hr className="border-t-2 border-gray-300" />}
      {endTime && (
        <div className="flex justify-between text-lg">
          <span>
            <AlarmClockOff />
          </span>
          <span>{endTime}</span>
        </div>
      )}

      <hr className="border-t-2 border-gray-300" />
      <div className="flex justify-between text-lg">
        <span>
          <MapPin />
        </span>
        <span>{location}</span>
      </div>
    </div>
  );
};
