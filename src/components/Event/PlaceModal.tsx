"use client";

import * as React from "react";
import { getAllPlaces } from "@/hooks/places/useAllPlaces";
import { getImagesByPlaceId } from "@/hooks/places/useImagesByID";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

import { MoveDiagonal2, Instagram, Globe, Phone } from "lucide-react";

interface PlaceModalProps {
  id: number;
}

export default function PlaceModal({ id }: PlaceModalProps) {
  const { data: places = [], isLoading, error } = getAllPlaces();
  const { data: images } = getImagesByPlaceId(id);

  const place = places.find((p) => p.id === id);

  if (error || !place)
    return <div className="text-red-500">Error loading place</div>;

  return (
    <Dialog>
      <DialogTrigger className="flex w-full justify-end">
        <MoveDiagonal2 size={20} className="text-gray-400" />
      </DialogTrigger>

      <DialogContent className="w-[250rem] p-0 m-0 !shadow-md !drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] rounded-t-xl border-0">
        <DialogHeader>
          <DialogTitle className="sr-only"></DialogTitle>
          <DialogDescription asChild>
            <div className="relative">
              {images && images.length > 0 && (
                <img
                  src={images[0].url}
                  className="w-[250rem] h-[20rem] rounded-t-xl"
                />
              )}
              <div className="absolute mt-[-4rem] left-0 bg-white/50 backdrop-blur-md p-3 w-full rounded-t-xl z-10">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col items-start text-left">
                    <span className="uppercase text-xl font-semibold text-black">
                      {place.name}
                    </span>
                    <span className="text-black">{place.district}</span>
                  </div>
                  <Rating defaultValue={place.stars} readOnly>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton
                        key={index}
                        className="text-[var(--text-orange)]"
                      />
                    ))}
                  </Rating>
                </div>
              </div>

              <div className="p-3 bg-white/20 rounded-b-xl">
                <p className="font-light text-justify pt-3">
                  {place.description}
                </p>
                <div className="flex justify-between gap-2 pt-3">
                  <div className="flex gap-2">
                    {place.instagram && (
                      <a
                        href={place.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline">
                          <Instagram />
                        </Button>
                      </a>
                    )}
                    {place.website && (
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="text-[var(--text-orange)]"
                        >
                          <Globe />
                        </Button>
                      </a>
                    )}
                  </div>
                  {place.phone && (
                    <Button variant="outline" className="text-[0.8rem]">
                      <Phone size={12} />
                      {place.phone}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
