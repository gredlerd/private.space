"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { EventCard } from "../components/EventCard";
import { NextEvent } from "../components/NextEvent";
import { useGetAllEvents } from "../hooks/useGetAllEvents";
import { EventType } from "@/types/event";

export default function Home() {
  const { data } = useGetAllEvents();

  return (
    <main className="p-6 flex flex-col justify-start w-full min-h-screen bg-vsvGrayLight">
      <NextEvent />
      {data && (
        <>
          {data.data.map((event: EventType) => (
            <EventCard key={event.id} event={event} />
          ))}
        </>
      )}
      {/* <div className="w-full flex justify-center">
        <button className="w-full border-2 border-vsvGray p-5 rounded-lg text-xl font-bold text-vsvGray">
          Alle Events anzeigen
        </button>
      </div> */}
    </main>
  );
}
