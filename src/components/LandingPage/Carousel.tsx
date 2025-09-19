import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

import type { Place } from "@/interfaces";
import { Card } from "../PreviewCards/Card";
import { Button } from "../ui/button";

interface CarouselSpacingProps {
  places: Place[];
}

export function CarouselSpacing({ places }: CarouselSpacingProps) {
  const router = useRouter();

  const handleMoreClick = () => {
    router.push("/restaurants");
  };

  return (
    <Carousel className="w-full p-5">
      <CarouselContent className="-ml-1">
        {places.map((place) => (
          <CarouselItem key={place.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 pb-5">
              <Card id={place.id} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-[var(--text-orange)] hover:text-[var(--text-orange)]" />
      <CarouselNext className="text-[var(--text-orange)] hover:text-[var(--text-orange)]" />
      <div className="flex justify-center mt-10">
        <Button
          size="lg"
          variant="outline"
          className="font-light text-lg text-[var(--text-orange)] hover:text-[var(--text-orange)]"
          onClick={handleMoreClick}
        >
          More
        </Button>
      </div>
    </Carousel>
  );
}
