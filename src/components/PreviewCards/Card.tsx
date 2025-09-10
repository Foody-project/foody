"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

import { usePlaceByID } from "@/lib/hooks/places/usePlaceByID";
import PlaceModal from "@/components/Event/PlaceModal";

interface CardProps {
  id: number;
}

export function Card({ id }: CardProps) {
  const router = useRouter();
  const { data: place } = usePlaceByID(id);

  const redirectToItemPage = (name: string, id: number) => {
    const redirectName = name.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(
      `/restaurants/${redirectName}?extraInfo=${encodeURIComponent(
        id.toString()
      )}`
    );
  };

  if (!place) return null;

  return (
    <div className="text-white w-[375px] h-90 mt-10 [box-shadow:0px_0px_30px_rgba(0,0,0,0.1)] rounded-t-xl">
      <div onClick={() => redirectToItemPage(place.name, place.id)}>
        <img src={place.image} className="w-[375px] h-60 rounded-t-xl" />
        <div className="flex flex-cols justify-between">
          <div className="pl-2 pr-2">
            <h1 className="text-xl pt-3 text-[var(--text-orange)] font-medium">
              {place.name}
            </h1>
            <p className="text-sm text-gray-400">{place.district}</p>
          </div>
          <Rating defaultValue={place.stars} readOnly>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton
                key={index}
                className="w-6 h-6 text-[var(--text-orange)]"
              />
            ))}
          </Rating>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm pt-2 pl-2 pr-2">
        <div
          className="flex gap-2"
          onClick={() => redirectToItemPage(place.name, place.id)}
        >
          <Button variant="outline">{place.flag}</Button>
          <Button variant="outline" className="text-gray-500">
            {place.price}
          </Button>
        </div>
        <PlaceModal id={place.id} />;
      </div>
    </div>
  );
}
