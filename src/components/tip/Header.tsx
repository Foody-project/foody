"use client";

import { Place } from "@/interfaces";
import translatePrice from "@/lib/hooks/translatePrice";

interface HeaderProps {
  place: Place | null;
}

export default function Header({ place }: HeaderProps) {
  if (!place) return null;

  const priceString = translatePrice(place.price ?? null);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-row justify-between items-start gap-6">
        <div className="flex flex-col items-start gap-2">
          <span className="uppercase font-bold text-3xl text-[var(--text-orange)]">
            {place.name}
          </span>

          <div className="flex flex-row text-[0.9rem] gap-1 pl-1 opacity-90">
            <span>{place.flag}</span>
            <span className="italic">{priceString}</span>
          </div>

          <span>{place.description}</span>
        </div>

        <div>
          <img
            src={place.image}
            alt={place.name}
            className="w-[30rem] rounded-xl shadow-[0px_0px_26px_rgba(0,0,0,0.4)]"
          />
        </div>
      </div>
    </div>
  );
}
