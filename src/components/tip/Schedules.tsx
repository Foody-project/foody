import { usePlaceByID } from "@/lib/hooks/places/usePlaceByID";
import { Place } from "@/interfaces";

interface SchedulesProps {
  place?: Place;
}

interface Hour {
  id: number;
  dayOfWeek: string;
  startTime?: string;
  endTime?: string;
  isNonStop: boolean;
  closed: boolean;
}

const FirstService = ({ hour }: { hour: Hour }) => (
  <span className="font-thin">
    {hour.isNonStop
      ? "Non-stop"
      : `${hour.startTime?.slice(0, 5) || "??"} - ${
          hour.endTime?.slice(0, 5) || "??"
        }`}
  </span>
);

const SecondService = ({ hour }: { hour: Hour }) => (
  <span className="font-thin">
    {hour.isNonStop
      ? "Non-stop"
      : `${hour.startTime?.slice(0, 5) || "??"} - ${
          hour.endTime?.slice(0, 5) || "??"
        }`}
  </span>
);

const ScheduleDay = ({ day, dayHours }: { day: string; dayHours: Hour[] }) => {
  if (dayHours.length === 0 || dayHours.every((h) => h.closed)) {
    return (
      <li className="w-full flex justify-center">
        <div className="flex justify-between w-3/4 p-4">
          <span className="capitalize font-normal text-[var(--text-orange)]">
            {day}
          </span>
          <span className="text-[var(--text-basic)] font-thin">Closed</span>
        </div>
      </li>
    );
  }

  const firstHour = dayHours[0];
  const secondHour = dayHours[1];

  return (
    <li className="w-full flex justify-center">
      <div className="flex justify-between w-3/4 p-4 border-b border-gray-200">
        <span className="capitalize font-normal text-[var(--text-orange)]">
          {day}
        </span>
        <div className="flex flex-col text-right">
          <FirstService hour={firstHour} />
          {secondHour && <SecondService hour={secondHour} />}
        </div>
      </div>
    </li>
  );
};

export default function Schedules({ place }: SchedulesProps) {
  if (!place) return null;

  const { data: fetchedPlace, isLoading, isError } = usePlaceByID(place.id);
  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement</p>;
  if (!fetchedPlace) return null;

  const openingHours = fetchedPlace.openingHours || [];

  // Regrouper les horaires par jour
  const hoursByDay: Record<string, Hour[]> = {};
  openingHours.forEach((hour: Hour) => {
    const day = hour.dayOfWeek;
    if (!hoursByDay[day]) hoursByDay[day] = [];
    hoursByDay[day].push(hour);
  });

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <span className="uppercase text-4xl font-bold mb-4 text-[var(--text-basic)]">
        Hours
      </span>
      <ul className="w-full">
        {daysOfWeek.map((day) => (
          <ScheduleDay key={day} day={day} dayHours={hoursByDay[day] || []} />
        ))}
      </ul>
    </div>
  );
}
