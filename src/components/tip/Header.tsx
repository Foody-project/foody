"use client";

import * as React from "react";
import { Place } from "@/types";
import { getImagesByPlaceId } from "@/hooks/places/useImagesByID";
import { Button } from "@/components/ui/button";

import ImageDisplayer from "./ImageDisplayer";
import IsOpen from "./IsOpen";
import { getOpenPlaces } from "@/hooks/places/useIsOpeningNow";

interface HeaderProps {
  place?: Place;
}

export default function Header({ place }: HeaderProps) {
  if (!place) return null;

  const { data: images } = getImagesByPlaceId(place.id);
  const { data: openPlaces } = getOpenPlaces();
  const isOpen =
    openPlaces?.some((openPlace: Place) => openPlace.id === place.id) ?? false;

  if (!images) return null;

  return (
    <div className="relative w-full flex flex-col gap-6">
      <div className="px-2 flex flex-row gap-10 text-[0.9rem] opacity-90">
        <div className="flex flex-row items-center">
          <IsOpen isOpen={isOpen} />
          <div className="flex flex-row items-center gap-2 pl-3 text-base">
            <Button
              variant="link"
              className="p-0 flex items-center text-[var(--text-basic)] underline hover:text-[var(--hover-orange)]"
            >
              {place.cuisine}
            </Button>
            <Button
              variant="link"
              className="p-0 flex items-center text-[var(--text-basic)] underline hover:text-[var(--hover-orange)]"
            >
              {place.price}
            </Button>
          </div>
        </div>
      </div>

      {/* ✅ Image gallery */}
      <ImageDisplayer images={images} place={place} />
    </div>
  );
}
