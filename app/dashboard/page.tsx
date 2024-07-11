"use client";
import React, { useState, useEffect } from "react";
import { EventCard } from "../components/EventCard";
import { useGetAllEvents } from "../hooks/useGetAllEvents";
import { EventType } from "@/types/event";
import { PageHeadline } from "../components/PageHeadline";
import { TimeUntilNextEvent } from "../components/TimeUntilNextEvent";

export default function Home() {
  const { data: allEvents, isLoading, isError } = useGetAllEvents();
  const actualTime = new Date().toISOString();
  const [nextEvent, setNextEvent] = useState<EventType | null>(null);

  useEffect(() => {
    if (allEvents) {
      const currentDate = new Date();
      const upcomingEvents = allEvents.data.filter(
        (event) => new Date(event.attributes.eventDate) > currentDate
      );
      const sortedEvents = upcomingEvents.sort(
        (a, b) =>
          new Date(a.attributes.eventDate).getTime() -
          new Date(b.attributes.eventDate).getTime()
      );
      if (sortedEvents.length > 0) {
        setNextEvent(sortedEvents[0]);
      }
    }
  }, [allEvents]);

  return (
    <main className="p-6 flex flex-col justify-start w-full min-h-screen bg-vsvGrayLight">
      <PageHeadline title={"Nächstes Event"} />
      {nextEvent ? (
        <TimeUntilNextEvent actualTime={actualTime} nextEvent={nextEvent} />
      ) : (
        <p>Keine bevorstehenden Events gefunden.</p>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading events.</p>}
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
