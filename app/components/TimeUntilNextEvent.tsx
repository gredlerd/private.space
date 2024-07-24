import { Clock } from "lucide-react";
import React, { useState, useEffect } from "react";
import { EventType } from "@/types/event";

type TimeUntilNextEventProps = {
  nextEvent: EventType;
};

const calculateTimeDifference = (actualTime: Date, nextEvent: EventType) => {
  const eventDate = new Date(nextEvent.attributes.eventDate);
  const startTimeParts = nextEvent.attributes.startTime.split(":");
  eventDate.setHours(parseInt(startTimeParts[0], 10));
  eventDate.setMinutes(parseInt(startTimeParts[1], 10));

  const diff = eventDate.getTime() - actualTime.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
};

export const TimeUntilNextEvent = ({ nextEvent }: TimeUntilNextEventProps) => {
  const [timeUntil, setTimeUntil] = useState<{
    days: number;
    hours: number;
    minutes: number;
  }>({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const actualTime = new Date();

    const updateTimer = () => {
      const { days, hours, minutes } = calculateTimeDifference(
        actualTime,
        nextEvent
      );
      setTimeUntil({ days, hours, minutes });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [nextEvent]);
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <span>
        <Clock />
      </span>
      <span>
        {timeUntil.days > 0 && <>{timeUntil.days} Tage </>}
        {timeUntil.hours > 0 && <>{timeUntil.hours} Stunden </>}
        {timeUntil.minutes > 0 && <>{timeUntil.minutes} Minuten </>}
        {timeUntil.days === 0 &&
          timeUntil.hours === 0 &&
          timeUntil.minutes === 0 && <> Jetzt! </>}
      </span>
    </div>
  );
};
