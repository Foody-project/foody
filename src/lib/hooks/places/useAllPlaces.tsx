import { useQuery } from "@tanstack/react-query";
import { Place } from "@/interfaces";

const fetchPlaces = async (): Promise<Place[]> => {
  const res = await fetch("http://localhost:5000/places/get");
  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }
  return res.json();
};

export const useAllPlaces = () => {
  return useQuery<Place[], Error>({
    queryKey: ["places"],
    queryFn: fetchPlaces,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
