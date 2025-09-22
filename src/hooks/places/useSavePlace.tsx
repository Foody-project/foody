import { useMutation } from "@tanstack/react-query";
import { Place } from "@/types";

const addFavorite = async (userId: number, placeId: number): Promise<Place> => {
  const res = await fetch(
    `https://foody-api-production-b7f6.up.railway.app/favorite/${userId}/${placeId}`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }
  return res.json();
};

export const useAddFavorite = () => {
  return useMutation({
    mutationFn: ({ userId, placeId }: { userId: number; placeId: number }) =>
      addFavorite(userId, placeId),
  });
};
