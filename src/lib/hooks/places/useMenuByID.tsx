import { useQuery } from "@tanstack/react-query";
import { Menu } from "@/interfaces";

const fetchMenusByID = async (placeId: number): Promise<Menu[]> => {
  const res = await fetch(
    `https://foody-api-production-b7f6.up.railway.app/menus/place/${placeId}`
  );
  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }
  return res.json();
};

export const useMenusByPlaceId = (id: number) => {
  return useQuery<Menu[], Error>({
    queryKey: ["menusByID", id],
    queryFn: () => fetchMenusByID(id),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
