import { Badge } from "@/components/ui/badge";
import { DescriptionPart } from "./DescriptionPart";
import ReviewRecap from "./ReviewRecap";
import { Place } from "@/types";
import { House, Phone } from "@phosphor-icons/react";

interface HeaderPresentationProps {
  readonly place?: Place;
}

export default function HeaderPresentationPart({
  place,
}: HeaderPresentationProps) {
  return (
    <div className="flex flex-col justify-between mb-10">
      <div className="flex flex-row gap-3 pb-3">
        <Badge
          variant="secondary"
          className="bg-[var(--text-orange)]/80 font-thin text-[0.8rem]"
        >
          <House />
          {place?.address}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-[var(--text-orange)]/80 font-thin text-[0.7rem] flex flex-row justify-center"
        >
          <Phone size={38} />
          {place?.phone}
        </Badge>
      </div>
      <DescriptionPart place={place} />
      <ReviewRecap place={place} />
    </div>
  );
}
