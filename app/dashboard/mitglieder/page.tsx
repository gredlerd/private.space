"use client";
import { PageHeadline } from "@/app/components/PageHeadline";
import React from "react";
import { useGetAllUsers } from "../../hooks/useGetAllUsers";
import { UserType } from "@/types/user";
import OverLayout from "@/app/components/OverLayout/overLayout";
import UserList from "@/app/components/UserList";

export default function Home() {
  const { data } = useGetAllUsers();

  console.log(data);

  return (
    <OverLayout>
      <section>
        <div>
          <PageHeadline title={"Mitglieder"} />
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
