"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result && result.error) {
      console.error("Login fehlgeschlagen:", result.error); // Log the error
      // Handle error display or redirect here
      return; // Prevent further execution
    }

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      console.error("Login fehlgeschlagen"); // Log generic login failure
    }
  };

  return (
    <main className="p-5 bg-vsvGrayLight">
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
    </main>
  );
}
