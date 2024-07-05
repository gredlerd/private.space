import Image from "next/image";

export const Pageheader = () => {
  return (
    <header className="p-5">
      <div className="flex justify-center">
        <Image
          width={60}
          height={60}
          src="/diamir_icon.svg"
          alt="diamir logo"
        />
      </div>
    </header>
  );
};
