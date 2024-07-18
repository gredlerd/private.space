import { ParticipantType } from "@/app/components/ParticipantsDetails";
import { UserType } from "./user";

export type EventType = {
  id: string;
  attributes: {
    title: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    zusage: {
      data: ParticipantType[];
    };
    unsicher: {
      data: ParticipantType[];
    };
    absage: {
      data: ParticipantType[];
    };
  };
};

export type EventArray = {
  data: EventType[];
};
