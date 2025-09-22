import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Gift,
  CaretRight,
  ForkKnife,
  Translate,
  CreditCard,
} from "@phosphor-icons/react";
import { Place } from "@/types";

interface DescriptionPartProps {
  place?: Place;
}

export function DescriptionPart({ place }: DescriptionPartProps) {
  console.log(place);
  return (
    <div>
      <span className="font-[300] text-justify">{place?.description}</span>
      <Accordion
        type="single"
        collapsible
        className="w-full border border-black/10 rounded-md group mb-3 mt-6"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex flex-row items-center p-2 hover:no-underline">
            {place && (
              <div className="flex flex-row justify-start items-center flex-1">
                <ForkKnife size={38} style={{ color: "var(--icon-basic)" }} />
                <div className="flex flex-col pl-5">
                  <span className="font-[500] text-[0.9rem] text-[var(--text-basic)]">
                    {place.cuisine} cuisine
                  </span>
                </div>
              </div>
            )}
          </AccordionTrigger>
          <AccordionTrigger className="flex flex-row items-center p-2 hover:no-underline">
            {place && (
              <div className="flex flex-row justify-start items-center flex-1">
                <Translate size={38} style={{ color: "var(--icon-basic)" }} />
                <div className="flex flex-col pl-5">
                  <span className="font-[200] text-[0.9rem] text-[var(--text-basic)]">
                    {place.spokenLanguages?.join(", ")}
                  </span>
                </div>
              </div>
            )}
          </AccordionTrigger>
          <AccordionTrigger className="flex flex-row items-center p-2 hover:no-underline">
            {place && (
              <div className="flex flex-row justify-start items-center flex-1">
                <CreditCard size={38} style={{ color: "var(--icon-basic)" }} />
                <div className="flex flex-col pl-5">
                  <span className="font-[200] text-[0.9rem] text-[var(--text-basic)]">
                    {place.paymentMethods?.join(", ")}
                  </span>
                </div>
              </div>
            )}
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
