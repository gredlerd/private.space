import React from "react";
import type { Metadata } from "next";

type OverLayoutProps = {
  metaTitle: string;
  metaDescription: string;
  children: React.ReactNode;
}

export const metadata: Metadata = ({
  title: ,
  description: "Login for users",
);
};

export default function OverLayout({
  metaTitle,
  metaDescription,
  children,
}: OverLayoutProps) {
  return (
    <main className="p-6 flex flex-col justify-start w-full min-h-screen bg-vsvGrayLight">
      {children}
    </main>
  );
}
