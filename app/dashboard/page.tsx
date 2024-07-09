import { Clock } from "lucide-react";
import AuthGuard from "../components/auth/AuthGuard";
import { EventCard } from "../components/EventCard";
import { PageHeadline } from "../components/PageHeadline";

export default function Home() {
  return (
    <AuthGuard>
      <main className="p-6 flex flex-col justify-start w-full min-h-screen bg-vsvGrayLight">
        <PageHeadline title={"Nächstes Event"} />
        <div className="gap-2 py-4 font-bold items-center text-xl flex justify-center flex-row w-full text-vsvGray">
          <span>
            <Clock />
          </span>
          <span>12 Stunden & 40 Minuten</span>
        </div>
        <EventCard />
      </main>
    </AuthGuard>
  );
}
