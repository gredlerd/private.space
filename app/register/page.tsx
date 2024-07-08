"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Inputs {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required("Vorname ist erforderlich."),
  lastName: yup.string().required("Nachname ist erforderlich."),
  birthdate: yup
    .date()
    .required("Geburtsdatum ist erforderlich.")
    .typeError("Bitte geben Sie ein gültiges Datum ein."),
  email: yup
    .string()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein.")
    .required("E-Mail-Adresse ist erforderlich."),
  password: yup
    .string()
    .min(6, "Das Passwort muss mindestens 6 Zeichen lang sein.")
    .required("Passwort ist erforderlich."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwörter müssen übereinstimmen")
    .required("Passwortbestätigung ist erforderlich."),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [registerError, setRegisterError] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setRegisterError(false);
    try {
      // Hier würdest du deine Registrierung logik einfügen, z.B. ein API-Call
      console.log("Registrierungsdaten:", data);
      router.push("/welcome");
    } catch (error) {
      setRegisterError(true);
      console.error("Registrierungsfehler:", error);
    }
  };

  return (
    <main className="p-5 bg-vsvGrayLight">
      <form
        className="flex justify-center items-center flex-col gap-2 text-vsvGray w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-4xl pb-8 pt-28">Registrieren</h1>
        <input
          className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
          placeholder="Vorname"
          type="text"
          {...register("firstName")}
        />
        <p className="text-left w-full text-red-600 text-xs">
          {errors.firstName?.message}
        </p>

        <input
          className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
          placeholder="Nachname"
          type="text"
          {...register("lastName")}
        />
        <p className="text-left w-full text-red-600 text-xs">
          {errors.lastName?.message}
        </p>

        <input
          className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
          placeholder="Geburtsdatum"
          type="date"
          {...register("birthdate")}
        />
        <p className="text-left w-full text-red-600 text-xs">
          {errors.birthdate?.message}
        </p>

        <input
          className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
          placeholder="E-Mail"
          type="email"
          {...register("email")}
        />
        <p className="text-left w-full text-red-600 text-xs">
          {errors.email?.message}
        </p>

        <input
          className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
          placeholder="Passwort"
          type="password"
          {...register("password")}
        />
        <p className="text-left w-full text-red-600 text-xs">
          {errors.password?.message}
        </p>

        <input
          className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
          placeholder="Passwort bestätigen"
          type="password"
          {...register("confirmPassword")}
        />
        <p className="text-left w-full text-red-600 text-xs">
          {errors.confirmPassword?.message}
        </p>

        <button
          type="submit"
          className="text-xl font-bold bg-vsvGray text-white w-full border-2 rounded-lg p-4 border-vsvGray"
        >
          Registrieren
        </button>
      </form>
      {registerError && (
        <p className="pt-5 text-left w-full text-red-600 text-xs">
          Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.
        </p>
      )}
    </main>
  );
}
