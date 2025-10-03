import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

import type { Place } from "@/types";
import { Card } from "../../components/PreviewCards/Card";
import { Button } from "../../components/ui/button";
import { Lexend } from "next/font/google";

interface CarouselSpacingProps {
  places: Place[];
}

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export function CarouselSpacing({ places }: CarouselSpacingProps) {
  const router = useRouter();

  const handleMoreClick = () => {
    router.push("/restaurants");
  };

  return (
    <div>
      <span
        className={`${lexend.className} text-2xl lg:text-3xl font-medium text-[var(--text-basic)]`}
        style={{
          textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        ...and we’re big fans of...
      </span>
      <Carousel className="w-full sm:p-5">
        <CarouselContent className="-ml-1">
          {places.slice(0, 3).map((place) => (
            <CarouselItem key={place.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 pb-5">
                <Card id={place.id} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-[var(--text-orange)] hover:text-[var(--text-orange)] ml-5 sm:hidden" />
        <CarouselNext className="text-[var(--text-orange)] hover:text-[var(--text-orange)] mr-3.5 sm:hidden" />
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
    </div>
  );
}
