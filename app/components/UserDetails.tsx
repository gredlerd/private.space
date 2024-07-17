"use client";
import React from "react";
import { PageHeadline } from "./PageHeadline";
import { BookOpen, Mail, Contact, CalendarFold } from "lucide-react";
import { Session } from "next-auth";

type UserDetailsModalProps = {
  user: Session["user"];
  closeModal: () => void;
};

const UserDetailsModal = ({ user, closeModal }: UserDetailsModalProps) => {
  const formattedBirthdate = user.birthdate
    ? new Date(user.birthdate).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "N/A";

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-vsvGrayLight flex items-center z-50 flex-col justify-between">
      <div className="pt-10 w-full p-5">
        <div className="flex justify-center font-bold mb-4 text-vsvGray">
          <PageHeadline title={"User Details"} />
        </div>
        <div className="flex items-center flex-col text-xl pt-6">
          <div className="w-full flex justify-between items-center">
            <span>
              <strong className="text-vsvGray">Vorname:</strong>{" "}
              {user.firstname}
            </span>
            <span>
              <BookOpen />
            </span>
          </div>
          <div className="w-full flex justify-between items-center">
            <span>
              <strong className="text-vsvGray">Nachname:</strong>{" "}
              {user.lastname}
            </span>
            <span>
              <BookOpen />
            </span>
          </div>
          <div className="w-full flex justify-between items-center">
            <span>
              <strong className="text-vsvGray">Email:</strong> {user.email}
            </span>
            <span>
              <Mail />
            </span>
          </div>
          <div className="w-full flex justify-between items-center">
            <span>
              <strong className="text-vsvGray">Username:</strong>{" "}
              {user.username}
            </span>
            <span>
              <Contact />
            </span>
          </div>
          <div className="w-full flex justify-between items-center">
            <span>
              <strong className="text-vsvGray">Geburtsdatum:</strong>{" "}
              {formattedBirthdate}
            </span>
            <span>
              <CalendarFold />
            </span>
          </div>
        </div>
        <div className="pt-10">
          <button
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray"
            onClick={closeModal}
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
