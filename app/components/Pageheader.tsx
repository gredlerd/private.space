"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Pageheader = () => {
  const router = useRouter();

  const handleStartpageClick = () => {
    router.push("/dashboard");
  };

  return (
    <header className="p-5">
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
    </header>
  );
};
