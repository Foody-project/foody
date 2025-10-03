import { useMutation } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: any;
  token?: string;
  message?: string;
};

const login = async ({
  email,
  password,
}: LoginPayload): Promise<LoginResponse> => {
  const res = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await res.json();
  console.log("Token:", result.token);

  if (!res.ok) {
    throw new Error(result?.message || `Erreur API : ${res.status}`);
  }

  return result;
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>(login);
};
