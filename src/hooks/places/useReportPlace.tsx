import { useMutation } from "@tanstack/react-query";
import { Place } from "@/types";

const reportPlace = async (
  userId: number,
  placeId: number,
  motif: string
): Promise<Place> => {
  const res = await fetch(
    `https://foody-api-production-b7f6.up.railway.app/reportPlace/${userId}/${placeId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ motif }),
    }
  );

  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }

  return res.json();
};

export const useReportPlace = () => {
  return useMutation({
    mutationFn: ({
      userId,
      placeId,
      motif,
    }: {
      userId: number;
      placeId: number;
      motif: string;
    }) => reportPlace(userId, placeId, motif),
  });
};
