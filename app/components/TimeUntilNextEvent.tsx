import { Clock } from "lucide-react";
import React, { useState, useEffect } from "react";
import { EventType } from "@/types/event";

type TimeUntilNextEventProps = {
  actualTime: string;
  nextEvent: EventType | null;
};

const calculateTimeDifference = (currentTime: Date, nextEventTime: Date) => {
  const diff = nextEventTime.getTime() - currentTime.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
};

export const TimeUntilNextEvent = ({
  actualTime,
  nextEvent,
}: TimeUntilNextEventProps) => {
  const [timeUntil, setTimeUntil] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    if (nextEvent) {
      const currentTime = new Date(actualTime);
      const nextEventTime = new Date(nextEvent.attributes.eventDate);
      const timeDiff = calculateTimeDifference(currentTime, nextEventTime);
      setTimeUntil(timeDiff);
    }
  }, [actualTime, nextEvent]);

  return (
    <div className="flex flex-row gap-2 justify-center items-center pt-2 text-vsvGray">
      <span>
        <Clock />
      </span>
      <span>
        {timeUntil.days > 0 && <>{timeUntil.days}d </>}
        {timeUntil.hours > 0 && <>{timeUntil.hours}h </>}
        {timeUntil.minutes > 0 && <>{timeUntil.minutes}m </>}
        {timeUntil.days === 0 &&
          timeUntil.hours === 0 &&
          timeUntil.minutes === 0 && <>Jetzt! </>}
      </span>
    </div>
  );
};
