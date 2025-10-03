"use client";

import * as React from "react";
import { Lexend } from "next/font/google";
import { Place } from "@/types";
import PresentationPart from "./PresentationPart";

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

interface TabProps {
  place?: Place;
}

export default function TabDescription({ place }: TabProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const sectionRefs = React.useRef<Record<string, HTMLDivElement>>({});

  const tabs = [
    // { label: "Offers", section: "offers" },
    { label: "Menu", section: "headerMenu" },
    { label: "Schedules", section: "sidebar" },
    { label: "Where is it ?", section: "map" },
  ];

  const handleTabClick = (index: number, section: string) => {
    setActiveIndex(index);
    const target = sectionRefs.current[section];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full">
      <div className="flex sticky !bg-white/20 top-0 z-20 backdrop-blur-md rounded-lg pt-1 mb-3">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index, tab.section)}
            className={`${
              lexend.className
            } px-4 py-3 border-b-4 transition-all duration-300 text-md text-[var(--text-basic)]
              ${
                activeIndex === index
                  ? "border-[var(--text-orange)] font-[500]"
                  : "border-transparent font-[300]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <PresentationPart place={place} ref={sectionRefs} />
    </div>
  );
}
