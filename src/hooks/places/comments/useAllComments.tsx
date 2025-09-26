import { useQuery } from "@tanstack/react-query";
import { Comment } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchComments = async (): Promise<Comment[]> => {
  const res = await fetch(`${apiUrl}/comments/get`);
  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }
  return res.json();
};

export const getAllComments = () => {
  return useQuery<Comment[], Error>({
    queryKey: ["comments"],
    queryFn: fetchComments,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
