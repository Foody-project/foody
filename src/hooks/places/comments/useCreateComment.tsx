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
      const response = await fetch(`${apiUrl}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, placeId, comment, rating }),
      });

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      return response.json();
    },
    onSuccess: (_, { placeId }) => {
      queryClient.invalidateQueries({ queryKey: ["place", placeId] });
    },
  });
}
