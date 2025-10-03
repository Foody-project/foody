import { useMutation } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ReportPayload {
  userId: number;
  placeId: number;
  motif: string;
}

const sendReport = async ({ userId, placeId, motif }: ReportPayload) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const res = await fetch(`${apiUrl}/reportPlace/${userId}/${placeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ motif }),
  });

  if (!res.ok) {
    throw new Error(`Erreur envoi signalement : ${res.status}`);
  }

  return res.json();
};

export const useReportPlace = () => {
  return useMutation({
    mutationFn: sendReport,
  });
};
