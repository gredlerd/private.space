"use client";
import { EventCard } from "../components/EventCard";
import { useGetAllEvents } from "../hooks/useGetAllEvents";
import { EventType } from "@/types/event";
import { PageHeadline } from "../components/PageHeadline";
import { TimeUntilNextEvent } from "../components/TimeUntilNextEvent";
import { useEffect, useState } from "react";
import { UseSession } from "../components/UseSession";
import { useSession } from "next-auth/react";
import { parseISO, format } from "date-fns";

export default function Home() {
  const { data: allEvents, isLoading, isError } = useGetAllEvents();
  const [nextEvent, setNextEvent] = useState<EventType | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([]);

  useEffect(() => {
    if (allEvents && allEvents.data.length > 0) {
      const now = new Date();

      const filteredAndSortedEvents = allEvents.data
        .filter((event) => {
          const eventDateTime = parseISO(
            `${event.attributes.eventDate}T${event.attributes.startTime}`
          );
          return eventDateTime >= now;
        })
        .sort((a, b) => {
          const dateA = parseISO(
            `${a.attributes.eventDate}T${a.attributes.startTime}`
          );
          const dateB = parseISO(
            `${b.attributes.eventDate}T${b.attributes.startTime}`
          );
          return dateA.getTime() - dateB.getTime();
        });

      setUpcomingEvents(filteredAndSortedEvents);

      if (filteredAndSortedEvents.length > 0) {
        setNextEvent(filteredAndSortedEvents[0]);
      } else {
        setNextEvent(null);
      }
    } else {
      setUpcomingEvents([]);
      setNextEvent(null);
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
          <>
            <TimeUntilNextEvent nextEvent={nextEvent} />
          </>
        ) : (
          <p>Keine bevorstehenden Events gefunden.</p>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {upcomingEvents.map((event: EventType) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
