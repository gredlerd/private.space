import React from "react";
import type { Metadata } from "next";

type OverLayoutProps = {
  children: React.ReactNode;
};

export default function OverLayout({ children }: OverLayoutProps) {
  return (
    <main className="p-6 flex flex-col justify-start w-full min-h-screen bg-vsvGrayLight">
      {children}
    </main>
  );
}
