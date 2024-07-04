import Image from "next/image";

export const Pagefooter = () => {
  return (
    <footer className="bg-gray-200 p-10">
      <div className="flex justify-center">
        <Image
          width={100}
          height={100}
          src="/diamir_logo.svg"
          alt="diamir logo"
        />
      </div>
      <div className="flex justify-center text-xs">© Diamir Eventmanager</div>
    </footer>
  );
};
