import React from "react";

type PageHeadlineProps = {
  title: string;
};

export const PageHeadline = ({ title }: PageHeadlineProps) => {
  return (
    <div className="flex justify-center items-center flex-col text-vsvGray gap-3 pb-4">
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  );
};
