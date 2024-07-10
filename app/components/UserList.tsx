import React from "react";
import { UserType } from "@/types/user";
import { UserRound, UserRoundCheck } from "lucide-react";

type UserListProps = {
  user: UserType;
};

const UserList = ({ user }: UserListProps) => {
  return (
    <div className="flex flex-col" key={user.id}>
      <div className="flex flex-row items-center justify-between text-vsvGray">
        <p className="p-2">
          {user.firstname} {user.lastname}
        </p>
        <span>
          <UserRoundCheck />
        </span>
      </div>
      <hr className="border-t-2 border-gray-300" />
    </div>
  );
};

export default UserList;
