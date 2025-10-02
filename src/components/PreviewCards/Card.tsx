"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

import { getImagesByPlaceId } from "@/hooks/places/useImagesByID";
import { getAllPlaces } from "@/hooks/places/useAllPlaces";

interface CardProps {
  id: number;
}

export function Card({ id }: CardProps) {
  const router = useRouter();
  const { data: places = [] } = getAllPlaces();
  const { data: images } = getImagesByPlaceId(id);

  const place = places.find((p) => p.id === id);

  const redirectToItemPage = (name: string, id: number) => {
    const redirectName = name.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(
      `/restaurants/${redirectName}?extraInfo=${encodeURIComponent(
        id.toString()
      )}`
    );
  };

  if (!place) return;

  return (
    <div className="text-white bg-white/70 w-full max-w-[25rem] h-[23rem] mt-10 pb-2 shadow-[0px_10px_10px_rgba(0,0,0,0.05)] rounded-xl transition-transform duration-300 hover:scale-101 cursor-pointer">
      <div onClick={() => redirectToItemPage(place.name, place.id)}>
        {images && images.length > 0 && (
          <img
            src={images[0]?.url}
            alt={place.name}
            className="w-full h-60 rounded-t-xl object-cover"
          />
        )}
        <div className="flex flex-col sm:flex-row justify-between pr-1">
          <div className="pl-2 pr-2">
            <h1 className="text-lg sm:text-xl pt-3 text-[var(--text-basic)] font-medium">
              {place.name}
            </h1>
            <p className="text-sm font-[400] text-gray-400">{place.district}</p>
          </div>
          <Rating defaultValue={place.stars} readOnly>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton
                key={index}
                className="w-5 h-6 text-[var(--text-orange)] pl-1"
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
      </div>
    </div>
  );
}
