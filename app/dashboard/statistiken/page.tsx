import OverLayout from "@/app/components/OverLayout/overLayout";
import { PageHeadline } from "@/app/components/PageHeadline";
import React from "react";

export default function Home() {
  return (
    <OverLayout>
      <section className="flex flex-col justify-start w-full min-h-screen bg-vsvGrayLight">
        <div className="flex justify-center items-center text-vsvGray font-bold text-4xl">
          <PageHeadline title={"Statistiken"} />
        </div>
      </section>
    </OverLayout>
  );
}
