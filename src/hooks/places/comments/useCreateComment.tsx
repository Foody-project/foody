import { useMutation } from "@tanstack/react-query";

export function useCreateComment() {
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
      const response = await fetch(
        "https://foody-api-production-b7f6.up.railway.app/comments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, placeId, comment, rating }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      return response.json();
    },
  });
}
