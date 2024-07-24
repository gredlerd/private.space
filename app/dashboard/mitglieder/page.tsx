"use client";
import { PageHeadline } from "@/app/components/PageHeadline";
import React from "react";
import { useGetAllUsers } from "@/app/hooks/useGetAllUsers";
import { UserType } from "@/types/user";
import OverLayout from "@/app/components/OverLayout/overLayout";
import UserList from "@/app/components/UserList";
import { Ellipsis, MoveRight } from "lucide-react";

export default function Home() {
  const { data } = useGetAllUsers();

  return (
    <OverLayout>
      <section>
        <div>
          <PageHeadline title={"Mitglieder"} />
        </div>
        <div className="flex flex-row gap-2 justify-center items-center pt-4">
          <span>Nutzerinformationen ansehen auf</span>
          <span>
            <MoveRight />
          </span>
          <span>
            <Ellipsis />
          </span>
        </div>
        <div className="pt-6 text-lg">
          {data && (
            <>
              {data.map((user: UserType) => (
                <UserList key={user.id} user={user} />
              ))}
            </>
          )}
        </div>
      </section>
    </OverLayout>
  );
}
