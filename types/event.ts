export type EventType = {
  id: number;
  attributes: {
    title: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type EventArray = {
  data: EventType[];
};
