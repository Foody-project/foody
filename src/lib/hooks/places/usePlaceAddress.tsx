import { usePlaceByID } from "./usePlaceByID";

export const usePlaceAddress = (id: number) => {
  const { data, error, isLoading, isError } = usePlaceByID(id);

  return {
    address: data?.address ?? "",
    isLoading,
    isError,
    error,
  };
};
