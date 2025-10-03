import { useMutation } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type DeleteUserPayload = {
  userId: number;
};

type DeleteUserResponse = {
  message: string;
};

const deleteUser = async ({
  userId,
}: DeleteUserPayload): Promise<DeleteUserResponse> => {
  const token = localStorage.getItem("authToken");

  const res = await fetch(`${apiUrl}/user/delete/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || `Erreur API : ${res.status}`);
  }

  localStorage.removeItem("authToken");

  return data;
};

export const useDeleteUser = () => {
  return useMutation<DeleteUserResponse, Error, DeleteUserPayload>(deleteUser);
};
