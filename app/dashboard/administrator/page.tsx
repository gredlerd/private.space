"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { PageHeadline } from "../../components/PageHeadline";
import OverLayout from "../../components/OverLayout/overLayout";
import { RegisterData, useNewEvent } from "../../hooks/useNewEvent";
import { NewEventType } from "@/types/newEvent"; // Adjust path as per your project structure

interface EventInputs {
  title: string;
  eventDate: Date;
  startTime: string;
  location: string;
  endTime: string;
}

const schema = yup.object().shape({
  title: yup.string().required("Titel ist erforderlich."),
  eventDate: yup.date().required("Veranstaltungsdatum ist erforderlich."),
  startTime: yup.string().required("Startzeit ist erforderlich."),
  location: yup.string().required("Ort ist erforderlich."),
  endTime: yup.string().optional(),
});

const CreateEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventInputs>({
    resolver: yupResolver(schema),
  });

  const [submissionError, setSubmissionError] = useState(false);
  const router = useRouter();
  const { mutate } = useNewEvent(); // Using the useNewEvent hook

  const onSubmit: SubmitHandler<EventInputs> = async (dataInput) => {
    setSubmissionError(false);

    mutate({ data: { ...dataInput } });
  };

  return (
    <OverLayout>
      <div>
        <form
          className="flex justify-center items-center flex-col gap-2 text-vsvGray w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <PageHeadline title={"Veranstaltung erstellen"} />
          <input
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
            placeholder="Titel"
            type="text"
            {...register("title")}
          />
          <p className="text-left w-full text-red-600 text-xs">
            {errors.title?.message}
          </p>

          <input
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
            placeholder="Veranstaltungsdatum"
            type="date"
            {...register("eventDate")}
          />
          <p className="text-left w-full text-red-600 text-xs">
            {errors.eventDate?.message}
          </p>

          <input
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
            placeholder="Startzeit"
            type="time"
            {...register("startTime")}
          />
          <p className="text-left w-full text-red-600 text-xs">
            {errors.startTime?.message}
          </p>

          <input
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
            placeholder="Ort"
            type="text"
            {...register("location")}
          />
          <p className="text-left w-full text-red-600 text-xs">
            {errors.location?.message}
          </p>

          <input
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
            placeholder="Endzeit (optional)"
            type="time"
            {...register("endTime")}
          />

          <button
            type="submit"
            className="text-xl font-bold bg-vsvGray text-white w-full border-2 rounded-lg p-4 border-vsvGray"
          >
            Erstellen
          </button>
        </form>
        {submissionError && (
          <p className="pt-5 text-left w-full text-red-600 text-xs">
            Einreichung fehlgeschlagen. Bitte versuchen Sie es erneut.
          </p>
        )}
      </div>
    </OverLayout>
  );
};

export default CreateEvent;
