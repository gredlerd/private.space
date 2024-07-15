import { Pencil } from "lucide-react";
import React from "react";
import { useState } from "react";
import { EventEdit } from "./EventEdit";
import { EventType } from "@/types/event";

type EditButtonProps = {
  event: EventType;
};

export const EditButton = ({ event }: EditButtonProps) => {
  const [editModal, setEditModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setEditModal(true)}
        className="bg-vsvGray rounded-lg border-2 border-white text-white p-0.5"
      >
        <Pencil />
      </button>
      {editModal && (
        <EventEdit closeModal={() => setEditModal(false)} event={event} />
      )}
    </div>
  );
};
