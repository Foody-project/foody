import { useQuery } from "@tanstack/react-query";
import { User } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchUserByID = async (userId: number): Promise<User> => {
  const res = await fetch(`${apiUrl}/user/get/${userId}`);
  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }
  return res.json();
};

export const getUserById = (userId: number) => {
  return useQuery<User, Error>(["user", userId], () => fetchUserByID(userId), {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    enabled: !!userId,
  });
};
