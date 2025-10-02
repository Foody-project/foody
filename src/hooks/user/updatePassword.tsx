import { useMutation } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type UpdatePasswordPayload = {
  userId: number;
  currentPassword: string;
  newPassword: string;
};

type UpdatePasswordResponse = {
  message: string;
};

const updatePassword = async ({
  userId,
  currentPassword,
  newPassword,
}: UpdatePasswordPayload): Promise<UpdatePasswordResponse> => {
  const res = await fetch(`${apiUrl}/user/update/password/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || `Erreur API : ${res.status}`);
  }

  return data;
};

export const useUpdatePassword = () => {
  return useMutation<UpdatePasswordResponse, Error, UpdatePasswordPayload>(
    updatePassword
  );
};
