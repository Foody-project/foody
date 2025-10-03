import { useMutation } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const removeFavoritePlace = async (
  userId: number,
  placeId: number
): Promise<any> => {
  const token = localStorage.getItem("authToken");

  const res = await fetch(`${apiUrl}/favorite/${userId}/${placeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur suppression favori : ${res.status}`);
  }

  return res.json();
};

export const useRemoveFavoritePlace = (userId: number, placeId: number) => {
  return useMutation({
    mutationFn: () => removeFavoritePlace(userId, placeId),
  });
};
