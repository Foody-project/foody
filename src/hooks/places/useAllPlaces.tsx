import { useQuery } from "@tanstack/react-query";
import { Place } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchPlaces = async (): Promise<Place[]> => {
  const res = await fetch(`${apiUrl}/places/get`);
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
