"use client";

import * as React from "react";

import { Place } from "@/interfaces";
import translatePrice from "@/lib/hooks/translatePrice";
import { useImagesByPlaceId } from "../../lib/hooks/places/useImagesByID";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Button } from "@/components/ui/button";

import ImageDisplayer from "./ImageDisplayer";
import ButtonTips from "./ButtonsTips";

interface HeaderProps {
  place: Place | null;
}

export default function Header({ place }: HeaderProps) {
  if (!place) return null;

  const { data: images } = useImagesByPlaceId(place.id);

  if (!images) return null;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col justify-between items-start gap-6">
        <div className="flex flex-row justify-between w-full items-center">
          <div className="flex flex-col items-start gap-2">
            <span className="uppercase font-bold text-3xl text-[var(--text-orange)]">
              {place.name}
            </span>

            <div className="flex flex-row text-[0.9rem] opacity-90">
              <Rating
                defaultValue={place.stars}
                number={place.totalNotation}
                readOnly
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton
                    key={index}
                    className="w-[1rem] h-6 text-[var(--text-orange)]"
                  />
                ))}
              </Rating>
              <div className="flex flex-row items-center gap-2 pl-3 text-base">
                <Button
                  variant="link"
                  className="p-0 flex items-center text-black/90 underline hover:text-[var(--hover-orange)]"
                >
                  {place.cuisine}
                </Button>
                <Button
                  variant="link"
                  className="p-0 flex items-center text-black/90 underline hover:text-[var(--hover-orange)]"
                >
                  {place.price}
                </Button>
              </div>
            </div>
          </div>

          <ButtonTips />
        </div>

        <ImageDisplayer images={images} place={place} />
      </div>
    </div>
  );
}
