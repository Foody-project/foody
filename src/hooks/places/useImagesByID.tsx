import { useQuery } from "@tanstack/react-query";
import { Image } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchImagesByPlaceId = async (placeId: number): Promise<Image[]> => {
  const res = await fetch(`${apiUrl}/images/get/${placeId}`);
  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }
  return res.json();
};

export const getImagesByPlaceId = (placeId: number) => {
  return useQuery<Image[], Error>(
    ["images", placeId],
    () => fetchImagesByPlaceId(placeId),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      enabled: !!placeId,
    }
  );
};
