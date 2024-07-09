"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface Inputs {
  identifier: string;
  password: string;
}

const schema = yup.object().shape({
  identifier: yup
    .string()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein.")
    .required("E-Mail-Adresse ist erforderlich."),
  password: yup.string().required("Passwort ist erforderlich."),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [loginError, setLoginError] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoginError(false);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (result && result.error) {
        setLoginError(true);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setLoginError(true);
      console.error("Login error:", error);
    }
  };
  return (
    <main className="p-6 flex flex-col justify-start w-full min-h-screen bg-vsvGrayLight">
      <form
        className="flex justify-center items-center flex-col gap-2 text-vsvGray w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-4xl pb-8 pt-28">Login</h1>
        <input
          className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
          placeholder="E-Mail"
          type="text"
          {...register("identifier")}
        />
        <p className="text-left w-full text-red-600 text-xs">
          {errors.identifier?.message}
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

        <button
          type="submit"
          className="text-xl font-bold bg-vsvGray text-white w-full border-2 rounded-lg p-4 border-vsvGray"
        >
          Einloggen
        </button>
      </form>
      {loginError && (
        <p className="pt-5 text-left w-full text-red-600 text-xs">
          Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.
        </p>
      )}
    </main>
  );
}
