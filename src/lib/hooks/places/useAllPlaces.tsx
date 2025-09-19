import { useQuery } from "@tanstack/react-query";
import { Place } from "@/interfaces";

const fetchPlaces = async (): Promise<Place[]> => {
  const res = await fetch(
    "https://foody-api-production-b7f6.up.railway.app/places/get"
  );
  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }
  return res.json();
};

export const getAllPlaces = () => {
  return useQuery<Place[], Error>({
    queryKey: ["places"],
    queryFn: fetchPlaces,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
