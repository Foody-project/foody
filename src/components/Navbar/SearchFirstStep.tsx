import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";
import SearchItem from "./SearchItem";
import { useRouter } from "next/navigation";
import { Place } from "@/types";

interface SearchFirstStepProps {
  items?: Place[];
  query?: string;
  onItemClick?: () => void;
}

export default function SearchFirstStep({
  items = [],
  query = "",
  onItemClick,
}: SearchFirstStepProps) {
  const router = useRouter();

  const getThreeUniqueDistricts = (places: Place[]) => {
    const districtsSeen = new Set();
    const result: Place[] = [];

    for (const place of places) {
      if (!districtsSeen.has(place.district)) {
        districtsSeen.add(place.district);
        result.push(place);
      }
      if (result.length === 3) break;
    }

    return result;
  };

  const placesToDisplay = getThreeUniqueDistricts(items);

  function formatSlug(name: string) {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replaceAll("/", " ")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
  }

  const handleClick = (name: string) => {
    const formattedName = formatSlug(name);
    router.push(`/district/${formattedName}`);
    onItemClick?.();
  };

  return (
    <div className="p-3 z-[999]">
      {query.trim() === "" ? (
        <>
          <div className="flex flex-row flex-wrap gap-3 pb-2">
            {placesToDisplay.map((place) => (
              <Badge
                key={place.id}
                variant="secondary"
                className="font-thin text-[0.85rem] text-[var(--text-basic)] hover:bg-[var(--text-orange-secondary)] transition-colors duration-300 ease-in-out cursor-pointer"
                onClick={() => handleClick(place.district)}
              >
                {place.district}
              </Badge>
            ))}
          </div>
          <Separator />
          <div className="flex flex-col mt-3">
            {items.slice(0, 3).map((place) => (
              <SearchItem key={place.id} place={place} />
            ))}
          </div>
        </>
      ) : items.length > 0 ? (
        <div className="flex flex-col gap-2 mt-2">
          {items.map((place) => (
            <SearchItem key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 italic mt-2">No results found</div>
      )}
    </div>
  );
}
