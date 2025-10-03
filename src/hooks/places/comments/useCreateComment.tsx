import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      placeId,
      comment,
      rating,
    }: {
      userId: number;
      placeId: number;
      comment: string;
      rating: number;
    }) => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Token d'authentification manquant");
      }

      const response = await fetch(`${apiUrl}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, placeId, comment, rating }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ajout commentaire : ${response.status}`);
      }

      return response.json();
    },
    onSuccess: (_, { placeId }) => {
      queryClient.invalidateQueries({ queryKey: ["place", placeId] });
    },
  });
}
