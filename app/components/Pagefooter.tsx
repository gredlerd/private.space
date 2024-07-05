import { BarChart3, Calendar, Euro, UserRound } from "lucide-react";
import Image from "next/image";

export const Pagefooter = () => {
  return (
    <footer className="bg-gray-200 p-3 fixed bottom-0 w-full flex justify-between text-gray-400 text-xs">
      <button className="flex flex-col items-center ml-3">
        <span>
          <Calendar />
        </span>
        <span>Events</span>
      </button>
      <button className="flex flex-col items-center">
        <span>
          <BarChart3 />
        </span>
        <span>Statistiken</span>
      </button>
      <button className="flex flex-col items-center">
        <span>
          <UserRound />
        </span>
        <span>Mitglieder</span>
      </button>
      <button className="flex flex-col items-center mr-3">
        <span>
          <Euro />
        </span>
        <span>Kassa</span>
      </button>
    </footer>
  );
};
