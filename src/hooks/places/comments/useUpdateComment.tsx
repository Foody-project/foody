import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
      userId,
      placeId,
      comment,
      rating,
    }: {
      commentId: number;
      userId: number;
      placeId: number;
      comment: string;
      rating: number;
    }) => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;

      if (!token) {
        throw new Error("Token d'authentification manquant");
      }

      const response = await fetch(`${apiUrl}/comments/update/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, placeId, comment, rating }),
      });

      if (!response.ok) {
        throw new Error(`Erreur mise à jour commentaire : ${response.status}`);
      }

      return response.json();
    },
    onSuccess: (_, { placeId }) => {
      queryClient.invalidateQueries({ queryKey: ["place", placeId] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}
