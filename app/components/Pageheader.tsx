import Image from "next/image";

export const Pageheader = () => {
  return (
    <header className="bg-gray-200 p-5">
      <div className="flex justify-center">
        <Image
          width={40}
          height={40}
          src="/diamir_icon.svg"
          alt="diamir logo"
        />
      </div>
    </header>
  );
};
