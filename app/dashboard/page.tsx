"use client";
import { EventCard } from "../components/EventCard";
import { useGetAllEvents } from "../hooks/useGetAllEvents";
import { EventType } from "@/types/event";
import { PageHeadline } from "../components/PageHeadline";
import { TimeUntilNextEvent } from "../components/TimeUntilNextEvent";
import { useEffect, useState } from "react";
import { UseSession } from "../components/UseSession";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: allEvents, isLoading, isError } = useGetAllEvents();
  const [nextEvent, setNextEvent] = useState<EventType | null>(null);

  useEffect(() => {
    console.log("All Events:", allEvents);
    const newTime = new Date();

    if (allEvents && allEvents.data.length > 0) {
      const upcomingEvents = allEvents.data.filter(
        (event) => new Date(event.attributes.eventDate) > new Date()
      );
      if (upcomingEvents.length > 0) {
        setNextEvent(upcomingEvents[0]);
      } else {
        setNextEvent(null);
      }
    }
  }, [allEvents]);

  return (
    <main className="p-6 flex flex-col justify-start w-full min-h-screen bg-vsvGrayLight">
      <div className="flex flex-col gap-3 pb-6">
        <UseSession />
        <PageHeadline title={"Nächstes Event"} />
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading events.</p>}
        {nextEvent ? (
          <TimeUntilNextEvent nextEvent={nextEvent} />
        ) : (
          <p>Keine bevorstehenden Events gefunden.</p>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {allEvents && (
          <>
            {allEvents.data.map((event: EventType) => (
              <EventCard key={event.id} event={event} />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
