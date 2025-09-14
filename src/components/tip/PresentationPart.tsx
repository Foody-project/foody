import { usePlaceAddress } from "@/lib/hooks/places/usePlaceAddress";
import { OffersPreview } from "@/components/tip/OffersPreview";
import { DescriptionPart } from "./DescriptionPart";

import { Place } from "@/interfaces";

interface PresentationProps {
  place?: Place;
}

export default function PresentationPart({ place }: PresentationProps) {
  if (!place?.id) return null;

  const { address } = usePlaceAddress(place.id);

  return (
    <div>
      <span className="text-2xl uppercase font-bold">For you</span>
      <OffersPreview place={place} />
      <DescriptionPart place={place} />

      <span className="text-2xl uppercase font-bold mt-7 block">
        Discover the menu
      </span>
    </div>
  );
}
