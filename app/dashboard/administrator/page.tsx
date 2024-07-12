"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { PageHeadline } from "../../components/PageHeadline";
import OverLayout from "../../components/OverLayout/overLayout";
import { RegisterData, useNewEvent } from "../../hooks/useNewEvent";
import { useDeleteEvent, DeleteEventData } from "../../hooks/useDeleteEvents";
import { NewEventType } from "@/types/newEvent";
import { format } from "date-fns";

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

const deleteSchema = yup.object().shape({
  title: yup.string().required("Titel ist erforderlich."),
});

const CreateEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventInputs>({
    resolver: yupResolver(schema),
  });

  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: { errors: deleteErrors },
  } = useForm<DeleteEventData>({
    resolver: yupResolver(deleteSchema),
  });

  const [submissionError, setSubmissionError] = useState(false);
  const router = useRouter();
  const { mutate } = useNewEvent();
  const { mutate: deleteMutate } = useDeleteEvent();

  const onSubmit: SubmitHandler<EventInputs> = async (dataInput) => {
    setSubmissionError(false);
    console.log(dataInput);

    if (dataInput.endTime !== "") {
      mutate({
        data: {
          location: dataInput.location,
          startTime: String(
            format(
              new Date(`1970-01-01T${dataInput.startTime}`),
              "HH:mm:ss.SSS"
            )
          ),
          eventDate: dataInput.eventDate,
          title: dataInput.title,
          endTime: String(
            format(new Date(`1970-01-01T${dataInput.endTime}`), "HH:mm:ss.SSS")
          ),
        },
      });
    } else {
      mutate({
        data: {
          location: dataInput.location,
          startTime: String(
            format(
              new Date(`1970-01-01T${dataInput.startTime}`),
              "HH:mm:ss.SSS"
            )
          ),
          eventDate: dataInput.eventDate,
          title: dataInput.title,
        },
      });
    }
  };

  const onDeleteSubmit: SubmitHandler<DeleteEventData> = async (data) => {
    setSubmissionError(false);
    console.log(data);
    deleteMutate({ title: data.title });
  };

  return (
    <OverLayout>
      <div>
        <div className="flex flex-col">
          <PageHeadline title={"Admin Einstellungen"} />
        </div>
        <div className="flex justify-center items-center text-vsvGray font-bold text-2xl pb-4">
          <span>Event erstellen</span>
        </div>
        <form
          className="flex justify-center items-center flex-col gap-2 text-vsvGray w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
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

          <select
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
            {...register("location")}
          >
            <option value="">Wählen Sie einen Standort</option>
            <option value="Stiege 1">Stiege 1</option>
            <option value="Stiege 2">Stiege 2</option>
            <option value="Outdoor">Outdoor</option>
          </select>
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
        <div className="flex justify-center items-center text-vsvGray font-bold text-2xl pb-4 pt-8">
          <span>Event löschen</span>
        </div>
        <form
          className="flex justify-center items-center flex-col gap-2 text-vsvGray w-full"
          onSubmit={handleSubmitDelete(onDeleteSubmit)}
        >
          <input
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray opacity-60"
            placeholder="Titel"
            type="text"
            {...registerDelete("title")}
          />
          <p className="text-left w-full text-red-600 text-xs">
            {deleteErrors.title?.message}
          </p>
          <button
            type="submit"
            className="text-xl font-bold bg-vsvGray text-white w-full border-2 rounded-lg p-4 border-vsvGray"
          >
            Löschen
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
