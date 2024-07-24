import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeadline } from "./PageHeadline";
import { EventType } from "@/types/event";
import { useUpdateEvent } from "../hooks/useUpdateEvents";
import { format, parseISO } from "date-fns";
import { ArrowBigDown, Pencil } from "lucide-react";

type EventEditProps = {
  closeModal: () => void;
  event: EventType;
};

const schema = yup.object().shape({
  title: yup.string().required("Titel ist erforderlich."),
  eventDate: yup.date().required("Veranstaltungsdatum ist erforderlich."),
  startTime: yup.string().required("Startzeit ist erforderlich."),
  location: yup.string().required("Ort ist erforderlich."),
  endTime: yup.string().optional(),
});

interface EventInputs {
  title: string;
  eventDate: string;
  startTime: string;
  location: string;
  endTime?: string | null;
}

export const EventEdit = ({ closeModal, event }: EventEditProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EventInputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    setValue("title", event.attributes.title);
    setValue("eventDate", event.attributes.eventDate);
    setValue("startTime", event.attributes.startTime);
    setValue("location", event.attributes.location);
    if (event.attributes.endTime) {
      setValue("endTime", event.attributes.endTime);
    }
  }, [event, setValue]);

  const { mutate: updateEvent } = useUpdateEvent();

  const onSubmit: SubmitHandler<EventInputs> = (data) => {
    let formattedData;
    if (data.endTime != "") {
      formattedData = {
        id: event.id,
        data: {
          ...data,
          endTime: data.endTime,
          eventDate: format(data.eventDate, "yyyy-MM-dd"),
        },
      };
    } else {
      formattedData = {
        id: event.id,
        data: {
          ...data,
          endTime: null,
          eventDate: format(data.eventDate, "yyyy-MM-dd"),
        },
      };
    }

    //@ts-ignore
    updateEvent(formattedData);
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-vsvGrayLight flex items-center z-50 flex-col justify-between">
      <div className="pt-10 w-full p-5">
        <div className="flex gap-3 flex-col">
          <div className="flex flex-col">
            <PageHeadline title={"Admin"} />
            <PageHeadline title={"Einstellungen"} />
          </div>
          <div className="flex justify-center items-center text-black font-bold text-2xl pb-4 gap-2">
            <span>Event bearbeiten</span>
            <span>
              <Pencil />
            </span>
          </div>
        </div>
        <div>
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
              className="text-xl font-bold bg-vsvGray text-white w-full border-2 rounded-lg p-4 border-vsvGray flex flex-row justify-center items-center gap-1"
            >
              <span>Speichern</span>
              <span>
                <ArrowBigDown />
              </span>
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col w-full p-5 h-full justify-between">
        <div className="flex flex-col gap-3 w-full">
          <button
            className="text-xl font-bold text-vsvGray w-full border-2 rounded-lg p-4 border-vsvGray"
            onClick={closeModal}
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
