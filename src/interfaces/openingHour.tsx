export interface OpeningHour {
  id: number;
  placeId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isNonStop: boolean;
  closed: boolean;
}
