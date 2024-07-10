"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useRegisterUser } from "../hooks/useRegisterUser";
import { PageHeadline } from "../components/PageHeadline";
import OverLayout from "../components/OverLayout/overLayout";

interface Inputs {
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  firstname: yup.string().required("Vorname ist erforderlich."),
  lastname: yup.string().required("Nachname ist erforderlich."),
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
    .oneOf([yup.ref("password")], "Passwörter müssen übereinstimmen")
    .required("Passwortbestätigung ist erforderlich."),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [registerError, setRegisterError] = useState(false);
  const router = useRouter();
  const { mutate, isError, isLoading, isSuccess } = useRegisterUser();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setRegisterError(false);
    mutate({ ...data, username: data.email });
  };

  return (
    <OverLayout>
      <div>
        <form
          className="flex justify-center items-center flex-col gap-2 text-vsvGray w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <PageHeadline title={"Registrieren"} />
          <input
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
            placeholder="Vorname"
            type="text"
            {...register("firstname")}
          />
          <p className="text-left w-full text-red-600 text-xs">
            {errors.firstname?.message}
          </p>

          <input
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
            placeholder="Nachname"
            type="text"
            {...register("lastname")}
          />
          <p className="text-left w-full text-red-600 text-xs">
            {errors.lastname?.message}
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
        {/* {isError && <p>error beim anlegen des users</p>}
      {isLoading && <p>loading... adding user...</p>} */}
      </div>
    </OverLayout>
  );
};

export default Register;
