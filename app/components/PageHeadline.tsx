import { Clock } from "lucide-react";
import React from "react";

type PageHeadlineProps = {
  title: string;
};

export const PageHeadline = ({ title }: PageHeadlineProps) => {
  return (
    <div className="flex justify-center flex-col text-vsvGray gap-3 items-center">
      <div className="text-4xl font-bold">
        <h1>{title}</h1>
      </div>
    </div>
  );
};
