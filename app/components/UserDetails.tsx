import React from "react";
import { UserType } from "@/types/user";

type UserDetailsModalProps = {
  user: UserType;
  closeModal: () => void;
};

const UserDetailsModal = ({ user, closeModal }: UserDetailsModalProps) => {
  const formattedBirthdate = user.birthdate
    ? new Date(user.birthdate).toLocaleDateString()
    : "N/A";

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg- flex items-center z-50 flex-col justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <h2 className="flex justify-center text-2xl font-bold mb-4">
          User Details
        </h2>
        <p>
          <strong>Vorname:</strong> {user.firstname}
        </p>
        <p>
          <strong>Nachname</strong> {user.lastname}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Geburtstdatum:</strong> {formattedBirthdate}
        </p>
        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          onClick={closeModal}
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
