import { Clock } from "lucide-react";
import React from "react";

export const NextEvent = () => {
  return (
    <div className="flex justify-center flex-col text-vsvGray gap-3 items-center">
      <div className="text-3xl font-bold">
        <h1>Nächstes Event</h1>
      </div>
      <div className="flex flex-row gap-1">
        <span>
          <Clock />
        </span>
        <span>12 Stunden & 40 Minuten</span>
      </div>
    </div>
  );
};
