import { useQuery } from "@tanstack/react-query";
import { Place } from "@/types";

const fetchOpenPlaces = async (): Promise<Place[]> => {
  // Obtenir l'heure actuelle à Paris au format HH:mm
  const parisTime = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  }).format(new Date());

  const url = new URL(
    "https://foody-api-production-b7f6.up.railway.app/places/opening-places"
  );
  url.searchParams.append("time", parisTime);

  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur API (${response.status}) : ${errorText}`);
  }

  const data = await response.json();
  return data as Place[];
};

export const getOpenPlaces = () => {
  return useQuery<Place[], Error>({
    queryKey: ["openPlaces"],
    queryFn: fetchOpenPlaces,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
