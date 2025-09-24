import { Place } from "@/types";
import { getImagesByPlaceId } from "@/hooks/places/useImagesByID";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

export default function SearchItem({ place }: { place: Place }) {
  const { data: images } = getImagesByPlaceId(place.id);
  const router = useRouter();

  const redirectToItemPage = (name: string, id: number) => {
    const redirectName = name.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(
      `/restaurants/${redirectName}?extraInfo=${encodeURIComponent(
        id.toString()
      )}`
    );
  };

  return (
    <div
      className="flex flex-row gap-2 items-center p-2 cursor-pointer"
      onClick={() => redirectToItemPage(place.name, place.id)}
    >
      {""}
      <img
        src={images?.[0]?.url ?? ""}
        alt=""
        className="w-30 h-20 rounded-lg"
      />
      <div className="flex flex-col">
        <span className="text-sm">{place.name}</span>
        <Badge variant="secondary" className="font-thin text-[0.7rem]">
          {place.district}
        </Badge>
        <Rating
          defaultValue={place.stars}
          number={place.totalNotation}
          readOnly
          className="pt-1"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton
              key={index}
              className="w-[1rem] h-6 text-[var(--text-orange)]"
            />
          ))}
        </Rating>
      </div>
    </div>
  );
}
