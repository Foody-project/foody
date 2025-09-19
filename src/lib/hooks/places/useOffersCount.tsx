import { useQuery } from "@tanstack/react-query";

interface OfferCount {
  placeId: number | null;
  totalOffers: number;
}

const fetchOffersCount = async (id: number): Promise<OfferCount> => {
  const res = await fetch(
    `https://foody-api-production-b7f6.up.railway.app/offers/${id}/offers/count`
  );
  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }
  return res.json();
};

export const getOffersCount = (id: number) => {
  return useQuery<OfferCount, Error>({
    queryKey: ["offersCount", id],
    queryFn: () => fetchOffersCount(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
