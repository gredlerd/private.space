import { Calendar, Clock, MapPin } from "lucide-react";
import React from "react";

type EventDetailsProps = {
  date: string;
  location: string;
  title: string;
  time: string;
  layout: "light" | "dark";
};

export const EventDetails = ({
  date,
  location,
  title,
  time,
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
        <span>{date}</span>
      </div>

      <hr className="border-t-2 border-gray-300" />
      <div className="flex justify-between text-lg">
        <span>
          <Clock />
        </span>
        <span>{time}</span>
      </div>

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
