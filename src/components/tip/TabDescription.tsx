import * as React from "react";
import { Lexend } from "next/font/google";

import { Place } from "@/interfaces";

import PresentationPart from "./PresentationPart";

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

interface TabProps {
  place?: Place;
}

interface TabPanelProps {
  children?: React.ReactNode;
  active: boolean;
}

function TabPanel({ children, active }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={!active}
      className={`p-4 transition-all duration-300 ${
        active ? "block opacity-100" : "hidden opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default function TabDescription({ place }: TabProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const tabs = [
    { label: "Presentation", content: <PresentationPart place={place} /> },
    { label: "Where is it ?", content: "Item Two" },
    { label: "It's open ?", content: "Item Three" },
    { label: "Card", content: "Item Four" },
  ];

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`${
              lexend.className
            } px-4 py-3 border-b-4 transition-all duration-300 text-[0.9rem]
              ${
                activeIndex === index
                  ? "border-orange-500 font-[500]"
                  : "border-transparent font-[300]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <TabPanel key={index} active={activeIndex === index}>
          {tab.content}
        </TabPanel>
      ))}
    </div>
  );
}
