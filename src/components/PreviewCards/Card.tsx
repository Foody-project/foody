"use client";

import PlaceModal from "@/components/Event/PlaceModal";
import { usePlaceByID } from "@/lib/hooks/places/usePlaceByID";

interface CardProps {
  id: number;
}

export function Card({ id }: CardProps) {
  const { data: place, isLoading, error } = usePlaceByID(id);

  if (!place) return null;

  return <PlaceModal id={place.id} />;
}
