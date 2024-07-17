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
    confirmed: number[];
    tentative: number[];
    cancelled: number[];
  };
};

export type EventArray = {
  data: EventType[];
};
