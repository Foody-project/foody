import { DescriptionPart } from "./DescriptionPart";
import ReviewRecap from "./ReviewRecap";
import { Place } from "@/interfaces";

interface HeaderPresentationProps {
  readonly place?: Place;
}

export default function HeaderPresentationPart({
  place,
}: HeaderPresentationProps) {
  return (
    <div className="flex flex-col justify-between mb-10">
      <DescriptionPart place={place} />
      <ReviewRecap place={place} />
    </div>
  );
}
