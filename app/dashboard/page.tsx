"use client";
import { useSession } from "next-auth/react";
import { EventCard } from "../components/EventCard";
import { useGetAllEvents } from "../hooks/useGetAllEvents";
import { EventType } from "@/types/event";
import { PageHeadline } from "../components/PageHeadline";
import { TimeUntilNextEvent } from "../components/TimeUntilNextEvent";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: allEvents, isLoading, isError } = useGetAllEvents();
  const [nextEvent, setNextEvent] = useState<EventType | null>(null);

  useEffect(() => {
    console.log("All Events:", allEvents);
    const newTime = new Date();
    console.log(newTime);
    if (allEvents && allEvents.data.length > 0) {
      const upcomingEvents = allEvents.data.filter(
        (event) => new Date(event.attributes.eventDate) > new Date()
      );
      console.log("Upcoming Events:", upcomingEvents);
      if (upcomingEvents.length > 0) {
        setNextEvent(upcomingEvents[0]);
      } else {
        setNextEvent(null);
      }
    }
  }, [allEvents]);

  return (
    <main className="p-6 flex flex-col justify-start w-full min-h-screen bg-vsvGrayLight">
      <PageHeadline title={"Nächstes Event"} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading events.</p>}
      {nextEvent ? (
        <TimeUntilNextEvent nextEvent={nextEvent} />
      ) : (
        <p>Keine bevorstehenden Events gefunden.</p>
      )}
      {allEvents && (
        <>
          {allEvents.data.map((event: EventType) => (
            <EventCard key={event.id} event={event} />
          ))}
        </>
      )}
    </main>
  );
}
