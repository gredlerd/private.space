"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BookmarkCheck } from "lucide-react";

export const UseSession = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return (
      <div className="flex flex-row text-green-400 justify-center items-center">
        <p>
          <BookmarkCheck />
        </p>
        <p>Angemeldet als {session.user.username}</p>
      </div>
    );
  }

  return <p>Weiterleitung...</p>;
};
