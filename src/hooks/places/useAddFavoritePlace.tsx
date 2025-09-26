import { useMutation } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const addFavoritePlace = async (userId: number, placeId: number) => {
  const res = await fetch(`${apiUrl}/favorite/${userId}/${placeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur ajout favori : ${res.status}`);
  }

  return res.json();
};

export const useAddFavoritePlace = (userId: number, placeId: number) => {
  return useMutation({
    mutationFn: () => addFavoritePlace(userId, placeId),
  });
};
