import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
      placeId,
    }: {
      commentId: number;
      placeId: number;
    }) => {
      const response = await fetch(`${apiUrl}/comments/delete/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Delete failed:", errorText);
        throw new Error("Failed to delete comment");
      }

      return response.json();
    },
    onSuccess: (_, { placeId }) => {
      queryClient.invalidateQueries({ queryKey: ["place", placeId] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}
