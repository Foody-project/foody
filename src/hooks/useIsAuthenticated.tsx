import { useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchConnectedUser = async () => {
  const res = await fetch(`${apiUrl}/user/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

export const useConnectedUser = () => {
  return useQuery({
    queryKey: ["connectedUser"],
    queryFn: fetchConnectedUser,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
