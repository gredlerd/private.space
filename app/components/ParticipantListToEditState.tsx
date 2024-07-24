import React, { useState } from "react";
import { UserType } from "@/types/user";
import { Ellipsis, Info, UserRoundCheck } from "lucide-react";
import UserDetailsModal from "./UserDetails";

type ParticipantListProps = {
  user: UserType;
};

const ParticipantListToEditState = ({ user }: ParticipantListProps) => {
  return (
    <div className="flex flex-col" key={user.id}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col justify-start text-lg">
          {user.firstname} {user.lastname}
        </div>
      </div>
    </div>
  );
};

export default ParticipantListToEditState;
