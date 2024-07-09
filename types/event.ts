export type EventType = {
  id: number;
  attributes: {
    title: string;
    eventDate: Date;
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
