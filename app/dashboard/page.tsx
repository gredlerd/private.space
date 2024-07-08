import AuthGuard from "../components/auth/AuthGuard";
import { EventCard } from "../components/EventCard";
import { NextEvent } from "../components/NextEvent";

export default function Home() {
  return (
    <AuthGuard>
      <main className="p-6 flex flex-col justify-start w-full min-h-screen bg-vsvGrayLight">
        <NextEvent />
        <EventCard />
      </main>
    </AuthGuard>
  );
}
