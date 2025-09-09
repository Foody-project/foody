"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

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
import { PhoneDialogModal } from "./PhoneDialogModal";

import { MoveDiagonal2, Instagram, Globe } from "lucide-react";

import { usePlaceByID } from "@/lib/hooks/places/usePlaceByID";

interface PlaceModalProps {
  id: number;
}

export default function PlaceModal({ id }: PlaceModalProps) {
  const router = useRouter();
  const { data: place, isLoading, error } = usePlaceByID(id);

  const redirectToItemPage = (name: string, id: number) => {
    const redirectName = name.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(
      `/restaurants/${redirectName}?extraInfo=${encodeURIComponent(
        id.toString()
      )}`
    );
  };

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error || !place)
    return <div className="text-red-500">Error loading place</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-white w-[375px] h-90 mt-10 shadow-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
          <img src={place.image} className="w-[375px] h-60 rounded-t-xl" />
          <div className="flex flex-cols justify-between">
            <div>
              <h1 className="text-xl pt-3">{place.name}</h1>
              <p className="text-sm text-gray-400">{place.district}</p>
            </div>
            <Rating defaultValue={place.stars} readOnly>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton key={index} className="w-6 h-6 text-purple-500" />
              ))}
            </Rating>
          </div>

          <div className="flex justify-between items-center text-sm pt-2">
            <div className="flex gap-2">
              <Button variant="outline">{place.flag}</Button>
              <Button variant="outline">{place.price}</Button>
            </div>
            <MoveDiagonal2
              size="20px"
              className="text-gray-400"
              onClick={() => redirectToItemPage(place.name, place.id)}
            />
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[300rem] p-0 m-0 !shadow-md !drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]">
        <DialogHeader>
          <DialogTitle className="sr-only"></DialogTitle>
          <DialogDescription asChild>
            <div className="relative">
              <img src={place.image} className="w-full rounded-t-xl" />
              <div className="absolute mt-[-4rem] left-0 bg-black/50 backdrop-blur-md p-3 w-full rounded-t-xl z-10">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col items-start text-left">
                    <span className="uppercase text-xl font-semibold text-white">
                      {place.name}
                    </span>
                    <span className="text-white">{place.district}</span>
                  </div>
                  <Rating defaultValue={place.stars} readOnly>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton key={index} className="text-purple-500" />
                    ))}
                  </Rating>
                </div>
              </div>

              <div className="p-3 bg-black rounded-b-xl">
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
                        <Button variant="outline">
                          <Globe />
                        </Button>
                      </a>
                    )}
                  </div>
                  <div className="flex items-center">
                    {place.phone && (
                      <PhoneDialogModal phoneNumber={place.phone} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
