import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Gift, CaretRight } from "@phosphor-icons/react";
import { Place } from "@/interfaces";
import { getOffersCount } from "@/lib/hooks/places/useOffersCount";

interface OffersPreviewProps {
  place?: Place;
}

export function OffersPreview({ place }: OffersPreviewProps) {
  if (!place) {
    return null;
  }
  const { data } = getOffersCount(place?.id);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border border-black/5 rounded-md group mt-5 mb-8"
    >
      <AccordionItem
        value="item-1"
        className="bg-[var(--background-secondary)] [box-shadow:4px_4px_6px_rgba(0,0,0,0.1)] rounded-lg"
      >
        <AccordionTrigger className="flex flex-row items-center p-2 hover:no-underline">
          {place && (
            <div className="flex flex-row justify-start items-center flex-1">
              <Gift size={38} style={{ color: "var(--icon-basic)" }} />
              <div className="flex flex-col pl-5">
                <span className="font-[500] text-lg text-[var(--text-orange)]">
                  {data?.totalOffers} offer(s) to discover
                </span>
                <span className="font-[200] text-[var(--text-basic)]">
                  {place.name} gives you great deals!
                </span>
              </div>
            </div>
          )}
          <CaretRight
            size={22}
            className="transition-transform duration-200 group-data-[state=open]:rotate-90"
          />
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
