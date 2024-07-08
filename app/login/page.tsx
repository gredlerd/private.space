import { QuestionPage } from "../components/QuestionPage";
import LoginLayout from "./layout";

export default function Home() {
  return (
    <main className="p-5 bg-vsvGrayLight">
      <div className="flex justify-center items-center flex-col gap-2 text-vsvGray w-full">
        <h1 className="font-bold text-4xl pb-8 pt-28">Login</h1>
        <input
          className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
          placeholder="E-Mail"
          type="text"
        />
        <input
          className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
          placeholder="Passwort"
          type="text"
        />
        <button className="text-xl font-bold bg-vsvGray text-white w-full border-2 rounded-lg p-4 border-vsvGray">
          Einloggen
        </button>
      </div>
    </main>
  );
}
