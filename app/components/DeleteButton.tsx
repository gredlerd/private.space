import { Trash2 } from "lucide-react";
import React from "react";
import { useDeleteEvent } from "../hooks/useDeleteEvents";

type DeleteButtonProps = {
  eventId: string;
};

export const DeleteButton = ({ eventId }: DeleteButtonProps) => {
  const { mutate: deleteEvent } = useDeleteEvent();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteEvent({ id: eventId });
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-vsvGray text-sm rounded-lg border-2 border-white text-white p-0.5"
    >
      <Trash2 />
    </button>
  );
};
