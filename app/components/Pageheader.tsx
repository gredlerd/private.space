"use client";
import React, { useState } from "react";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import UserDetailsModal from "./UserDetails";

export const Pageheader = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isProfileButtonVisible, setIsProfileButtonVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleStartpageClick = () => {
    router.push("/dashboard");
  };

  const user = session?.user;

  return (
    <>
      <header className="p-5 z-40 sticky bg-white top-0 left-0 w-full">
        <div className="flex justify-between">
          <div className="flex justify-center items-center">
            <button onClick={handleStartpageClick}>
              <Image
                width={60}
                height={60}
                src="/diamir_icon.svg"
                alt="diamir logo"
              />
            </button>
          </div>
          <div className="relative flex justify-end items-center">
            <button onClick={handleMenuToggle}>
              <AlignJustify />
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 right-0 mt-12 bg-white shadow-lg rounded-lg">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Profil
                </button>
                <button
                  onClick={() => signOut()}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Abmelden
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {isModalOpen && user && (
        <UserDetailsModal
          user={user}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
