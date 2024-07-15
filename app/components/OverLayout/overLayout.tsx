import React from "react";
import type { Metadata } from "next";

export default function OverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="p-6 flex flex-col justify-start w-full min-h-screen bg-vsvGrayLight">
      {children}
    </main>
  );
}
