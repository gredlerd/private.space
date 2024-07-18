"use client";
import {
  BarChart3,
  Calendar,
  CircleUserRound,
  Euro,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const Pagefooter = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  const navigateTo = (path: string) => {
    if (isClient) {
      router.push(path);
    }
  };

  return (
    <footer className="bg-gray-200 p-3 sticky bottom-0 w-full flex justify-between text-gray-400 text-xs">
      <button
        className="flex flex-col items-center ml-3"
        onClick={() => navigateTo("/dashboard")}
      >
        <span>
          <Calendar />
        </span>
        <span>Events</span>
      </button>
      <button
        className="flex flex-col items-center"
        onClick={() => navigateTo("/dashboard/statistiken")}
      >
        <span>
          <BarChart3 />
        </span>
        <span>Statistiken</span>
      </button>
      <button
        className="flex flex-col items-center"
        onClick={() => navigateTo("/dashboard/mitglieder")}
      >
        <span>
          <UserRound />
        </span>
        <span>Mitglieder</span>
      </button>
      <button
        className="flex flex-col items-center mr-3"
        onClick={() => navigateTo("/dashboard/kassa")}
      >
        <span>
          <Euro />
        </span>
        <span>Kassa</span>
      </button>

      {session?.user.isAdmin && (
        <button
          className="flex flex-col items-center mr-3"
          onClick={() => navigateTo("/dashboard/administrator")}
        >
          <span>
            <CircleUserRound />
          </span>
          <span>Admin</span>
        </button>
      )}
    </footer>
  );
};
