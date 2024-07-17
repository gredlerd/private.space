import React, { useState } from "react";
import { UserType } from "@/types/user";
import { UserRoundCheck } from "lucide-react";
import UserDetailsModal from "./UserDetails";

type UserListProps = {
  user: UserType;
};

const UserList = ({ user }: UserListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col" key={user.id}>
      <div className="flex flex-row items-center justify-between text-vsvGray">
        <button className="p-2" onClick={openModal}>
          {user.firstname} {user.lastname}
        </button>
        <span>
          <UserRoundCheck />
        </span>
      </div>
      <hr className="border-t-2 border-gray-300" />
      {isModalOpen && <UserDetailsModal user={user} closeModal={closeModal} />}
    </div>
  );
};

export default UserList;
