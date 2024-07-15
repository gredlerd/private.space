import { Pencil } from "lucide-react";
import React from "react";
import { useState } from "react";
import { EventEdit } from "./EventEdit";

export const EditButton = () => {
  const [editModal, setEditModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setEditModal(true)}
        className="bg-vsvGray rounded-lg border-2 border-white text-white p-0.5"
      >
        <Pencil />
      </button>
      {editModal && <EventEdit closeModal={() => setEditModal(false)} />}
    </div>
  );
};
