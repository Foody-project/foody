import { useQuery } from "@tanstack/react-query";
import { Place } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchFavoritesPlaces = async (userId: number): Promise<Place[]> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const res = await fetch(`${apiUrl}/favorite/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }

  return res.json();
};

export const getFavoritesPlaces = (userId?: number) => {
  return useQuery<Place[], Error>({
    queryKey: ["favoritesPlaces", userId],
    queryFn: () => fetchFavoritesPlaces(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
