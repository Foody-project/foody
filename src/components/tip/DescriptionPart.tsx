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
import { Place } from "@/interfaces";

interface DescriptionPartProps {
  place?: Place;
}

export function DescriptionPart({ place }: DescriptionPartProps) {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="w-full border border-black/10 rounded-md group mt-5"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex flex-row items-center p-2 hover:no-underline">
            {place && (
              <div className="flex flex-row justify-start items-center flex-1">
                <ForkKnife size={38} />
                <div className="flex flex-col pl-5">
                  <span className="font-[500] text-[0.9rem]">
                    Type de cuisine
                  </span>
                  <span className="font-[200] text-[0.9rem]">
                    {place.cuisine}
                  </span>
                </div>
              </div>
            )}
          </AccordionTrigger>
          <AccordionTrigger className="flex flex-row items-center p-2 hover:no-underline">
            {place && (
              <div className="flex flex-row justify-start items-center flex-1">
                <Translate size={38} style={{ color: "black" }} />
                <div className="flex flex-col pl-5">
                  <span className="font-[500] text-[0.9rem]">
                    Languages spoken
                  </span>
                  <span className="font-[200] text-[0.9rem]">
                    {place.spokenLanguages?.join(", ")}
                  </span>
                </div>
              </div>
            )}
          </AccordionTrigger>
          <AccordionTrigger className="flex flex-row items-center p-2 hover:no-underline">
            {place && (
              <div className="flex flex-row justify-start items-center flex-1">
                <CreditCard size={38} style={{ color: "black" }} />
                <div className="flex flex-col pl-5">
                  <span className="font-[500] text-[0.9rem]">
                    Payment methods
                  </span>
                  <span className="font-[200] text-[0.9rem]">
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
