import { useQuery } from "@tanstack/react-query";
import { Place } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchFavoritesByUser = async (userId: number): Promise<Place[]> => {
  const token = localStorage.getItem("authToken");

  const res = await fetch(`${apiUrl}/favorite/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur récupération favoris : ${res.status}`);
  }

  return res.json();
};

export const useIsPlaceSaved = (userId: number, placeId: number) => {
  const {
    data: favorites = [],
    isLoading,
    error,
  } = useQuery<Place[], Error>({
    queryKey: ["favorites", userId],
    queryFn: () => fetchFavoritesByUser(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const isSaved = favorites.some((place) => place.id === placeId);

  return { isSaved, isLoading, error };
};
