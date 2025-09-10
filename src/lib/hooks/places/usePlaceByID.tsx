import { useQuery } from "@tanstack/react-query";
import { Place } from "@/interfaces";

const fetchPlace = async (id: number): Promise<Place> => {
  const res = await fetch(
    `https://foody-api-production-b7f6.up.railway.app/places/get/${id}`
  );
  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }
  return res.json();
};

export const usePlaceByID = (id: number) => {
  return useQuery<Place, Error>(["place", id], () => fetchPlace(id), {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    enabled: !!id,
  });
};
