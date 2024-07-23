export type NewEventType = {
  id: number;
  attributes: EventTypeInput;
};

export type EventArray = {
  data: NewEventType[];
};

export type EventTypeInput = {
  title: string;
  eventDate: string;
  startTime: string;
  endTime?: string;
  location: string;
  confirmed?: string;
  tentative?: string;
  cancelled?: string;
};
