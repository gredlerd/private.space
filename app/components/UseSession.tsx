"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BookmarkCheck } from "lucide-react";
import UserDetailsModal from "./UserDetails";
import { UserType } from "@/types/user";

export const UseSession = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userName = session?.user.firstname + " " + session?.user.lastname;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return (
      <div className="flex flex-row text-green-600 justify-center items-center">
        <p>
          <BookmarkCheck />
        </p>
        <div className="gap-1 flex-row flex">
          <p>Angemeldet als</p>
          <span>{userName}</span>
        </div>
      </div>
    );
  }

  return <p>Weiterleitung...</p>;
};
