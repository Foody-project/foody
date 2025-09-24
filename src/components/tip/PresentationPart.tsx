import React, { forwardRef } from "react";
import DiscoverMenu from "./DiscoverMenu";
import HeaderPresentationPart from "./HeaderPresentationPart";
import { OffersPreview } from "./OffersPreview";
import GoogleMapEmbedding from "./GoogleMapEmbedding";
import { Place } from "@/types";
import Schedules from "./Schedules";
import CommentSection from "../CommentSection/CommentSection";

interface PresentationPartProps {
  readonly place?: Place;
}

const PresentationPart = forwardRef<
  Record<string, HTMLDivElement>,
  PresentationPartProps
>(({ place }, ref) => {
  const setRef = (key: string, el: HTMLDivElement | null) => {
    if (ref && typeof ref !== "function") {
      ref.current = {
        ...(ref.current ?? {}),
        [key]: el!,
      };
    }
  };

  if (!place) return;

  return (
    <div className="w-full flex flex-col space-y-8">
      {/**
      <div ref={(el) => setRef("offers", el)}>
        <span className="text-2xl uppercase font-bold text-[var(--text-basic)]">
          For you
        </span>
        <OffersPreview place={place} />
      </div>
      */}

      <div className="flex flex-row justify-between gap-15">
        <div ref={(el) => setRef("headerMenu", el)} className="w-[60%]">
          <HeaderPresentationPart place={place} />
          <DiscoverMenu place={place} />
        </div>
        <div
          ref={(el) => setRef("sidebar", el)}
          className="w-[40%] bg-white/50 p-2 rounded-xl flex items-center"
        >
          <Schedules place={place} />
        </div>
      </div>

      <div className="flex flex-row items-start gap-6">
        <div className="flex-1 pr-10">
          <CommentSection place={place} />
        </div>

        <div ref={(el) => setRef("map", el)} className="w-[32.5rem] ml-auto">
          <GoogleMapEmbedding place={place} />
        </div>
      </div>
    </div>
  );
});

export default PresentationPart;
