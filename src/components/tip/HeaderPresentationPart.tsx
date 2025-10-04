import { Badge } from "@/components/ui/badge";
import { DescriptionPart } from "./DescriptionPart";
import ReviewRecap from "./ReviewRecap";
import { Place } from "@/types";
import { Button } from "../ui/button";
import { House, Phone, Rss } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface HeaderPresentationProps {
  readonly place?: Place;
}

export default function HeaderPresentationPart({
  place,
}: HeaderPresentationProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between mb-10">
      <div className="flex flex-row flex-wrap gap-3 pb-3">
        <div
          onClick={() => {
            if (place?.address) {
              const query = encodeURIComponent(place.address);
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${query}`,
                "_blank"
              );
            }
          }}
          className="cursor-pointer"
        >
          <Badge
            variant="secondary"
            className="bg-[var(--text-orange)]/60 font-thin text-[0.9rem] h-8 px-3 flex items-center gap-2"
          >
            <House size={16} />
            {place?.address}
          </Badge>
        </div>

        {place?.phone !== "" && (
          <Badge
            variant="secondary"
            className="bg-[var(--text-orange)]/60 font-thin text-[0.9rem] h-8 px-3 flex items-center gap-2"
          >
            <Phone size={16} />
            {place?.phone}
          </Badge>
        )}

        <Button
          variant="ghost"
          className="bg-[var(--text-orange)]/60 hover:cursor-pointer hover:bg-[var(--text-orange)]/90 h-8 px-3 flex items-center"
          onClick={() => window.open(place?.website, "_blank")}
        >
          <Rss size={16} />
        </Button>
      </div>

      <DescriptionPart place={place} />
      <ReviewRecap place={place} />
    </div>
  );
}
