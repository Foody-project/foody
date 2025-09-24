import { Badge } from "@/components/ui/badge";
import { getAllPlaces } from "@/hooks/places/useAllPlaces";
import { Separator } from "../ui/separator";
import SearchItem from "./SearchItem";
import { useRouter } from "next/navigation";

export default function SearchFirstStep() {
  const { data: places } = getAllPlaces();

  const getThreeUniqueDistricts = (places: any[]) => {
    const districtsSeen = new Set();
    const result: any[] = [];

    for (const place of places) {
      if (!districtsSeen.has(place.district)) {
        districtsSeen.add(place.district);
        result.push(place);
      }
      if (result.length === 3) break;
    }

    return result;
  };

  const placesToDisplay = places ? getThreeUniqueDistricts(places) : [];

  const router = useRouter();

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
  };

  return (
    <div className="p-3">
      <div className="flex flex-row flex-wrap gap-3 pb-2">
        {placesToDisplay.map((place) => (
          <Badge
            key={place.id}
            variant="secondary"
            className="font-thin text-[0.85rem] hover:bg-[var(--text-orange-secondary)] transition-colors duration-300 ease-in-out cursor-pointer"
            onClick={() => handleClick(`${place.district}`)}
          >
            {place.district}
          </Badge>
        ))}
      </div>
      <div>
        <Separator />
      </div>
      <div className="flex flex-col mt-3">
        {places?.slice(0, 3).map((place) => (
          <SearchItem key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}
