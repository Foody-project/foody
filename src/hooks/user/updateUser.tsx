import { useMutation } from "@tanstack/react-query";
import { User } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type UpdateUserPayload = {
  userId: number;
  data: Partial<User>;
};

const updateUser = async ({
  userId,
  data,
}: UpdateUserPayload): Promise<User> => {
  const res = await fetch(`${apiUrl}/user/update/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || `Erreur API : ${res.status}`);
  }

  return res.json();
};

export const useUpdateUser = () => {
  return useMutation<User, Error, UpdateUserPayload>(updateUser);
};
